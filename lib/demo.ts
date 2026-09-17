import { randomBytes, randomUUID } from 'node:crypto';
import { prisma } from './prisma';
import { wcagCriteria } from './wcag-criteria';

export const DEMO_USER_NAME = 'Demo Reviewer';
export const DEMO_USER_EMAIL_DOMAIN = 'demo.local';

// Abandoned demo accounts (browser closed without signing out) get swept up
// after this long so demo data never lingers indefinitely.
export const DEMO_MAX_AGE_MS = 1000 * 60 * 60 * 6;

const SAMPLE_AUDIT_NAME = 'Sample Audit — Acme Co.';
const SAMPLE_AUDIT_URL = 'https://example.com';
const SAMPLE_PAGE_TITLE = 'Homepage';

// A handful of pre-scored findings so a first-time demo user sees what a
// completed review looks like instead of an all-blank checklist.
const SAMPLE_RESULTS: Record<string, { status: 'pass' | 'fail'; severity?: string; notes?: string }> = {
  '1.1.1': { status: 'fail', severity: 'serious', notes: 'Hero banner image has no alt text.' },
  '1.4.3': { status: 'pass' },
  '2.1.1': { status: 'pass' },
  '2.4.4': { status: 'fail', severity: 'moderate', notes: '"Click here" links don\'t describe their destination.' },
  '3.3.2': { status: 'pass' },
  '4.1.2': { status: 'fail', severity: 'critical', notes: 'Custom dropdown menu is missing an ARIA role and keyboard support.' },
};

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
  // Never block sign-in on the sample data — a demo with no audits is still usable.
  await seedDemoAudit(demo.id).catch((error) => {
    console.error('Failed to seed sample demo audit:', error);
  });
  return demo;
}

// Gives every new demo session one pre-filled audit (own id, own user) so
// there's something to explore immediately — never shared between sessions.
async function seedDemoAudit(userId: string) {
  await prisma.audit.create({
    data: {
      shareToken: randomBytes(32).toString('hex'),
      name: SAMPLE_AUDIT_NAME,
      url: SAMPLE_AUDIT_URL,
      userId,
      pages: {
        create: [{
          url: SAMPLE_AUDIT_URL,
          title: SAMPLE_PAGE_TITLE,
          sortOrder: 0,
          results: {
            create: wcagCriteria.map((criterion) => {
              const sample = SAMPLE_RESULTS[criterion.id];
              return {
                criterionId: criterion.id,
                status: sample?.status ?? 'untested',
                severity: sample?.status === 'fail' ? sample.severity ?? null : null,
                notes: sample?.notes ?? '',
              };
            }),
          },
        }],
      },
    },
  });
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
