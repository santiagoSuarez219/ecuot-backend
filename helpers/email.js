import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dc21d08311eb8a",
      pass: "524dca06463beb",
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
        <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Confirmar cuenta</a>
        <p>Si no has solicitado este correo, puedes ignorarlo</p>
    `,
  });
};
