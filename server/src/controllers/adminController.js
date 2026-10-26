import Item from '../models/Item.js';
import User from '../models/User.js';
import Claim from '../models/Claim.js';

export const getDashboardStats = async (req, res) => {
  const totalReports = await Item.countDocuments();
  const activeUsers = await User.countDocuments();
  const pendingClaims = await Claim.countDocuments({ status: 'pending' });
  const resolvedReports = await Item.countDocuments({ status: 'resolved' });

  return res.json({
    stats: {
      totalReports,
      activeUsers,
      pendingClaims,
      resolvedReports,
    },
  });
};

export const getAllItems = async (req, res) => {
  const items = await Item.find().populate('reportedBy', 'name email studentId').sort({ createdAt: -1 });
  return res.json({ items });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  return res.json({ users });
};

export const updateItemStatus = async (req, res) => {
  const { status } = req.body;
  const item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  item.status = status;
  await item.save();
  return res.json({ item });
};

export const deleteItemAdmin = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  await item.deleteOne();
  return res.json({ message: 'Item removed by admin.' });
};
