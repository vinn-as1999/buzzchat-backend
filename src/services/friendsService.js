import FriendsModel from "../models/FriendsModel.js";


export async function addFriend(body) {
    if (body) {
        const {user, userId, friend} = body;
        if (!user || !userId || !friend) {
            return {
                error: 'User ID and Friend ID are required'
            }
        }

        const newFriends = await FriendsModel.findOneAndUpdate(
            {user: user},
            {$addToSet: {friend_list: friend}},
            {new: true, upsert: true}
        );
    
        return newFriends;

    } else {
        return {
            error: 'No body information'
        }
    }
};

export async function getFriends(name) {
    const friends = await FriendsModel.findOne({user: name});
    console.log('o nome', name)
    console.log('dados dos amigos', friends)
    return friends.friend_list;
}