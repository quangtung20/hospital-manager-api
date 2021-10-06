import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter',
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData ? userData.user : {},
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            users: []
        })
    }
    let users = await userService.handleGetAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users,
    })
}
// let handleCreateNewUser = async (req, res) => {
//     let message = await userService.handleCreateNewUser(req.body);
//     return res.status(200).json(message);
// }
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.handleEditUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "missing require parameter"
        });
    }
    let message = await userService.handleDeleteUser(req.body.id);
    return res.status(200).json(message);
}

let deleteUser2 = async (req, res) => {
    let message = await userService.handleDeleteUser2(req.body.id);
    return res.status(200).json(message);
}

let updateUserInfo = async (req, res) => {
    let message = await userService.updateUserInfoSv(req.body);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeFromServices(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    deleteUser2,
    updateUserInfo,
    getAllCode,
}