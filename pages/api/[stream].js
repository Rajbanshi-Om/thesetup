import mongoose from "mongoose";
export default async (req, res) => {
  const {
    query: { stream },
    method,
    } = req;

    const url = process.env.MONGODB_URI;
    const conn = await mongoose.createConnection(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const bucket = new mongoose.mongo.GridFSBucket(conn.db ,  {bucketName :'anyname'})
   
  switch (method) {
    case "GET":
          try {
            const _id = new mongoose.Types.ObjectId(stream)
              bucket.find({_id}).toArray((err, files) => {
                  if (err) {
                      return res.status(400).send({ err: err })
                  }
                  if (!files || files.length === 0) {
                    return res.status(400).send("no file exist")
                  }
                  bucket 
                   .openDownloadStream(_id)
                   .pipe(res)  
                })
          
      } catch (error) {
        res.status(400).json({ succes: false, err: error });
      }
          break;
      case 'DELETE':
          try {
            const _id = new mongoose.Types.ObjectId(stream)

              bucket.find({ _id }).toArray((err, files) => {
                if (err) {
                    return res.status(400).send({ err: "error deleting file" })
                }
                if (!files || files.length === 0) {
                  return res.status(400).send("no file exist")
                }
                  bucket.delete(_id)
                  res.status(200).json({succes: true , msg : 'Delted'})
              })
          } catch (error) {
             res.status(400).json({ succes: false, err: error });  
          }
          break;
    default:
      res.send("default");
      break;
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
