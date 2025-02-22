const { userVerificationService } = require("../../services/email");

const userVerificationController = async (req, res) => {
  const { verificationToken } = req.params;
  await userVerificationService(verificationToken);
  res.json({
    message: "Verification successful",
  });
};

module.exports = { userVerificationController };
