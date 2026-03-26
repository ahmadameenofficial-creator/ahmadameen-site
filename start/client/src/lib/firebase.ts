import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyWTHwql_x7cXsZ0K5Z0K5Z0K5Z0K5Z0K",
  authDomain: "ebda-design-pro.firebaseapp.com",
  projectId: "ebda-design-pro",
  storageBucket: "ebda-design-pro.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

/**
 * رفع ملف إلى Firebase Storage
 * @param file الملف المراد رفعه
 * @param folderPath المسار في Storage (اختياري)
 * @returns رابط التحميل أو null في حالة الفشل
 */
export async function uploadFileToFirebase(
  file: File,
  folderPath: string = "design-reviews"
): Promise<string | null> {
  try {
    // إنشاء اسم فريد للملف
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `${folderPath}/${fileName}`;

    // إنشاء reference للملف
    const fileRef = ref(storage, filePath);

    // رفع الملف
    await uploadBytes(fileRef, file);

    // الحصول على رابط التحميل
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error("خطأ في رفع الملف إلى Firebase:", error);
    return null;
  }
}

/**
 * حفظ معرف الملف في localStorage
 * @param fileId معرف الملف
 * @param fileName اسم الملف
 * @param downloadURL رابط التحميل
 */
export function saveFileReference(
  fileId: string,
  fileName: string,
  downloadURL: string
): void {
  const files = JSON.parse(localStorage.getItem("uploaded_files") || "[]");
  files.push({
    id: fileId,
    name: fileName,
    url: downloadURL,
    uploadedAt: new Date().toISOString(),
  });
  localStorage.setItem("uploaded_files", JSON.stringify(files));
}

/**
 * الحصول على قائمة الملفات المرفوعة
 */
export function getUploadedFiles(): Array<{
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}> {
  return JSON.parse(localStorage.getItem("uploaded_files") || "[]");
}

export { storage };
