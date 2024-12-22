const { Router } = require("express");
const BookingController = require("../controller/booking.controller");
const AuthMiddleware = require("../middlewares/verifyToken.middleware");

const router = Router();
const booking = new BookingController();
const auth = new AuthMiddleware();

router.get("/", booking.getAllBookings);
router.get("/:id", booking.getBookingById);
router.delete("/:id", auth.authenticate, auth.restrict(["admin"]), booking.deleteBooking);

module.exports = router;
