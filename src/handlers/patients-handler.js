const STATUS_CODE = require("../enums/statusCode");
const jwt = require('jwt-decode');
const usersRepository = require("../repository/users-repository");
const patientsRepository = require("../repository/patients-repository");
const emailUtils = require("../utils/email-utils");
const ROLES = require("../enums/roles")

class PatientsHandler {
    async add({ body, headers }, response) {
        const authHeader = headers.authorization;
        const {
            username, email, birthdate, gender, civilName, optionalGender, cpf,
            rg, naturalness, nationality, religion, education, state, ethnicity,
            maritalStatus, profession, cep, address, number, complement, neighborhood,
            city, stateAddress, country, cellPhone, homePhone, workPhone, insurance, 
            plan, cardNumber, validity, accommodation
        } = body;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        if (!emailUtils.isValid(email)) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Formato de e-mail inválido." });

        const patients = await patientsRepository.getByEmail({ email });
        if (patients.length) return response.status(STATUS_CODE.BAD_REQUEST).json({ message: "Já existe um paciente com esse e-mail." });

        try {
            const decoded = jwt.jwtDecode(token);
            const users = await usersRepository.get();
            const user = users.find(elem => elem.username == decoded.username);
            const error = await patientsRepository.add({
                userId: user.id, username, email, birthdate, gender, civilName, optionalGender, cpf,
                rg, naturalness, nationality, religion, education, state, ethnicity, maritalStatus,
                profession, cep, address, number, complement, neighborhood, city, stateAddress, country,
                cellPhone, homePhone, workPhone, insurance, plan, cardNumber, validity, accommodation
            });

            if (error) return response.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({ message: "Aconteceu um erro interno, tente novamente em instantes." });

            response.status(STATUS_CODE.CREATED).json({});
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }

    async get({ headers }, response) {
        const authHeader = headers.authorization;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        try {
            const decoded = jwt.jwtDecode(token);
            const users = await usersRepository.get();
            const user = users.find(elem => elem.username == decoded.username);

            let patients = [];

            if (user.roles == ROLES.ADMIN) {
                patients = await patientsRepository.get()
            } else if (user.roles == ROLES.OPERATOR) {
                patients = await patientsRepository.getByUserId({ userId: user.id })
            }

            const result = patients.map(elem => {
                return {
                    id: elem.id,
                    username: elem.username,
                    email: elem.email,
                    birthdate: elem.birthdate,
                    gender: elem.gender,
                    civilName: elem.civil_name,
                    optionalGender: elem.optional_gender,
                    cpf: elem.cpf,
                    rg: elem.rg,
                    naturalness: elem.naturalness,
                    nationality: elem.nationality,
                    religion: elem.religion,
                    education: elem.education,
                    state: elem.state,
                    ethnicity: elem.ethnicity,
                    maritalStatus: elem.marital_status,
                    profession: elem.profession,
                    cep: elem.cep,
                    address: elem.address,
                    number: elem.number,
                    complement: elem.complement,
                    neighborhood: elem.neighborhood,
                    city: elem.city,
                    stateAddress: elem.state_address,
                    country: elem.country,
                    cellPhone: elem.cell_phone,
                    homePhone: elem.home_phone,
                    workPhone: elem.work_phone,
                    insurance: elem.insurance,
                    plan: elem.plan,
                    cardNumber: elem.card_number,
                    validity: elem.validity,
                    accommodation: elem.accommodation,
                    createdAt: elem.created_at,
                    createdBy: elem.created_by
                }
            })
            
            response.status(STATUS_CODE.SUCCESS).json(result);
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }

    async remove({ headers, params }, response) {
        const authHeader = headers.authorization;

        if (!authHeader) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }

        try {
            await patientsRepository.removeById(params.id)            
            response.status(STATUS_CODE.SUCCESS).json({});
        } catch (err) {
            console.error(err);
            response.status(STATUS_CODE.UNAUTHORIZED).json({ message: "Usuário não autenticado." });
        }
    }
    async getPatientDetails({ params }, res) {
        const { id } = params;
        const patient = await patientsRepository.getById(id);
        if (!patient) return res.status(STATUS_CODE.NOT_FOUND).json({ message: "Paciente não encontrado." });
        res.status(STATUS_CODE.SUCCESS).json(patient);
    }

}

module.exports = new PatientsHandler();
