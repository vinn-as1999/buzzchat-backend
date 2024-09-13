import blockUser from "../services/blockedService.js";


async function blockUserController(req, res) {
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


export default blockUserController;