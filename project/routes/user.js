const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser
}=require('../controllers/user')

const {isAuthenticatedUser}=require('../middlewares/auth');

router.route('/getAllUsers').get(isAuthenticatedUser,getAllUsers);
router.route('/getUserById/:id').get(isAuthenticatedUser,getSingleUser)
router.route('/registerUser').post(registerUser);
router.route('/loginUser').post(loginUser);
router.route('/updateUser').post(isAuthenticatedUser,updateUser);
const mySecret = process.env['port']
router.route('/deleteUser').post(isAuthenticatedUser,deleteUser);
exports.module=router;
