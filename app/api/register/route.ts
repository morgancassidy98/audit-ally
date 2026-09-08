import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, password } = (body ?? {}) as Record<string, unknown>;

  const normalizedEmail =
    typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedName =
    typeof name === 'string' && name.trim() ? name.trim() : null;

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return NextResponse.json(
      { error: 'Enter a valid email address.' },
      { status: 400 },
    );
  }

  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true, passwordHash: true },
  });

  if (existing) {
    // Never attach a password to an existing account here — that would let
    // someone take over an OAuth account by knowing its email address.
    return NextResponse.json(
      { error: 'An account with this email already exists.' },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email: normalizedEmail,
      name: normalizedName,
      passwordHash,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
