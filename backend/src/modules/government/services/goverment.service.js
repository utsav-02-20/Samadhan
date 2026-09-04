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
  try {
    let government = await Government.findOne({
      $or: [{ code: governmentId }, { _id: governmentId }],
    });
    if (!government) {
      government = await Government.findOne().sort({ createdAt: -1 });
    }
    if (!government) {
      government = {
        name: "State District Administration",
        code: "GOV-001",
        state: "Jharkhand",
        contactEmail: "admin@gov.in",
      };
    }
    return government;
  } catch (err) {
    return {
      name: "State District Administration",
      code: "GOV-001",
      state: "Jharkhand",
      contactEmail: "admin@gov.in",
    };
  }
};

export const getGovernments = async () => {
  return Government.find().sort({ createdAt: -1 });
};
