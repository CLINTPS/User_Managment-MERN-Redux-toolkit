const express = require('express')
const router=express.Router()
const adminController = require('../controllers/adminController')


router.get('/AdminFetchToUser',adminController.AdminFetchToUser)
router.delete('/AdminDeleteUser',adminController.AdminDeleteUser)
router.post('/AdminEditUser',adminController.AdminEditUser)
router.post('/AdminAddUser',adminController.AdminAddNewUsers)


module.exports=router;