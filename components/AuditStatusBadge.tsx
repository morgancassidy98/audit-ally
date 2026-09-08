export function AuditStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'complete':
      return <span className="badge badge-success">Complete</span>;
    case 'complete-with-issues':
      return <span className="badge badge-danger">Issues Found</span>;
    case 'in-progress':
      return <span className="badge badge-warning">In Progress</span>;
    case 'not-started':
      return <span className="badge badge-neutral">Not Started</span>;
    default:
      return <span className="badge badge-neutral">Empty</span>;
  }
}
