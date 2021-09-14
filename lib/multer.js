import multer from "multer"
import {GridFsStorage} from 'multer-gridfs-storage'
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    file : (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"]
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}+${file.originalname}`;
            return filename
        }

        return {
            bucketName: "anyname",
            filename : `${Date.now()}+${file.originalname}`
        }
    }
})


module.exports = multer({
    storage,
    limit : {filesize : 20000000}
})