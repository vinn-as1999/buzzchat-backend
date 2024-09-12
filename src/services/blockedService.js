import BlockedUsers from "../models/BlockedUsers";

async function blockUser(params) {
    const { user, blocked_contacts } = params;
    const blocked = await BlockedUsers.findAndUpdate(
        { user },
        {$addToSet: {
            blocked_contacts: { $each: blocked_contacts }
        }}
    );

    return blocked_contacts;
};

export default blockUser;