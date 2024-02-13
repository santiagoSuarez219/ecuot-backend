const registrar = (req, res) => {
  console.log(req.body);
  res.json({ msg: "Usuario registrado" });
};

export { registrar };
