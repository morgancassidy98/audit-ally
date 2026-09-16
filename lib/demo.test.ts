import { describe, expect, it } from 'vitest';
import { getDemoSessionUser, isDemoUser } from './demo';

describe('demo session helpers', () => {
  it('creates a throwaway demo user without any shared persisted identity', () => {
    const user = getDemoSessionUser();

    expect(isDemoUser(user)).toBe(true);
    expect(user.id).toMatch(/^demo-/);
    expect(user.email).toMatch(/^demo\.|^demo-[^@]+@/);
    expect(user.name).toBe('Demo Reviewer');
  });

  it('treats shared demo records as demo users for runtime protections', () => {
    expect(isDemoUser({ id: 'demo-user', email: 'demo@auditally.app' })).toBe(true);
  });
});
