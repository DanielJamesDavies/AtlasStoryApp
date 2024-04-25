const { getStorage, ref, uploadString, getDownloadURL, deleteObject } = require("firebase/storage");

const storage = getStorage();

module.exports = { storage, ref, uploadString, getDownloadURL, deleteObject };
