const express =  require('express');

const isAuth  =  require('../middleware/is-auth');
const healthCheckController = require('../controllers/healthchecker');

const router = express.Router();

router.get('/ping',isAuth,healthCheckController.healthCheck);


module.exports = router;