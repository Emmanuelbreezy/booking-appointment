import {MongoClient,ObjectId} from 'mongodb';
import checkUserAuthenticated from '../../middleware/checkUserAuthenticated';


export default async function handler(req, res) {
    checkUserAuthenticated(req,res);
    console.log(req.isAuthenticated,req.uID,'authhh')

    if(!req.isAuthenticated){
        const error = new Error('user not authenticated');
        error.code = 401;
        throw error;
    }
    if(req.method === 'GET'){
        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const userCollection = db.collection('users');
            const toObjectId = new ObjectId(req.uID);
            const user = await userCollection.findOne(toObjectId);

            if(!user){
                const error = new Error('Invalid user');
                error.code = 401;
                throw error;
            }

            const appointcollection = db.collection('appointments');
            const getAllData = await appointcollection.find({'users_id': user._id})
                                                        .sort({createdAt: -1})
                                                        .toArray()
                                                        
           

            res.status(201).json(
                { 
                    message: 'Appoinment Fetched',
                    username: user.username,
                    data: getAllData,
                }
                );
            client.close();
        }catch(err){
            res.status(500).json({ message: 'error occurred' });
        }
    }
  }
  