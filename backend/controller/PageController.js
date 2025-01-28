const {
  saveMultipleFiles,
  saveFile,
  deleteMultipleFiles,
} = require("../helper/fileHelper");
const {
  sendDataResponse,
  sendErrorResponse,
  sendSuccessReaponse,
} = require("../helper/resHelper");
const Page = require("../modules/Page");

const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    sendDataResponse(res, pages);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const getSinglePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No Such page found.", 404);
    }
    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const addPage = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    // console.log("req.files", req.files);

    if (req.files && req.files.images && !Array.isArray(req.files.images)) {
      req.files.images = [req.files.images];
    }
    if (
      req.body &&
      req.body.subCategories &&
      !Array.isArray(req.body.subCategories)
    ) {
      req.body.subCategories = [req.body.subCategories];
    }

    if (Array.isArray(req.files.images)) {
      const imageURLs = await saveMultipleFiles(req.files.images, "page");
      req.body.images = imageURLs;
    } else {
      const imageURL = await saveFile(req.files.images, "page");
      req.body.images = [imageURL];
    }
    const page = await Page.create(req.body);

    sendDataResponse(res, page);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const updatePage = async (req, res) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);

    if (!page) {
      return sendErrorResponse(res, "No Such page found.", 404);
    }
    if (!req.body) {
      req.body = {};
    }
    if (!req.body.images) {
      req.body.images = [];
    }

    if (req.files && req.files.images) {
      if (Array.isArray(req.files.images)) {
        const imageURLs = await saveMultipleFiles(req.files.images, "page");
        req.body.images = [...req.body.images, ...imageURLs];
      } else {
        const imageURL = await saveFile(req.files.images, "page");
        req.body.images = [...req.body.images, imageURL];
      }
    }

    await deleteMultipleFiles(page.images, "page", req.body.images);

    const updatedPage = await Page.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    sendDataResponse(res, updatedPage);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const deletePage = async (req, res) => {
  const { id } = req.params;
  const page = await Page.findById(id);

  if (!page) {
    return sendErrorResponse(res, "No Such page found.", 404);
  }

  await deleteMultipleFiles(page.images, "page");

  await Page.findByIdAndDelete(id);

  sendSuccessReaponse(res, "Page deletedd successfully.");
  try {
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllPages,
  getSinglePage,
  addPage,
  updatePage,
  deletePage,
};
