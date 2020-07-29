var express = require('express');
var router = express.Router();
const vendorController = require('../controllers/vendor');
const { body } = require('express-validator');
const isAuth = require('../middlewares/is-auth');
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('images','vendors'));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
  ) {
      cb(null, true);
  } else {
      cb(null, false);
  }
  };

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.post('/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('phone')
      .trim()
      .isLength(length = 10)
      .withMessage('Invalid Mobile Number'),
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('password')
      .trim()
      .isLength(min = 8)
      .withMessage('Password should be atleast 8 characters long')
  ],
  vendorController.postSignup);

router.post('/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength(min = 8)
      .withMessage('Password should be atleast 8 characters long')
  ],
  vendorController.postSignin);

router.post('/forgotpassword',
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  vendorController.postForgotPassword);

router.patch('/forgotpassword',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength(min = 8)
      .withMessage('Password should be atleast 8 characters long')
  ],
  vendorController.putForgotPassword);

router.patch('/status', isAuth, vendorController.putUpdateStatus);

router.patch('/dashboard', isAuth, vendorController.putUpdateDashboard);

router.patch('/dashboardLogo', isAuth, upload.single('image'), vendorController.putUpdateDashboardLogo);

router.delete('/dashboardLogo', isAuth, vendorController.deleteDashboardLogo);

router.patch('/changePassword', body('new_password')
  .trim()
  .isLength(min = 8)
  .withMessage('New Password should be atleast 8 characters long'), isAuth, vendorController.putChangePassword);

router.patch('/shopTime', isAuth, vendorController.putUpdateTime);

router.patch('/shopLocation', isAuth, vendorController.putUpdateLocation);

module.exports = router;
