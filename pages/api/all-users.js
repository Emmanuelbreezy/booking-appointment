import {MongoClient} from 'mongodb';

export default async function handler(req, res) {
 
    if(req.method === 'GET'){
     
    
        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const userCollection = db.collection('users');
            const userData = await userCollection.find()
                                                    .toArray();
            res.status(201).json(
                { 
                    message: 'All Users Fetched',
                    data: userData,
                }
                );
            client.close();
        }catch(err){
            console.log(err,'----')
            res.status(500).json({ message: 'error occurred' });
        }
    }
  }

