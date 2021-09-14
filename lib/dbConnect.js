import  mongoose  from "mongoose";


async function DbConnect() {
   
    if (mongoose.connections[0].readyState) {
        console.log('Db already connected')
        return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })

    mongoose.connection.on('connected', () => {
        console.log("Database connected");
    })
    mongoose.connection.on('erroer', () => {
         console.log('Database connection failed')
     })

}

export default DbConnect;