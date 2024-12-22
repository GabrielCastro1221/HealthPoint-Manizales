const rentModel = require("../models/rent.model");
const doctorModel = require("../models/doctor.model");
const EmailManager = require("../services/mailer");

const mailer = new EmailManager();

class RentController {
  createRent = async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        dimension,
        owner,
        owner_phone,
        owner_email,
        address,
        category,
      } = req.body;
      const requiredFields = [
        title,
        description,
        price,
        owner,
        owner_email,
        owner_phone,
        dimension,
        address,
        category,
      ];
      if (requiredFields.includes(undefined) || requiredFields.includes(null) || requiredFields.includes("")) {
        return res.status(400).json({
          status: false,
          message: "Todos los campos son obligatorios",
        });
      }
      const mainImg = req.files["mainImg"][0].path;
      const photos = req.files["photos"].map((file) => file.path);
      const newRent = new rentModel({
        title,
        description,
        img: mainImg,
        photo: photos,
        price,
        owner,
        owner_email,
        owner_phone,
        dimension,
        address,
        category,
      });
      await newRent.save();
      const consultorioData = {
        title,
        address,
        price,
        owner,  
        owner_email, 
      };
      await mailer.enviarCorreoNuevoConsultorio(consultorioData);
      res.status(201).json({
        status: true,
        message: "Renta creada con éxito",
        renta: newRent,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error al crear la renta",
        error: err.message,
      });
    }
  };
  
  getAllRents = async (req, res) => {
    try {
      const rents = await rentModel.find({});
      if (!rents) {
        res
          .status(404)
          .json({ status: false, message: "Rentas no encontradas" });
      }
      res
        .status(201)
        .json({ status: true, message: "Rentas encontradas", rentas: rents });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error al obtener las rentas",
        error: err.message,
      });
    }
  };

  getRentById = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findById(id);
      if (!rent) {
        res
          .status(404)
          .json({ status: false, message: "Rentas no encontradas" });
      }
      res
        .status(201)
        .json({ status: true, message: "Renta encontrada", renta: rent });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error al obtener la renta",
        error: err.message,
      });
    }
  };

  updateRent = async (req, res) => {
    const { id } = req.params;
    try {
      const updateRent = await rentModel.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!updateRent) {
        res.status(404).json({ status: false, message: "Renta no encontrada" });
      }
      res.status(200).json({
        status: true,
        message: "Renta actualizada con exito",
        renta: updateRent,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error al actualizar la renta",
        error: err.message,
      });
    }
  };

  deleteRent = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findByIdAndDelete(id);
      if (!rent) {
        res
          .status(404)
          .json({ status: false, message: "Rentas no encontradas" });
      }
      res.status(201).json({
        status: true,
        message: "Renta eliminda con exito",
        renta: rent,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error al eliminar la renta",
        error: err.message,
      });
    }
  };

  changeApprovalStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findById(id);
      if (!rent) {
        return res.status(404).json({
          success: false,
          message: "Renta no encontrada",
        });
      }
      const updatedrent = await rentModel.findByIdAndUpdate(
        id,
        { isApproved: "approved" },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: `Estado de aprobación actualizado a "approved"`,
        data: updatedrent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado de aprobación",
        error: error.message,
      });
    }
  };

  cancelledStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findById(id);
      if (!rent) {
        return res.status(404).json({
          success: false,
          message: "Renta no encontrada",
        });
      }
      const updatedrent = await rentModel.findByIdAndUpdate(
        id,
        { isApproved: "cancelled" },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: `Estado de aprobación actualizado a "cancelled"`,
        data: updatedrent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado de aprobación",
        error: error.message,
      });
    }
  };

  changeAvaliableStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findById(id);
      if (!rent) {
        return res.status(404).json({
          success: false,
          message: "Renta no encontrada",
        });
      }
      const updatedrent = await rentModel.findByIdAndUpdate(
        id,
        { status: "disponible" },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: `Estado de aprobación actualizado a "disponible"`,
        data: updatedrent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado de aprobación",
        error: error.message,
      });
    }
  };

  changeRentedStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const rent = await rentModel.findById(id);
      if (!rent) {
        return res.status(404).json({
          success: false,
          message: "Renta no encontrada",
        });
      }
      const updatedrent = await rentModel.findByIdAndUpdate(
        id,
        { status: "alquilado" },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: `Estado de aprobación actualizado a "alquilado"`,
        data: updatedrent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado de aprobación",
        error: error.message,
      });
    }
  };
}

module.exports = RentController;
