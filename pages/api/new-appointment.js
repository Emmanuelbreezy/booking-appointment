import {MongoClient} from 'mongodb';
import random_appointmentId_generator from '../../utils/random_code_gen';

export default async function handler(req, res) {
    
    if(req.method === 'POST'){
        // const userId = ''
        const appointID = random_appointmentId_generator(6);
        const data = req.body;
        if(!data.startTime || !data.endTime || !data.date){
            res.status(400).json({ message: 'all values are required' });
        }
        
        const updatedData = {
                    aid: appointID,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    date    : data.date
                }
        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const appointmentCollection = db.collection('appointments');
            const result = await appointmentCollection.insertOne(updatedData);
            res.status(201).json(
                { 
                    message: 'Appoinment inserted',
                 },
                );

                client.close();
        }catch(err){
            res.status(500).json({ message: 'error occurred' });
        }

    }
     
  }
  