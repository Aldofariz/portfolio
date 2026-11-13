/**
 * Pure utility to resolve public Supabase storage URLs.
 * Safe to import in both Server and Client Components.
 */
export function getMediaPublicUrl(storagePath: string | null | undefined): string | null {
  if (!storagePath) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return null;
  return `${baseUrl}/storage/v1/object/public/portfolio-media/${storagePath}`;
}
