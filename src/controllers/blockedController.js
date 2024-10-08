import blockUser from "../services/blockedService.js";
import { getBlocked } from "../services/blockedService.js";


export async function blockUserController(req, res) {
    try {
        const blocked = await blockUser(req.body);
        if (blocked) {
            res.status(200).json({blocked_user: blocked})
        }
    } catch (error) {
        console.log('Erro no controlador BlockUser', error);
        res.status(400).json({
            message: 'Error blocking user',
            error
        });
    }
};

export async function getBlockedUsers(req, res) {
  try {
    const blockedUsers = await getBlocked(req.query.name);
    console.log('os blokkee ', blockedUsers)
    if (!blockedUsers) {
      return res.status(404).json({
        message: 'No blocked contacts'
      })
    } 
    return res.status(200).json(blockedUsers)

  } catch (error) {
    console.log('Error getting blocked users')
  }  
};