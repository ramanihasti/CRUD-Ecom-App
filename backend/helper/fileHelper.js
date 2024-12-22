const path = require("path");
const fs = require("fs/promises");

const saveFile = async (file, folderName) => {
  const fileName = Date.now() + "-" + file.name;
  const uploadPath = path.join(__dirname, "../uploads", folderName, fileName);
  await file.mv(uploadPath);
  return `http://localhost:5000/uploads/${folderName}/${fileName}`;
};

const deleteFile = async (url, folderName) => {
  const fileName = path.basename(url);
  const folderPath = path.join(__dirname, "../uploads", folderName);
  const fileInFolder = await fs.readdir(folderPath);

  if (fileInFolder.includes(fileName)) {
    await fs.unlink(path.join(folderPath, fileName));
  }
};

const saveMultipleFiles = async (files, folderName) => {
  const temp = [];

  for (const file of files) {
    const url = await saveFile(file, folderName);
    temp.push(url);
  }
  return temp;
};

const deleteMultipleFiles = async (urlInDB, folderName, urlsInBody) => {
  if (urlsInBody) {
    //update case
    for (const url of urlInDB) {
      if (!urlsInBody.includes(url)) {
        await deleteFile(url, folderName);
      }
    }
  } else {
    //delete case
    for (const url of urlInDB) {
      await deleteFile(url, folderName);
    }
  }
};
module.exports = {
  saveFile,
  deleteFile,
  saveMultipleFiles,
  deleteMultipleFiles,
};
