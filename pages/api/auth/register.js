import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    
    if(req.method === 'POST'){
        
        const data = req.body;
        if(!data.username && !data.email && !data.password){
            res.status(422).json({ message: 'all values are required' });
        }

        try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const userCollection = db.collection('users');
            
            const existingUser = await userCollection.findOne({email: data.email})
            if(existingUser){
                const error  =  new Error('User exists already!');
                throw error;
            }

            const hashedPw = await bcrypt.hash(data.password, 12);
        
            const updatedUserObj = {
                username:data.username,
                email: data.email,
                password: hashedPw,
                appointments:[]
            }

            const result = await userCollection.insertOne(updatedUserObj);
            
            res.status(201).json({ message: 'User registered'});

            client.close();
        }catch(err){
            res.status(500).json({ message: 'error occurred' });
        }

    }
     
  }
  