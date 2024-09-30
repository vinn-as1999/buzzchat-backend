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

export async function getFriendsController(req, res) {
  try {
    const friends = await FriendService.getFriends(req.query.name);
    if (friends) {
        console.log('enviando friends para o front...')
        return res.status(200).json({friends})
    }
  } catch (error) {
    return {
        message: 'Error trying to get friends',
        error
    }
  }  
};