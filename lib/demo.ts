import { prisma } from '@/lib/prisma';
import { wcagCriteria } from '@/lib/wcag-criteria';

export const DEMO_USER_EMAIL = 'demo@auditally.app';
export const DEMO_USER_NAME = 'Demo Reviewer';

const DEMO_PAGES = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
] as const;

// A spread of realistic results so the demo audit shows mixed progress,
// severities, and notes in the checklist and report views.
const DEMO_RESULT_PLAN: Array<{
  status: 'pass' | 'fail' | 'na';
  severity?: 'critical' | 'serious' | 'moderate' | 'minor';
  notes?: string;
}> = [
  {
    status: 'fail',
    severity: 'critical',
    notes: 'Hero image and several icons are missing alt text.',
  },
  { status: 'pass' },
  { status: 'pass' },
  {
    status: 'fail',
    severity: 'serious',
    notes: 'Body text on the footer is 4.1:1 against the background.',
  },
  { status: 'na', notes: 'No audio or video content on this page.' },
  { status: 'pass' },
  {
    status: 'fail',
    severity: 'moderate',
    notes: 'Mobile menu cannot be opened with the keyboard.',
  },
  { status: 'pass' },
];

/**
 * Finds or creates the shared demo user with a pre-seeded sample audit so
 * reviewers can explore the app without signing up. Idempotent.
 */
export async function ensureDemoUser() {
  const existing = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });
  if (existing) return existing;

  const auditUrl = 'https://example.com';
  const criteriaToSeed = wcagCriteria.slice(0, DEMO_RESULT_PLAN.length);

  return prisma.user.create({
    data: {
      email: DEMO_USER_EMAIL,
      name: DEMO_USER_NAME,
      audits: {
        create: {
          name: 'Example Website',
          url: auditUrl,
          shareToken: crypto.randomUUID(),
          pages: {
            create: DEMO_PAGES.map((page, pageIndex) => ({
              title: page.title,
              url: new URL(page.path, auditUrl).toString(),
              sortOrder: pageIndex,
              results: {
                create: criteriaToSeed.map((criterion, i) => {
                  const plan = DEMO_RESULT_PLAN[i];
                  return {
                    criterionId: criterion.id,
                    status: plan.status,
                    severity: plan.severity ?? null,
                    notes: plan.notes ?? '',
                  };
                }),
              },
            })),
          },
        },
      },
    },
  });
}
