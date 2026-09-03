/**
 * Utility to compress image files in the browser using HTML5 Canvas.
 * Reduces 5MB-15MB heavy camera/device images to ~80KB-200KB crisp WebP/JPEG,
 * preventing localStorage/IndexedDB quota overflow while maintaining full HD clarity.
 */
export async function compressImageFile(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG or small file, return data URL directly
    if (file.type === 'image/svg+xml' || file.size < 50 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = reject;

    img.onload = () => {
      let { width, height } = img;

      // Maintain aspect ratio while scaling down to max bounds
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(reader.result as string);
        return;
      }

      // Smooth high-quality scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Export as webp if supported, otherwise jpeg
      try {
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      } catch {
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      }
    };

    img.onerror = () => {
      // Fallback to raw FileReader on decoding failure
      const fallbackReader = new FileReader();
      fallbackReader.onloadend = () => resolve(fallbackReader.result as string);
      fallbackReader.onerror = reject;
      fallbackReader.readAsDataURL(file);
    };

    reader.readAsDataURL(file);
  });
}
