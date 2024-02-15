import Role from "../models/Role.js";

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new Role({ nombre: "investigador" }).save(),
      new Role({ nombre: "estudiante" }).save(),
      new Role({ nombre: "usuario" }).save(),
    ]);
  } catch (error) {
    console.log(error);
  }
};
