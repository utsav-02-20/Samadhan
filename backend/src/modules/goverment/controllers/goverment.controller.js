import {
  createGovernment,
  getGovernmentById,
  getGovernments,
} from "../services/goverment.service.js";

export const createGovernmentController = async (req, res) => {
  const government = await createGovernment(req.body);

  res.status(201).json({
    success: true,
    message: "Government created successfully",
    data: government,
  });
};

export const getGovernmentController = async (req, res) => {
  const government = await getGovernmentById(req.params.id);

  res.status(200).json({
    success: true,
    data: government,
  });
};

export const getGovernmentsController = async (req, res) => {
  const governments = await getGovernments();

  res.status(200).json({
    success: true,
    data: governments,
  });
};
