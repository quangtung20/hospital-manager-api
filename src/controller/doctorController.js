import db from '../models';
import doctorService from '../services/doctorService';





let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctorList = await doctorService.getTopDoctorHomeSv(+limit);
        // chú ý: phải convert ra kiểu number trước khi query param
        return res.status(200).json(doctorList);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server',
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctorList = await doctorService.getAllDoctorsSv();
        return res.status(200).json(doctorList);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        })
    }
}

let saveInfoDoctor = async (req, res) => {
    try {
        let doctorInfo = await doctorService.saveInfoDoctorSv(req.body);
        return res.status(200).json(doctorInfo);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server',
        })
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    saveInfoDoctor,
}