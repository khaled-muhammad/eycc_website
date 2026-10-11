export interface Certificate {
  id: string;
  name: string;
  team: string;
  achievement: string;
  certificateUrl?: string;
}

export function findCertificate(
  certificates: readonly Certificate[],
  certificateId: string,
): Certificate | null {
  const id = certificateId.trim();
  if (!id) return null;

  // Keep IDs as strings so leading zeroes and letter case remain significant.
  return certificates.find((certificate) => certificate.id === id) ?? null;
}
