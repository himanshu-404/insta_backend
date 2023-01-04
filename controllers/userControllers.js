const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
};
