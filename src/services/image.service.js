const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { fork } = require('child_process')
const createDirRecursively = require('../utils/recursiveDir');
const setFileExtension = require('../utils/setFileExtension');

const imageUpload = async ({folderName = '', resize = false, image = {}, link = ''}) => {
    return await new Promise((res, rej) => {
        try {
            var tempFilePath = image?.tempFilePath;
            const fileName = setFileExtension(uuidv4() + image?.name.replace(/\s/g, ''), '.png')
            const outputDir = path.resolve(__dirname, '../../uploads/image/', folderName || '')
            const outputPath = path.join(__dirname, '../../uploads/image/', folderName || '', './')
            const url = (link + path.join('/image', folderName || '', fileName)).replace(/\\/g, '/')

            if (!fs.existsSync(outputDir)) {
                createDirRecursively(outputDir)
            }
 
            if (image && tempFilePath) {
                if (!['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'application/octet-stream'].includes(image?.mimetype)) {
                    if(fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath)
                    rej({
                        error: true,
                        message: 'Incorrect file type',
                        url: null
                    })
                } else {
                    const child = fork(path.resolve(__dirname, '../utils/compress-image.js'))
                    child.send({
                        inputPath: tempFilePath,
                        tempPath: path.resolve(__dirname, '../../temp', fileName).replace(/\\/g, '/'),
                        outputPath,
                        url,
                        resize
                    })
                    child.on('message', ({ statusCode, msg }) => {
                        res(msg)
                    })
                }
            } else {
                rej({
                    error: true,
                    message: 'No file uploaded',
                    url: null
                });
            }
        } catch (error) {
            if(fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath)
            rej(error)
        }
    })
}

const removeImage = (url) => {
    const pathName = new URL(url)?.pathname || ''
    if (pathName) {
        fs.unlink(path.join(__dirname, '../../uploads', pathName), (err) => {
            if(err) {
                console.log("Remove file error :", err);
            }
        })
    }
}

module.exports = {imageUpload, removeImage}