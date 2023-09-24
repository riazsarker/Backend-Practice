const express = require("express");
const router = express.Router();

const {
  adminCreate,
  managerCreate,
  clientCreate,
  deleteManager,
  deleteClient,
  projectCreate,
  getAllProject,
  getProject,
  getAllManager,
  getAllClient,
} = require("../controllers/hrControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/admin/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), adminCreate);
router
  .route("/manager/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), managerCreate);
router
  .route("/get/manager")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllManager);
router
  .route("/manager/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Hr"), deleteManager);
router
  .route("/client/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), clientCreate);

router
  .route("/get/client")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllClient);
router
  .route("/client/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("Hr"), deleteClient);

router
  .route("/project/create")
  .post(isAuthenticatedUser, authorizeRoles("Hr"), projectCreate);
router
  .route("/get/project")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getAllProject);
router
  .route("/get/project/:id")
  .get(isAuthenticatedUser, authorizeRoles("Hr"), getProject);

module.exports = router;
