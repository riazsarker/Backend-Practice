const express= require("express")
const router = express.Router()


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { resigsterUser, loginUser } = require("../controllers/userControllers");
router
  .route("/create/user").post( resigsterUser);
  router
  .route("/login/user").post( loginUser);


module.exports = router