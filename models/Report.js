import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema({
    linkToContent: {
        title: {type: String},
        postid: {type: String}
    },
    postOrComment: {type:String},
    content: {type: String},
    fromWho: {
        username: {type: String},
        userid: {type: String},
    },
    guilty: {
        username: {type: String},
        userid: {type: String},
    },
    commentContent: {type:String, default: ""},
},{timestamps: true})

export default mongoose.model('Report', ReportSchema)