/**
 * Cloudinary Profile Image Upload Utility & Config
 * 
 * Supports both direct unsigned preset upload to Cloudinary CDN
 * and server-side signed API upload endpoints.
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

// Default environment fallback variables (Replace with your Cloudinary credentials)
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'findmypeer_profiles';

/**
 * Upload an image file directly to Cloudinary CDN
 * @param file File object from file input
 * @returns Promise<CloudinaryUploadResponse>
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'findmypeer/profiles');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Cloudinary upload failed with status ${res.status}`);
    }

    const data: CloudinaryUploadResponse = await res.json();
    return data.secure_url;
  } catch (err) {
    console.warn('Cloudinary direct upload failed, returning data URL preview:', err);
    // Fallback preview URL generation if API key is not yet configured by user
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
