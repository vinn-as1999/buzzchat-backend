import BlockedUsers from "../models/BlockedUsers.js";

async function blockUser(params) {
    try {
        const { user, blocked_contact } = params;
        const blocked = await BlockedUsers.findAndUpdate(
            { user },
            {$addToSet: { blocked_contact: blocked_contact }},
            {new: true, upsert: true}
        );

        if (blocked) {
            console.log(blocked.blocked_contact);
            return blocked.blocked_contact;
        } else {
            console.log('Falha ao bloquear contato')
        }

    } catch (error) {
        console.log('Erro no serviço blockedService: ', error)
    }
};

export default blockUser;