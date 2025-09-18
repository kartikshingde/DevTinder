const { userAuth } = require("../middlewares/auth");
const { getUploadUrl, getDownloadUrl } = require("./s3Handler");

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
    // console.log(result);
    res.json({ uploadUrl: result.url, key: result.key });
  } catch (err) {
    res.send("error generating upload Url" + err.message);
  }
});

s3Router.post("/get-download-url", async (req, res) => {
  try {
    const {key} = req.body;
    if (!key) {
      return res.status(400).json({ error: "No key !" });
    }

    const donwnloadUrl = await getDownloadUrl(key); 
    // console.log(donwnloadUrl)

    res.json({ donwnloadUrl});
  } catch (err) {
    res.send("Error generating download url: " + err.message);
  }
});

module.exports = s3Router;
