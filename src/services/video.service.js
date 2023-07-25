const fs = require('fs')
const path = require('path')
const setFileExtension = require("../utils/setFileExtension");
const { v4: uuidv4 } = require('uuid');
const createDirRecursively = require('../utils/recursiveDir');

const uploadVideo = async (video, link) => {
    var tempFilePath = video?.tempFilePath;
    const fileName = setFileExtension(uuidv4() + video?.name.replace(/\s/g, ''), '.mp4')
    const outputDir = path.resolve(__dirname, '../../uploads/video/')
    const url = (link + path.join('/video', fileName)).replace(/\\/g, '/')
    if (!fs.existsSync(outputDir)) {
        createDirRecursively(outputDir)
    }
    await video.mv(path.resolve(outputDir, fileName))
    if(fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath)
    return { url }
}


const removeVideo = (url) => {
    const pathName = new URL(url)?.pathname || ''
    if (pathName) {
        fs.unlink(path.join(__dirname, '../../uploads', pathName), (err) => {
            if(err) {
                console.log("Remove file error :", err);
            }
        })
    }
}

module.exports = {
    uploadVideo, removeVideo
}