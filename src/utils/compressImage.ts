import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 0.4;
const MAX_WIDTH_OR_HEIGHT = 1920;

export async function compressImage(
  file: File
): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  const options = {
    maxSizeMB: MAX_FILE_SIZE_MB,
    maxWidthOrHeight: MAX_WIDTH_OR_HEIGHT,
    useWebWorker: true,
    fileType: file.type === "image/png" ? "image/png" : "image/jpeg",
  };

  try {
    const compressedFile = await imageCompression(
      file,
      options
    );

    console.log("Original size:", file.size / 1024 / 1024, "MB");
    console.log(
      "Compressed size:",
      compressedFile.size / 1024 / 1024,
      "MB"
    );

    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    throw new Error("Unable to compress the selected image.");
  }
}