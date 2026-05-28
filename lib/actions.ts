'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'
import type { ReportBook, ReportReader } from './types'

export async function getBooks() {
  return prisma.book.findMany({ orderBy: { title: 'asc' } })
}

export async function getBook(id: number) {
  return prisma.book.findUnique({ where: { id } })
}

export async function createBook(data: { title: string; author: string; isbn: string }) {
  const book = await prisma.book.create({ data })
  revalidatePath('/books')
  revalidatePath('/')
  return book
}

export async function updateBook(id: number, data: { title: string; author: string; isbn: string }) {
  const book = await prisma.book.update({ where: { id }, data })
  revalidatePath('/books')
  revalidatePath('/')
  return book
}

export async function deleteBook(id: number) {
  const activeLoans = await prisma.loan.findFirst({
    where: { bookId: id, returnedAt: null },
  })
  if (activeLoans) {
    throw new Error('Não é possível excluir um livro com empréstimos ativos.')
  }
  await prisma.loan.deleteMany({ where: { bookId: id } })
  await prisma.book.delete({ where: { id } })
  revalidatePath('/books')
  revalidatePath('/')
}

export async function getClients() {
  return prisma.client.findMany({ orderBy: { name: 'asc' } })
}

export async function getClient(id: number) {
  return prisma.client.findUnique({ where: { id } })
}

export async function createClient(data: { name: string; email: string; identityCard: string; phone?: string }) {
  const client = await prisma.client.create({ data })
  revalidatePath('/clientes')
  revalidatePath('/')
  return client
}

export async function updateClient(id: number, data: { name: string; email: string; identityCard: string; phone?: string }) {
  const client = await prisma.client.update({ where: { id }, data })
  revalidatePath('/clientes')
  revalidatePath('/')
  return client
}

export async function deleteClient(id: number) {
  const activeLoans = await prisma.loan.findFirst({
    where: { clientId: id, returnedAt: null },
  })
  if (activeLoans) {
    throw new Error('Não é possível excluir um cliente com empréstimos ativos.')
  }
  await prisma.loan.deleteMany({ where: { clientId: id } })
  await prisma.client.delete({ where: { id } })
  revalidatePath('/clientes')
  revalidatePath('/')
}

export async function getLoans() {
  return prisma.loan.findMany({
    include: { client: true, book: true },
    orderBy: { borrowedAt: 'desc' },
  })
}

export async function getActiveLoans() {
  return prisma.loan.findMany({
    where: { returnedAt: null },
    include: { client: true, book: true },
    orderBy: { borrowedAt: 'desc' },
  })
}

export async function getLoan(id: number) {
  return prisma.loan.findUnique({
    where: { id },
    include: { client: true, book: true },
  })
}

export async function borrowBook(clientId: number, bookId: number, dueDate: Date) {
  const book = await prisma.book.findUnique({ where: { id: bookId } })
  if (!book || !book.available) {
    throw new Error('Livro não disponível para empréstimo.')
  }

  const loan = await prisma.loan.create({
    data: {
      clientId,
      bookId,
      dueDate,
    },
  })

  await prisma.book.update({
    where: { id: bookId },
    data: { available: false },
  })

  revalidatePath('/loans')
  revalidatePath('/')
  revalidatePath(`/books/${bookId}`)
  return loan
}

export async function returnBook(loanId: number, bookId: number) {
  await prisma.loan.update({
    where: { id: loanId },
    data: { returnedAt: new Date() },
  })

  await prisma.book.update({
    where: { id: bookId },
    data: { available: true },
  })

  revalidatePath('/loans')
  revalidatePath('/')
  revalidatePath(`/books/${bookId}`)
}

export async function getDashboardStats() {
  const [totalBooks, totalClients, activeLoans, totalLoans] = await Promise.all([
    prisma.book.count(),
    prisma.client.count(),
    prisma.loan.count({ where: { returnedAt: null } }),
    prisma.loan.count(),
  ])
  return { totalBooks, totalClients, activeLoans, totalLoans }
}

export async function getMostReadBooks(limit = 5): Promise<ReportBook[]> {
  const books = await prisma.book.findMany({
    include: { loans: true },
    orderBy: { title: 'asc' },
  })

  return books
    .map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      totalLoans: b.loans.length,
    }))
    .sort((a, b) => b.totalLoans - a.totalLoans)
    .slice(0, limit)
}

export async function getActiveReaders(limit = 5): Promise<ReportReader[]> {
  const clients = await prisma.client.findMany({
    include: { loans: true },
    orderBy: { name: 'asc' },
  })

  return clients
    .map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      totalLoans: c.loans.length,
    }))
    .sort((a, b) => b.totalLoans - a.totalLoans)
    .slice(0, limit)
}
