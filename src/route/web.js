import express from 'express';
import homeController from '../controller/homeController';
import doctorController from '../controller/doctorController';
import userController from '../controller/userController';
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/tungdoi', homeController.getAboutPage);

    router.get('/sign-up', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/display', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.delete('/api/delete-user-2', userController.deleteUser2);
    router.put('/api/update-user', userController.updateUserInfo);

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);

    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.saveInfoDoctor);


    return app.use("/", router);

}
module.exports = initWebRoutes;