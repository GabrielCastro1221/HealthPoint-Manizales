const { Router } = require("express");
const RentController = require("../controller/rent.controller");
const upload = require("../middlewares/upload.middleware");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const rent = new RentController();
const auth = new AuthMiddleware();

router.post(
  "/",
  upload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  rent.createRent
);

router.get("/", rent.getAllRents);
router.get("/:id", rent.getRentById);

router.put(
  "/:id",
  auth.authenticate,
  auth.restrict(["doctor"]),
  rent.updateRent
);

router.delete(
  "/:id",
  auth.authenticate,
  auth.restrict(["doctor", "admin"]),
  rent.deleteRent
);

router.put(
  "/:id/approval-status",
  auth.authenticate,
  auth.restrict(["admin"]),
  rent.changeApprovalStatus
);

router.put(
  "/:id/cancelled-status",
  auth.authenticate,
  auth.restrict(["admin"]),
  rent.cancelledStatus
);

router.put(
  "/:id/avaliable-status",
  auth.authenticate,
  auth.restrict(["doctor"]),
  rent.changeAvaliableStatus
);

router.put(
  "/:id/rented-status",
  auth.authenticate,
  auth.restrict(["doctor"]),
  rent.changeRentedStatus
);

module.exports = router;
