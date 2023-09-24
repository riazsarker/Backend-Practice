const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const ApiFetaures = require("../utils/apiFeatures");
const Admin = require("../models/User/adminModel");
const Manager = require("../models/User/managerModel");
const Client = require("../models/User/clientModel");
const Project = require("../models/Projects/projectModel");

/* ===================================================
        Create Admin (/api/v1/admin/create) (req : POST)
   =================================================== */
exports.adminCreate = catchAsyncError(async (req, res, next) => {
  const { userName, password, email, name } = req.body;
  if (!userName | !password) {
    return next(new ErrorHandler("Please enter username & password", 400));
  }
  if (!email | !name) {
    return next(new ErrorHandler("Please enter email & fullname", 400));
  }

  const user = await Admin.findOne({ userName });
  if (user) {
    return next(new ErrorHandler("This username is already created", 400));
  }

  await Admin.create({ userName, password, email, name });
  res.status(200).json({
    success: true,
    message: "Successfully Admin Created",
  });
});

/* ===================================================
        Create Manager (/api/v1/manager/create) (req : POST)
   =================================================== */
exports.managerCreate = catchAsyncError(async (req, res, next) => {
  const { userName, password, email, name, mobile } = req.body;
  if (!userName | !password) {
    return next(new ErrorHandler("Please enter username & password", 400));
  }
  if (!email | !name) {
    return next(new ErrorHandler("Please enter email & fullname", 400));
  }

  const user = await Manager.findOne({ userName });
  if (user) {
    return next(new ErrorHandler("This username is already created", 400));
  }

  await Manager.create({ userName, password, email, name, mobile });
  res.status(200).json({
    success: true,
    message: "Successfully Manager Created",
  });
});
/* ===================================================
        Get All Manager (/api/v1/get/manager) (req : Get)
   =================================================== */
exports.getAllManager = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFetaures(Manager.find(), req.query).nameSearch();
  const managers = await apifeatures.query;

  res.status(200).json({
    success: true,
    managers,
  });
});

/* ===================================================
        Delete Manager (/api/v1/manager/delete/:id) (req : Delete)
   =================================================== */
exports.deleteManager = catchAsyncError(async (req, res, next) => {
  const manager = await Manager.findById(req.params.id);

  if (!manager) {
    return next(new ErrorHandler(`No Manager Found`));
  }
  await Manager.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Successfully Manager Deleted",
  });
});

/* ===================================================
        Create Client (/api/v1/client/create) (req : POST)
   =================================================== */
exports.clientCreate = catchAsyncError(async (req, res, next) => {
  const { userName, password, email, name, mobile } = req.body;
  if (!userName | !password) {
    return next(new ErrorHandler("Please enter username & password", 400));
  }
  if (!email | !name) {
    return next(new ErrorHandler("Please enter email & fullname", 400));
  }

  const user = await Client.findOne({ userName });
  if (user) {
    return next(new ErrorHandler("This username is already created", 400));
  }

  await Client.create({ userName, password, email, name, mobile });
  res.status(200).json({
    success: true,
    message: "Successfully Client Created",
  });
});

/* ===================================================
        Get All Client (/api/v1/get/client) (req : Get)
   =================================================== */
exports.getAllClient = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFetaures(Client.find(), req.query).nameSearch();
  const clients = await apifeatures.query;
  res.status(200).json({
    success: true,
    clients,
  });
});

/* ===================================================
        Delete Client (/api/v1/client/delete/:id) (req : Delete)
=================================================== */
exports.deleteClient = catchAsyncError(async (req, res, next) => {
  const client = await Client.findById(req.params.id);

  if (!client) {
    return next(new ErrorHandler(`No Client Found`));
  }
  await Client.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Successfully Client Deleted",
  });
});

/* ===================================================
        Create Project (/api/v1/project/create) (req : POST)
   =================================================== */
exports.projectCreate = catchAsyncError(async (req, res, next) => {
  if (!req.body.deadline) {
    return next(new ErrorHandler(`Please Enter a Deadline`));
  }
  const deadline = new Date(req.body.deadline);
  if (!req.body.clientId) {
    return next(new ErrorHandler(`Please Select a Client`));
  }
  if (!req.body.managerId) {
    return next(new ErrorHandler(`Please Select a Manager`));
  }
  const projectData = {
    name: req.body.name,
    owner: req.user._id,
    client: req.body.clientId,
    manager: req.body.managerId,
    code: req.body.code,
    description: req.body.description,
    payable: req.body.payable,
    receivable: req.body.receivable,
    deadline: deadline,
    status: req.body.status,
  };

  const project = await Project.create(projectData);
  const manager = await Manager.findById(req.body.managerId);
  const client = await Client.findById(req.body.clientId);

  await Manager.findByIdAndUpdate(req.body.managerId, {
    activeProject: project._id,
  });
  await Client.findByIdAndUpdate(req.body.clientId, {
    activeProject: project._id,
  });

  await manager.allProject.push(project._id);
  await client.allProject.push(project._id);
  await manager.save();
  await client.save();
  res.status(200).json({
    success: true,
    message: "Successfully Project Created",
  });
});
/* ===================================================
        Get All Project (/api/v1/get/project) (req : Get)
   =================================================== */
exports.getAllProject = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFetaures(
    Project.find(),
    req.query
  ).projectSearch();
  const projects = await apifeatures.query;

  res.status(200).json({
    success: true,
    projects,
  });
});

/* ===================================================
        Get Single Project (/api/v1/get/project/:id) (req : Get)
   =================================================== */
exports.getProject = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler(`No Project Found`));
  }
  res.status(200).json({
    success: true,
    project,
  });
});
