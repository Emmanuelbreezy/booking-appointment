import {MongoClient} from 'mongodb';
import random_appointmentId_generator from '../../utils/random_code_gen';
import checkUserAuthenticated from '../../middleware/checkUserAuthenticated';


export default async function handler(req, res,next) {
    checkUserAuthenticated(req,res);
    console.log(req.uID,'---')


    if(!req.isAuthenticated){
        const error = new Error('user not authenticated');
        error.code = 401;
        throw error;
    }

    
    if(req.method === 'POST'){
        const appointID = random_appointmentId_generator(6);
        const data = req.body;
        if(!data.startTime || !data.endTime || !data.date){
            res.status(401).json({ message: 'all values are required' });
        }
        
       
        // try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const userCollection = db.collection('users');
            const user = await userCollection.findOne(req.uID);
            
            if(!user){
                const error = new Error('Invalid user');
                error.code = 401;
                throw error;
            }

            const updatedData = {
                aid: appointID,
                startTime: data.startTime,
                endTime: data.endTime,
                date    : data.date,
                users_id : user._id
            }
            const appointmentCollection = db.collection('appointments');
            const result = await appointmentCollection.insertOne(updatedData);
            console.log(result,'crrr')
            user.appointments.push(result.insertedId)
            res.status(201).json(
                { 
                 message: 'Appoinment inserted',
                 },
                );

                client.close();
        // }catch(err){
        //     res.status(500).json({ message: 'error occurred' });
        // }

    }
     
  }
  