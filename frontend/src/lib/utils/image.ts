/**
 * Convert Google Drive file URL to direct image URL
 * https://drive.google.com/file/d/[FILE_ID]/view?usp=drive_link
 * → https://lh3.googleusercontent.com/d/[FILE_ID]
 */
export function getGoogleDriveImageUrl(url: string): string {
  if (!url) return '';

  // Pattern: https://drive.google.com/file/d/[FILE_ID]/view?usp=drive_link
  const googleDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (googleDriveMatch) {
    const fileId = googleDriveMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
}
