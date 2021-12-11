import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    id:{
        type:String,
        required:true
    },
  
    appointmentstarttime:{
        type: String,
        required: true
    },
    appointmentendtime:{
        type: String,
        required: true
    },
    appointmentdate:{
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},
{timestamps: true}
)

export default mongoose.model('Appointment', appointmentSchema);