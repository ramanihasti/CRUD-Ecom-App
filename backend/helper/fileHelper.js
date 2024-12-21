const path = require("path");
const fs = require("fs");

const saveFile = async (file, folderName) => {
  const fileName = Date.now() + "-" + file.name;
  const uploadPath = path.join(__dirname, "../uploads", folderName, fileName);
  await file.mv(uploadPath);
  return `http://localhost:5000/uploads/${folderName}/${fileName}`;
};

module.exports = { saveFile };
