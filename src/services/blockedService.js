import BlockedUsers from "../models/BlockedUsers.js";

async function blockUser(params) {
    const { user, blocked_contacts } = params;
    const blocked = await BlockedUsers.findAndUpdate(
        { user },
        {$addToSet: { blocked_contacts: blocked_contacts }},
        {new: true, upsert: true}
    );
    console.log(blocked.blocked_contacts);
    return blocked.blocked_contacts;
};

export default blockUser;