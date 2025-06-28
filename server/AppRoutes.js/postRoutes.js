const router = require('express').Router();
const jwtCheck = require('../middleware/AuthCheck')
const upload = require('../middleware/multer')
const {createProperty , showProperty} = require('../controllers/PostController');

router.post('/createProperty' , jwtCheck , upload.array("images" , 5) ,createProperty);
router.get('/', jwtCheck , showProperty);

module.exports = router;