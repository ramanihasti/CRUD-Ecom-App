const sendDataResponse = (res, data, status = 200) => {
  res.status(status).json({ success: true, data: data });
};

const sendErrorResponse = (res, msg, status = 500) => {
  res.status(status).json({ success: false, msg });
};

module.exports = { sendDataResponse, sendErrorResponse };
