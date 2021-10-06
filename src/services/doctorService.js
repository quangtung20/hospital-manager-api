import db from '../models/index';


let getTopDoctorHomeSv = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userList = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password', 'image'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: userList,
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctorsSv = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorList = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image'],
                }
            })
            if (!doctorList) {
                resolve({
                    errCode: 1,
                    errMessage: 'none of doctor data',
                })
            } else {
                resolve({
                    errCode: 0,
                    data: doctorList,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let saveInfoDoctorSv = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing param',
                })
            } else {
                //create thay cho save vi save phai gan bien truoc
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'save doctor done',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getTopDoctorHomeSv,
    getAllDoctorsSv,
    saveInfoDoctorSv,
}