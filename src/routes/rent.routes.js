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
router.put("/:id", rent.updateRent);
router.delete("/:id", rent.deleteRent);
router.put("/:id/approval-status", rent.changeApprovalStatus);
router.put("/:id/cancelled-status", rent.cancelledStatus);
router.put("/:id/avaliable-status", rent.changeAvaliableStatus);
router.put("/:id/rented-status", rent.changeRentedStatus);

module.exports = router;
