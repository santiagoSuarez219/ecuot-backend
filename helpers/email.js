import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "'ECUOT - Repositorio Institucional' <cuentas@ecuot.com>",
    to: email,
    subject: "Ecuot - Confirma tu cuenta",
    text: "Comprueba tu cuenta en Ecuot",
    html: `
        <h1>Hola ${nombre}</h1>
        <p>Comprueba tu cuenta en el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar/${token}">Confirmar cuenta</a>
        <p>Si no has solicitado este correo, puedes ignorarlo</p>
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const info = await transport.sendMail({
    from: "'ECUOT - Repositorio Institucional' <cuentas@ecuot.com>",
    to: email,
    subject: "Ecuot - Reestablece tu password",
    text: "Reestablece tu password en Ecuot",
    html: `
        <h1>Hola ${nombre}</h1>
        <p>Has solicitado reestablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password: </p>
        <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Password</a>
        <p>Si no has solicitado este correo, puedes ignorarlo</p>
    `,
  });
};
