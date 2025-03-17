const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../helper/resHelper");

const authMiddlewares = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return sendErrorResponse(res, "Unauthorized", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const alreadyExpiredToken = await ExpiredToken.findOne({ token });

    if (alreadyExpiredToken) {
      return sendErrorResponse(res, "Token already expired.", 400);
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

const adminAuthMiddlewares = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return sendErrorResponse(res, "Unauthorized", 401);
    }

    const token = req.headers.authorization.split(" ")[1];

    const alreadyExpiredToken = await ExpiredToken.findOne({ token });

    if (alreadyExpiredToken) {
      return sendErrorResponse(res, "Token already expired.", 400);
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (user.role !== "admin") {
      return sendErrorResponse(res, "Unauthorized.", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

module.exports = { authMiddlewares, adminAuthMiddlewares };
