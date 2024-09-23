import * as FriendService from "../services/friendsService.js";


export async function addFriendController(req, res) {
    try {
        const friends = await FriendService.addFriend(req.body);
        if (friends) {
            return res.status(200).json({friends})
        }
    } catch (error) {
        return {
            message: 'Error trying to add friend',
            error
        }
    };
};