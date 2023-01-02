const { Router } = require('express');
const { getApiInfo, addCountriesToDb, getDbInfo, createActivity } = require('../functions/index.js');
const { Country, Activity } = require('../db');

const router = Router();

module.exports = router;

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countryId} = req.body;
    try {
        const newActivity = await createActivity(name, difficulty, duration, season, countryId);
        return res.status(200).json(newActivity);
    } catch (error) {
        return res.status(400).send(error);
    }
});