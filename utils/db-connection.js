import {MongoClient} from 'mongodb';

export default async function DBConnection(){
    const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
    const db = client.db();
    return [client,db];
}