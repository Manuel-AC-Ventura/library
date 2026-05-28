import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'library-jwt-secret-change-in-production'
)

const SESSION_COOKIE = 'library_session'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
}

export interface SessionPayload extends JWTPayload {
  staffId: number
  name: string
  email: string
  role: string
}

export async function createSession(staffId: number, name: string, email: string, role: string) {
  const token = await new SignJWT({ staffId, name, email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, COOKIE_OPTIONS)
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value
    if (!token) return null

    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  return session
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/login')
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function authenticate(email: string, password: string) {
  const staff = await prisma.staff.findUnique({ where: { email } })
  if (!staff) {
    throw new Error('Email ou senha inválidos.')
  }

  const valid = await verifyPassword(password, staff.password)
  if (!valid) {
    throw new Error('Email ou senha inválidos.')
  }

  await createSession(staff.id, staff.name, staff.email, staff.role)
  return staff
}
