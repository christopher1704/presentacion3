const {Router} = require('express');
const { createUser, getUser, deleteUser, updateUSer } = require('../controller/user.controller');

const router = Router();

router.post("/",createUser);
router.get("/",getUser);
router.delete("/:id",deleteUser);
router.put("/:id",updateUSer);

module.exports = router;