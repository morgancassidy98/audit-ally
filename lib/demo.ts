import { randomUUID } from 'node:crypto';
import { prisma } from './prisma';

export const DEMO_USER_NAME = 'Demo Reviewer';
export const DEMO_USER_EMAIL_DOMAIN = 'demo.local';

// Abandoned demo accounts (browser closed without signing out) get swept up
// after this long so demo data never lingers indefinitely.
export const DEMO_MAX_AGE_MS = 1000 * 60 * 60 * 6;

export function createDemoUserId() {
  return `demo-${randomUUID()}`;
}

export function getDemoSessionUser() {
  const id = createDemoUserId();

  return {
    id,
    email: `${id}@${DEMO_USER_EMAIL_DOMAIN}`,
    name: DEMO_USER_NAME,
    image: null,
  };
}

export function isDemoUser(user?: { id?: string | null; email?: string | null } | null) {
  if (!user) return false;
  if (typeof user.id === 'string' && user.id.startsWith('demo-')) return true;
  if (typeof user.email === 'string' && user.email.endsWith(`@${DEMO_USER_EMAIL_DOMAIN}`)) return true;
  return false;
}

// Creates a real (but throwaway) User row for this demo session so audits it
// creates can be persisted like any other user's — scoped to its own random
// id and invisible to everyone else — then cleaned up when the session ends.
export async function createDemoUser() {
  const demo = getDemoSessionUser();
  await prisma.user.create({
    data: { id: demo.id, email: demo.email, name: demo.name },
  });
  return demo;
}

export async function deleteDemoUser(userId: string) {
  if (!isDemoUser({ id: userId })) return;
  // Cascades to the demo user's audits/pages/results — nothing is retained.
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
}

export async function cleanupStaleDemoUsers() {
  await prisma.user.deleteMany({
    where: {
      id: { startsWith: 'demo-' },
      createdAt: { lt: new Date(Date.now() - DEMO_MAX_AGE_MS) },
    },
  }).catch(() => {});
}
