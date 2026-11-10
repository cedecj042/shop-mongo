const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.h1pbgxn.mongodb.net/shop?retryWrites=true`)
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback()
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;