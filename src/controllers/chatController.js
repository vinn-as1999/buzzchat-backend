import * as convService from "../services/convService.js"


export async function searchChats(req, res) {
    try {
        const chats = await convService.searchChats(req.body.searchTerm);
        res.status(200).json({chats})
    } catch(err) {
        res.status(400).json({
            message: err
        })
        console.log('Erro, searchChats', err)
    }
};

export async function checkConversation(req, res) {
    try {
        const ids = JSON.parse(decodeURIComponent(req.headers.ids));
        const chat = await convService.checkChat(ids);
        if (chat) {
            res.status(200).json({chat});
        } else {
            res.status(400).json({
                message: 'Chat not found'
            })
        }

    } catch(err) {
        res.status(400).json({
            message: err
        })
        console.log('Erro no controlador checkConversation', err)

    }
};

export async function newChat(req, res) {
    try {
        const newConv = await convService.chatRegister(req.body);

        res.status(201).json({
            convId: newConv._id,
            sender: newConv.participant_1
        });
    } catch(err) {
        res.status(400).json({
            message: err
        });
        console.log('Erro, controller conv: ', err);
    }
};

export async function getFriendId(req, res) {
    try {
        const friendId = await convService.getId(req.body.friendName);
        res.status(200).json({friendId})
    } catch(err) {
        console.log('erro no controlador CHAT', err)
    }
}

export async function messageRegister(req, res) {
    try {
        const msg = await convService.messageRegister(req.body);
        res.status(201).json({
            msg
        })
    } catch(err) {
        console.log('Erro no controlador CHAT, message', err)
        res.status(400).json({
            message: err
        });
    }
};

export async function messageHistory(req, res) {
    try {
        const hist = await convService.getHistory(req.headers['authorization']);
        res.status(200).json({hist})
    } catch(err) {
        console.log('Erro no messageHistory', err);
        res.status(400).json({message: 'Error getting chat history'})
    }
};
