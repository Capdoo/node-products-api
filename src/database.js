import mongoose from "mongoose";


//mongoose.connect("mongodb://admin:admin@localhost:27017/productsdb", {
mongoose.connect("mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
    //useCreateIndex: true,
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))