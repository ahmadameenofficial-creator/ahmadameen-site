/**
 * Google Drive Upload Service
 * يرفع الملفات مباشرة إلى Google Drive بدون الحاجة لـ backend
 */

const GOOGLE_DRIVE_FOLDER_ID = "18GShEDOeNdDMs6DoyIX4Qoa2c_J_287R";
const GOOGLE_API_KEY = "AIzaSyDyWTHwql_x7cXsZ0K5Z0K5Z0K5Z0K5Z0K"; // Placeholder - يتم التعديل

/**
 * رفع ملف إلى Google Drive باستخدام Google Drive API
 * @param file الملف المراد رفعه
 * @returns معرف الملف في Drive أو null في حالة الفشل
 */
export async function uploadFileToDrive(file: File): Promise<string | null> {
  try {
    // إنشاء FormData للملف
    const formData = new FormData();
    formData.append("file", file);

    // إنشاء metadata للملف
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };

    // إضافة metadata إلى FormData
    const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
    formData.append("metadata", blob);

    // محاولة الرفع عبر Google Drive API
    const response = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("فشل الرفع:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.id || null;
  } catch (error) {
    console.error("خطأ في رفع الملف:", error);
    return null;
  }
}

/**
 * الحصول على access token من localStorage
 * في الواقع، يجب أن يتم الحصول عليه من Google OAuth
 */
function getAccessToken(): string {
  return localStorage.getItem("google_access_token") || "";
}

/**
 * إنشاء رابط مشاركة للملف في Drive
 * @param fileId معرف الملف في Drive
 * @returns رابط المشاركة
 */
export function getDriveFileLink(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

/**
 * حفظ معرف الملف في localStorage
 * @param fileId معرف الملف
 * @param fileName اسم الملف
 */
export function saveFileReference(fileId: string, fileName: string): void {
  const files = JSON.parse(localStorage.getItem("uploaded_files") || "[]");
  files.push({
    id: fileId,
    name: fileName,
    uploadedAt: new Date().toISOString(),
  });
  localStorage.setItem("uploaded_files", JSON.stringify(files));
}

/**
 * الحصول على قائمة الملفات المرفوعة
 */
export function getUploadedFiles(): Array<{ id: string; name: string; uploadedAt: string }> {
  return JSON.parse(localStorage.getItem("uploaded_files") || "[]");
}
