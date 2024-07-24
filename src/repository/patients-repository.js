const pool = require("../config/db");

class PatientsRepository {
    async add(patientData) {
        const {
            username, email, userId, birthdate, gender, civilName, optionalGender,
            cpf, rg, naturalness, nationality, religion, education, state, ethnicity,
            maritalStatus, profession, cep, address, number, complement, neighborhood,
            city, stateAddress, country, cellPhone, homePhone, workPhone, insurance, 
            plan, cardNumber, validity, accommodation
        } = patientData;

        try {
            const sql = `INSERT INTO patients (username, email, user_id, birthdate, gender, civil_name, optional_gender,
                          cpf, rg, naturalness, nationality, religion, education, state, ethnicity, marital_status,
                          profession, cep, address, number, complement, neighborhood, city, state_address, country,
                          cell_phone, home_phone, work_phone, insurance, plan, card_number, validity, accommodation) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await pool.execute(sql, [
                username, email, userId, birthdate, gender, civilName, optionalGender,
                cpf, rg, naturalness, nationality, religion, education, state, ethnicity,
                maritalStatus, profession, cep, address, number, complement, neighborhood,
                city, stateAddress, country, cellPhone, homePhone, workPhone, insurance, 
                plan, cardNumber, validity, accommodation
            ]);
        } catch (error) {
            return error;
        }
    }

    async getByEmail({ email }) {
        try {
            const sql = `SELECT * FROM patients WHERE email = ?`;
            const [result] = await pool.execute(sql, [email]);
            return result;
        } catch (error) {
            return [];
        }
    }

    async getByUserId({ userId }) {
        try {
            const sql = `SELECT u.username AS created_by, p.* FROM patients p
                        JOIN users u ON u.id = p.user_id
                        WHERE u.id = ?`;
            const [result] = await pool.execute(sql, [userId]);
            return result;
        } catch (error) {
            return [];
        }
    }

    async getById(id) {
        try {
            const sql = `SELECT * FROM patients WHERE id = ?`;
            const [result] = await pool.execute(sql, [id]);
            return result[0];
        } catch (error) {
            return null;
        }
    }

    async removeById(id) {
        try {
            const sql = `DELETE FROM patients WHERE id = ?`;
            await pool.execute(sql, [id]);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PatientsRepository();
