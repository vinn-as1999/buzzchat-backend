import BlockedUsers from "../models/BlockedUsers";

async function blockUser(params) {
    const { user, blocked_contacts } = params;
    const blocked = await BlockedUsers.findAndUpdate(
        { user },
        {$addToSet: { blocked_contacts: blocked_contacts }},
        {new: true, upsert: true}
    );

    return blocked_contacts;
};

export default blockUser;