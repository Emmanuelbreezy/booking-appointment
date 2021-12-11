import {MongoClient} from 'mongodb';

export default async function handler(req, res) {
 
    if(req.method === 'GET'){
        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const appointcollection = db.collection('appointments');
            const getAllData = await appointcollection.find().toArray();
           

            res.status(201).json(
                { 
                    message: 'Appoinment Fetched',
                    data: getAllData
                }
                );
            client.close();
        }catch(err){
            res.status(500).json({ message: 'error occurred' });
        }
    }
  }
  