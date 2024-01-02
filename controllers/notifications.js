import Notification from '../models/Notification.js'

export const getNotification = async(req, res) => {
    try {
        const notifications = await Notification.find()
        let unreadNotifications = []
        notifications.forEach(notification => {
            if(notification.reader.filter(x => x === req.userId).length !== 1){
                unreadNotifications.push(notification)
            }
        })
        res.json(unreadNotifications)
    } catch (error) {
        res.json({message: "Problem with get notification!"})
    }
}

export const readNotification = async(req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if(!notification){
            return res.json({message: "Cannot find this notification!"})
        }

        await Notification.findByIdAndUpdate(req.params.id, {
            $push: {reader: req.userId}
        })

        res.json({message: "The Notification marked as read"})

    } catch (error) {
        res.json({message: "Problem with read notification!"})
    }
}