import {MongoClient} from 'mongodb';

export default async function handler(req, res) {
    let page = req.query.page;
 
    if(req.method === 'GET'){
        if(!page){
            page = 1;
        }

        const perPage = 10;
        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const appointcollection = db.collection('appointments');
            const totalAppoint = await appointcollection.find().count();
            const AllData = await appointcollection.find()
                                                    .sort({createdAt: -1})
                                                    .skip((page - 1) * perPage)
                                                    .limit(perPage)
                                                    .toArray();
            res.status(201).json(
                { 
                    message: 'All Appoinment Fetched',
                    data: AllData,
                    total:totalAppoint
                }
                );
            client.close();
        }catch(err){
            console.log(err,'----')
            res.status(500).json({ message: 'error occurred' });
        }
    }
  }

