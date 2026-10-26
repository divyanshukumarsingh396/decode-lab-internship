import User from '../models/User.js';
import Item from '../models/Item.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const items = await Item.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });

  return res.json({ user, items });
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const { name, email, studentId } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (studentId) user.studentId = studentId;

  await user.save();

  return res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      role: user.role,
    },
  });
};
