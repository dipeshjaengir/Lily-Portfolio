import { SHOW_TEMPORARY_PLACEHOLDERS, photographyPlaceholders } from '../data/photographyPlaceholders';

// Vite eager glob imports for artwork and profile assets
const artworkImages = import.meta.glob('/src/assets/artworks/**/*.{jpg,jpeg,png,webp,svg,JPG}', { eager: true });
const profileImages = import.meta.glob('/src/assets/profile/**/*.{jpg,jpeg,png,webp,svg,JPG}', { eager: true });

/**
 * Resolves artwork image path using Vite dynamic globbing.
 * 
 * @param {string} localPath - The expected local path in the assets folder.
 * @returns {string|null} - The resolved image URL or null if missing.
 */
export const getArtworkImage = (localPath) => {
  if (!localPath) return null;
  const formattedPath = localPath.startsWith('/') ? localPath : `/${localPath}`;
  const resolved = artworkImages[formattedPath];
  
  if (resolved) {
    return resolved.default || resolved;
  }
  
  return null;
};

/**
 * Resolves profile image path using Vite dynamic globbing.
 * 
 * @param {string} localPath - The local path of the profile image.
 * @returns {string|null} - The resolved profile image URL or null.
 */
export const getProfileImage = (localPath) => {
  if (!localPath) return null;
  const formattedPath = localPath.startsWith('/') ? localPath : `/${localPath}`;
  const resolved = profileImages[formattedPath];
  
  if (resolved) {
    return resolved.default || resolved;
  }
  
  return null;
};

/**
 * Scans the local assets directory for photography uploads.
 * If empty and placeholders are allowed, returns isolated placeholders.
 * 
 * @returns {Array} - List of photography objects.
 */
export const getPhotographyAssets = () => {
  const localPhotos = [];
  
  // Look for any image files placed in /src/assets/artworks/photography/
  for (const path in artworkImages) {
    if (path.includes('/artworks/photography/')) {
      const filename = path.split('/').pop() || "";
      const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
      
      localPhotos.push({
        id: `photo-local-${nameWithoutExtension}`,
        title: null,
        description: null,
        url: artworkImages[path].default || artworkImages[path],
        dimensions: null,
        year: null,
        isLocal: true
      });
    }
  }

  // If we have local uploads, only render those!
  if (localPhotos.length > 0) {
    return localPhotos;
  }

  // Otherwise, return placeholders in development if enabled, or empty array
  return SHOW_TEMPORARY_PLACEHOLDERS ? photographyPlaceholders : [];
};
