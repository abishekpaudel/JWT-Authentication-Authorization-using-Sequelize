const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error("JWT_SECRET must be configured with at least 32 characters");
}

const isEmail = (value) =>
  typeof value === "string" && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (
    typeof name !== "string" ||
    !name.trim() ||
    !isEmail(email) ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return res.status(400).json({
      message: "A name, valid email and password of at least 8 characters are required."
    });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: normalizedEmail } });

    if (existing) {
      return res.status(409).json({ message: "Email already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.status(201).json({ message: "User registered successfully." });
  } catch (_) {
    return res.status(500).json({ message: "Unable to register user." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email) || typeof password !== "string") {
    return res.status(400).json({ message: "Valid email and password required." });
  }

  try {
    const user = await User.findOne({ where: { email: email.trim().toLowerCase() } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { email: user.email, userId: user.id },
      jwtSecret,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication successful.",
      token
    });
  } catch (_) {
    return res.status(500).json({ message: "Unable to log in." });
  }
};
