import jwt from "jsonwebtoken"
export const adminHere = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.adminId = decoded.id

            next()
        } catch (error) {
            return res.json({message: "No access!"})
        }
    }
    else{
        return res.json({message: "No access!"})
    }
}