/**
 * Uses configured public text unless it is blank or contains a pasted env
 * assignment. This keeps malformed deployment settings out of rendered copy.
 */
export const getPublicEnvValue = (
  value: string | undefined,
  variableName: string,
  fallback: string
): string => {
  let normalized = (value ?? "")
    .trim()
    .replace(/^(\"|')([\s\S]*)\1$/, "$2")
    .trim();

  const assignmentBoundary = normalized.search(/NEXT_PUBLIC_[A-Z0-9_]+\s*=/);
  if (assignmentBoundary === 0) return fallback;
  if (assignmentBoundary > 0) {
    normalized = normalized.slice(0, assignmentBoundary).trim();
  }

  normalized = normalized.replace(/^[\"']+|[\"']+$/g, "").trim();

  if (!normalized || normalized === variableName) return fallback;
  return normalized;
};
