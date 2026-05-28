import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const clients = await Promise.all([
    prisma.client.create({
      data: { name: 'Ana Silva', email: 'ana@email.com', identityCard: '000000001LA000', phone: '+244 923 456 789' },
    }),
    prisma.client.create({
      data: { name: 'Carlos Souza', email: 'carlos@email.com', identityCard: '000000002LA000', phone: '+244 923 456 790' },
    }),
    prisma.client.create({
      data: { name: 'Mariana Costa', email: 'mariana@email.com', identityCard: '000000003LA000', phone: '+244 923 456 791' },
    }),
    prisma.client.create({
      data: { name: 'João Pereira', email: 'joao@email.com', identityCard: '000000004LA000', phone: '+244 923 456 792' },
    }),
    prisma.client.create({
      data: { name: 'Lucia Oliveira', email: 'lucia@email.com', identityCard: '000000005LA000', phone: '+244 923 456 793' },
    }),
  ])

  const books = await Promise.all([
    prisma.book.create({
      data: { title: 'Dom Casmurro', author: 'Machado de Assis', isbn: '978-85-01-00001-1' },
    }),
    prisma.book.create({
      data: { title: 'Grande Sertão: Veredas', author: 'Guimarães Rosa', isbn: '978-85-01-00002-8' },
    }),
    prisma.book.create({
      data: { title: 'Capitães da Areia', author: 'Jorge Amado', isbn: '978-85-01-00003-5' },
    }),
    prisma.book.create({
      data: { title: 'A Hora da Estrela', author: 'Clarice Lispector', isbn: '978-85-01-00004-2' },
    }),
    prisma.book.create({
      data: { title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', isbn: '978-85-01-00005-9' },
    }),
    prisma.book.create({
      data: { title: 'O Alienista', author: 'Machado de Assis', isbn: '978-85-01-00006-6' },
    }),
    prisma.book.create({
      data: { title: 'Vidas Secas', author: 'Graciliano Ramos', isbn: '978-85-01-00007-3' },
    }),
    prisma.book.create({
      data: { title: 'Iracema', author: 'José de Alencar', isbn: '978-85-01-00008-0' },
    }),
  ])

  const now = new Date()

  await prisma.loan.create({
    data: {
      clientId: clients[0].id,
      bookId: books[0].id,
      borrowedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[0].id,
      bookId: books[1].id,
      borrowedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[1].id,
      bookId: books[2].id,
      borrowedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[2].id,
      bookId: books[0].id,
      borrowedAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[2].id,
      bookId: books[3].id,
      borrowedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[3].id,
      bookId: books[4].id,
      borrowedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[3].id,
      bookId: books[0].id,
      borrowedAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[4].id,
      bookId: books[5].id,
      borrowedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[4].id,
      bookId: books[6].id,
      borrowedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000),
    },
  })

  await prisma.loan.create({
    data: {
      clientId: clients[2].id,
      bookId: books[7].id,
      borrowedAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000),
      dueDate: new Date(now.getTime() - 26 * 24 * 60 * 60 * 1000),
      returnedAt: new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000),
    },
  })

  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.staff.create({
    data: {
      name: 'Administrador',
      email: 'admin@biblioteca.com',
      password: adminPassword,
      role: 'admin',
    },
  })

  const staffPassword = await bcrypt.hash('staff123', 10)
  await prisma.staff.create({
    data: {
      name: 'Maria Atendente',
      email: 'maria@biblioteca.com',
      password: staffPassword,
      role: 'staff',
    },
  })

  console.log('Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
