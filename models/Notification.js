import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema({
    title: {type: String},
    text: {type: String},
    reader: [
        {
            type: String
        }
    ]
},{timestamps: true})

export default mongoose.model('Notification', NotificationSchema)