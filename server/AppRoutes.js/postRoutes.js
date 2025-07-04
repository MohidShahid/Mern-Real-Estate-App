const router = require('express').Router();
const jwtCheck = require('../middleware/AuthCheck')
const upload = require('../middleware/multer')
const {createProperty , showProperty , userListing , updateProperty, deleteProperty , getProperty, filterByCategoryandLocation} = require('../controllers/PostController');

router.post('/createProperty' , jwtCheck , upload.array("images" , 5) ,createProperty);
router.put('/updateProperty/:id' , jwtCheck, updateProperty);
router.delete('/deleteProperty' , jwtCheck, deleteProperty);
router.get('/',  showProperty);
router.get('/getProperty/:id', getProperty);
router.get('/userLists' , jwtCheck , userListing);
router.post('/filterCategoryAndLocation' , filterByCategoryandLocation)

module.exports = router;