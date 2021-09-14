import nextConnect from 'next-connect';
import upload from '../../../lib/multer'

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
.use(upload.array('files' , 6))
.post((req, res) => {
  var fileInfo = req.files
  // res.status(200).json({ data: fileInfo });
  res.send(fileInfo)
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};