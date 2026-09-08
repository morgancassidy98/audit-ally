import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUserId } from '@/lib/ownership';

const VALID_STATUSES = new Set(['untested', 'pass', 'fail', 'na']);
const VALID_SEVERITIES = new Set(['critical', 'serious', 'moderate', 'minor']);

// PUT /api/results/[id] — update a single result
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = await getAuthenticatedUserId();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let body: { status?: unknown; notes?: unknown; severity?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Validate status
    if (typeof body.status !== 'string' || !VALID_STATUSES.has(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: untested, pass, fail, na.' },
        { status: 400 }
      );
    }
    const status = body.status;

    // Validate severity (may be null to clear, or absent to clear when not failing)
    let severity: string | null = null;
    if (body.severity != null) {
      if (typeof body.severity !== 'string' || !VALID_SEVERITIES.has(body.severity)) {
        return NextResponse.json(
          { error: 'Invalid severity. Must be one of: critical, serious, moderate, minor.' },
          { status: 400 }
        );
      }
      severity = body.severity;
    }

    // Severity only makes sense on a failing criterion — clear it otherwise.
    if (status !== 'fail') severity = null;

    const notes =
      typeof body.notes === 'string' ? body.notes : '';

    const existingResult = await prisma.result.findFirst({
      where: { id, page: { audit: { userId } } },
      select: { id: true },
    });
    if (!existingResult) return NextResponse.json({ error: 'Result not found' }, { status: 404 });

    const result = await prisma.result.update({
      where: { id },
      data: {
        status,
        notes,
        severity,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update result' },
      { status: 500 }
    );
  }
}