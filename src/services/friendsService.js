import FriendsModel from "../models/FriendsModel.js";


export async function addFriend(body) {
    if (body) {
        const {userId, friendId} = body;
        if (!userId || !friendId) {
            return {
                error: 'User ID and Friend ID are required'
            }
        }
        
        const newFriends = await FriendsModel.findOneAndUpdate(
            {user: userId},
            {$addToSet: {friend_list: friendId}},
            {new: true, upsert: true}
        );
    
        return newFriends;

    } else {
        return {
            error: 'No body information'
        }
    }
};