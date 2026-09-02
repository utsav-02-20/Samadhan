import Department from "../models/department.model.js";

export const createDepartment = async (req, res, next) => {
  try {
    const { name, code, head, email, membersCount } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Department name is required." });
    }

    const deptCode = code || name.slice(0, 4).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);

    const department = await Department.create({
      name,
      code: deptCode,
      head: head || "Department Head",
      email: email || `${deptCode.toLowerCase()}@samadhan.gov.in`,
      membersCount: membersCount || 10,
    });

    return res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found." });
    }

    return res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error) {
    next(error);
  }
};

export const assignChallengeToDepartment = async (req, res, next) => {
  try {
    const { departmentId, problemId, title } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found." });
    }

    department.assignedChallenges.push({
      problemId,
      title,
      status: "ASSIGNED",
    });

    await department.save();

    return res.status(200).json({
      success: true,
      message: "Challenge assigned to department successfully.",
      data: department,
    });
  } catch (error) {
    next(error);
  }
};
