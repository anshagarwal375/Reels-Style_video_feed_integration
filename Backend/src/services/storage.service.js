const ImageKit = require("imagekit");
const { v4: uuid } = require("uuid");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadfile(file, fileName) {
  const result = await client.upload({  // Use client here
    file: file,
    fileName: fileName,
  });
  return result.url;
}

module.exports = { uploadfile };
