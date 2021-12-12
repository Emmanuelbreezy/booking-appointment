import {MongoClient} from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    
    if(req.method === 'POST'){
        const data = req.body;
        if(!data.email && !data.password){
            res.status(422).json({ message: 'all values are required' });
        }

        // try{
            const client = await MongoClient.connect('mongodb+srv://Emmanuel:B55nWv_-JL2N-Xw@cluster0.wo1wx.mongodb.net/bookme');
            const db = client.db();
            const userCollection = db.collection('users');
            
            const user = await userCollection.findOne({email: data.email})
            if(!user){
                const error = new Error('User not found');
                error.code =  401;
                throw error;
            }

            const isEqual = await bcrypt.compare(data.password, user.password);
            if(!isEqual){
                const error = new Error('Password is incorrect');
                error.code =  401;
                throw error;
            }

            const token = jwt.sign({
                uID: user._id.toString(),
                email: user.email
            },
            'c559b883-cae9-4039-8029-3ced8f27df89',
            {expiresIn:'4h'}
            
            );

            res.status(201).json(
                { 
                    message: 'Login Granted',
                    tokenID:token,
                    uID: user._id.toString()
                });

            // client.close();
        // }catch(err){
        //     console.log(err,'err');
        //     res.status(500).json({ message: 'error occurred' });
        // }

    }
     
  }
  