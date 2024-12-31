const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    });
    return response.url;
  } catch (error) {
    throw error;
  }
};

const deleteOnCloudinary = async (url, folderName) => {
  try {
    if (!url) return null;
    const publicId = getPublicId(url);
    const response = await cloudinary.v2.uploader.destroy(
      `${folderName}/${publicId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const getPublicId = (url) => {
  let parts = url?.split("/");
  let fileName = parts.pop();
  let publicId = fileName?.split(".")[0];
  return publicId;
};

module.exports = { upload, deleteOnCloudinary };
