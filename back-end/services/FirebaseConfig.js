const { getStorage, ref, uploadString, getDownloadURL } = require("firebase/storage");

const storage = getStorage();

module.exports = { storage, ref, uploadString, getDownloadURL };
