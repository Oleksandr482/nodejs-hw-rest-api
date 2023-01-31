const { sendVerifyService } = require("../../services/email");

const sendVerifyController = async (req, res) => {
  const { email } = req.body;
  await sendVerifyService(email);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = { sendVerifyController };
