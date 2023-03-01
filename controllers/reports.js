import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import User from "../models/User.js"
import Report from "../models/Report.js"

export const sendReport = async (req, res) => {
    try {
        const {contentId, content, by, guilty, contentType } = req.body
        const userFromName = await User.findById(by)
        const userToName = await User.findById(guilty)
        if(contentType === 'post'){
            const contentById = await Post.findById(contentId)
            const newPostReport = new Report({
                linkToContent: {
                    title: contentById.title,
                    postid: contentId
                },
                postOrComment: contentType,
                content: content,
                fromWho: {
                    username: userFromName.username,
                    userid: userFromName._id
                },
                guilty: {
                    username: userToName.username,
                    userid: userToName._id
                }
            })
            await newPostReport.save()
        }
        else{
            const contentById = await Comment.findById(contentId)
            const newCommentReport = new Report({
                linkToContent: {
                    title: '',
                    postid: ''
                },
                postOrComment: contentType,
                content: content,
                fromWho: {
                    username: userFromName.username,
                    userid: userFromName._id
                },
                guilty: {
                    username: userToName.username,
                    userid: userToName._id
                },
                commentContent: contentById.comment
            })
            await newCommentReport.save()
        }

        res.json({message: "Thanks for Reporting."})
    } catch (error) {
        res.json({message: "You can't send the report!"})
    }
}

export const getReports = async (req, res) => {
    try {
        const allReports = await Report.find()
        if(!allReports){
            return res.json({message: "There are no reports!"})
        }
        res.json(allReports)
    } catch (error) {
        res.json({message: "Problem with getting reports!"})
    }
}

export const solveReports = async(req, res) => {
    try {
        const report = await Report.findById(req.params.id)
        
        await Report.findByIdAndDelete(req.params.id)

        res.json({
            report,
            message: "This report is solved!"
        })
        
    } catch (error) {
        res.json({message: "Problem with wolving report"})
    }
}