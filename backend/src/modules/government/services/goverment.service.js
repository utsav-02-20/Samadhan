import Government from "../models/goverment.model.js";

export const createGovernment = async (data) => {
  const existingGovernment = await Government.findOne({
    code: data.code.toUpperCase(),
  });

  if (existingGovernment) {
    throw new Error("Government with this code already exists");
  }

  const government = await Government.create({
    ...data,
    code: data.code.toUpperCase(),
  });

  return government;
};

export const getGovernmentById = async (governmentId) => {
  const government = await Government.findById(governmentId);

  if (!government) {
    throw new Error("Government not found");
  }

  return government;
};

export const getGovernments = async () => {
  return Government.find().sort({ createdAt: -1 });
};
