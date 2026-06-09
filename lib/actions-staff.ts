'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from './prisma'
import { hashPassword, requireAuth, logout as authLogout } from './auth'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { authenticate } = await import('./auth')
  try {
    await authenticate(email, password)
  } catch (e) {
    throw e
  }
  redirect('/')
}

export async function logoutAction() {
  await authLogout()
}

export async function getStaffList(query?: string) {
  await requireAuth()
  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' as const } },
          { email: { contains: query, mode: 'insensitive' as const } },
        ],
      }
    : {}

  return prisma.staff.findMany({
    where,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { name: 'asc' },
  })
}

export async function getStaff(id: number) {
  await requireAuth()
  return prisma.staff.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })
}

export async function createStaff(data: { name: string; email: string; password: string; role?: string }) {
  await requireAuth()
  const existing = await prisma.staff.findUnique({ where: { email: data.email } })
  if (existing) {
    throw new Error('Já existe um funcionário com este email.')
  }

  const password = await hashPassword(data.password)
  await prisma.staff.create({
    data: { name: data.name, email: data.email, password, role: data.role || 'staff' },
  })
  revalidatePath('/staff')
}

export async function updateStaff(id: number, data: { name: string; email: string; role?: string; password?: string }) {
  await requireAuth()

  const updateData: Record<string, string> = { name: data.name, email: data.email }
  if (data.role) updateData.role = data.role
  if (data.password) {
    updateData.password = await hashPassword(data.password)
  }

  await prisma.staff.update({ where: { id }, data: updateData })
  revalidatePath('/staff')
}

export async function deleteStaff(id: number) {
  await requireAuth()
  await prisma.staff.delete({ where: { id } })
  revalidatePath('/staff')
}
