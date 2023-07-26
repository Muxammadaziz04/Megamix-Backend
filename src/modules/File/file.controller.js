const { uploadFile } = require("../../services/file.service")
const { imageUpload } = require("../../services/image.service")
const { uploadVideo } = require("../../services/video.service")

class FileController {
    async uploadFile(req, res, next) {
        try {
            let url = ''
            const file = req.files?.file
            const fileType = file?.mimetype?.split('/')?.[0]

            if (fileType === 'image') {
                const image = await imageUpload({ image: file, link: req.protocol + "://" + req.get("host") })
                url = image?.url
            } else if (fileType === 'video') {
                const video = await uploadVideo(file, req.protocol + "://" + req.get("host"))
                url = video?.url
            } else {
                const file = await uploadFile(file, req.protocol + "://" + req.get("host"))
                url = file?.url
            }

            res.status(201).json({ url })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FileController()