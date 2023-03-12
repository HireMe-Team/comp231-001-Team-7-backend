

async function finduser(id) {
    // Waiting for user Schema and userDb
    const user = await userDb.findOne({id})
    if (user) {
        return user
    }
    else {
        return false
    }
}

async function changePassword(id, oldPassword, newPassword) {
    user = await finduser(id)
    if (user) {
        //TODO: findOneAndUpdate the password
        // Try catch block, if success return true, otherwise return false and raise exception
    }


}