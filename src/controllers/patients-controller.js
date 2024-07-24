const patientsHandler = require('../handlers/patients-handler');
const express = require('express');
const router = express.Router();

router.post('/api/v1/patients', patientsHandler.add);
router.get('/api/v1/patients', patientsHandler.get);
router.get('/api/v1/patients/:id', patientsHandler.getPatientDetails); // Nova rota para detalhes do paciente
router.delete('/api/v1/patients/:id', patientsHandler.remove);

module.exports = router;
