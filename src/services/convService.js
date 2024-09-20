import ConversationModel from '../models/ConversationModel.js'
import MessageModel from '../models/MessageModel.js'
import UserModel from '../models/UserModel.js'


export async function searchChats(chatsData) {
    return UserModel.find({})
        .then(users => users)
        .catch(err => console.log(err))

};

export async function chatRegister(chatData) {
    const {participant_1, participant_2} = chatData;

    return ConversationModel.create({
        timestamp: new Date(),
        participant_1,
        participant_2

    }).then((data) => {
        console.log('Participants: ', data.participant_1, data.participant_2);
        return data;

    }).catch((err) => {
        console.log('Erro ao criar chat', err);

    });
};

export async function checkChat(ids) {
    const [user_1, user_2] = ids;
    return ConversationModel.findOne({
        $or: [
            {
                participant_1: user_1,
                participant_2: user_2
            },
            {
                participant_1: user_2,
                participant_2: user_1
            }
        ]
    })
    .then(data => {
        if (data) {
            return data._id;
        } else {
            console.log('Chat not found');
            return null;
        }
    }).catch(err => console.log('error: ', err)) 
};

export async function getId(friendName) {
    return UserModel.findOne({username: friendName})
    .then(data => {
        return data._id
    })
    .catch(err => console.log('erro no convServ: ', err))
};

export async function messageRegister(msgData) {
    const {
        conversation_id,
        sender,
        receiver,
        content,
        day,
        hour
    } = msgData;

    return MessageModel.create({
        conversation_id,
        sender,
        receiver,
        content,
        day,
        hour
    }).then(data => {
        return data;
        
    }).catch(err => {
        console.log('Erro no msgServ', err)
    }) 
};

export async function getHistory(convId) {
    const res = await MessageModel.find({conversation_id: convId});
    return res;
};