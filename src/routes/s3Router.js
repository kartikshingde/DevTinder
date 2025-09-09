const { userAuth } = require("../middlewares/auth");
const { getUploadUrl } = require("./s3Handler");

const express = require("express");

const s3Router = express.Router();

s3Router.post("/get-upload-url", async (req, res) => {
  try {
    // console.log(req.body);
    const filename = req.body;
    if (!filename) {
      return res.status(400).json({ error: "filename is required" });
    }
    filename;
    const contentType = "image/jpeg";
    const result = await getUploadUrl(filename, contentType);

    res.json({ uploadUrl: result.url, key: result.key });
  } catch (err) {}
});

module.exports = s3Router;
