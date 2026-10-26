import jwt from 'jsonwebtoken';

const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET || 'campusfind_super_secret_key',
    { expiresIn: '7d' }
  );

export default generateToken;
