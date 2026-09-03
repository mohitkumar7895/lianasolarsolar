/**
 * Bulletproof helper to safely normalize any input (JSON string, newline string, array, null, undefined)
 * into a clean string array. Prevents "TypeError: ...slice(...).map is not a function".
 */
export function ensureArray(input: any): string[] {
  if (!input) return [];

  // If already an array, filter and return valid strings
  if (Array.isArray(input)) {
    return input.map((item) => (typeof item === 'string' ? item : JSON.stringify(item))).filter(Boolean);
  }

  // If input is a string
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return [];

    // Check if it is a JSON array string e.g. '["feature 1", "feature 2"]'
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {}
    }

    // Check if newline separated
    if (trimmed.includes('\n')) {
      return trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    }

    // Check if comma separated
    if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [trimmed];
  }

  return [];
}
