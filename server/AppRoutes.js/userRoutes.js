const jwtCheck = require('../middleware/AuthCheck')
const router = require('express').Router();
const upload = require('../middleware/multer')

const {CreateUser , updatedUser} = require('../controllers/UserController')

router.post('/register' , jwtCheck, CreateUser);

router.put('/updateUser' , upload.single('image'), updatedUser)



module.exports = router;