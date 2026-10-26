import Item from '../models/Item.js';

export const createItem = async (req, res) => {
  const { title, description, category, type, image, location, date, additionalDetails } = req.body;

  if (!title || !description || !category || !type || !location || !date) {
    return res.status(400).json({ message: 'Please provide all required item fields.' });
  }

  const item = await Item.create({
    title,
    description,
    category,
    type,
    image: image || '',
    location,
    date,
    additionalDetails: additionalDetails || '',
    reportedBy: req.user.id,
  });

  const populatedItem = await item.populate('reportedBy', 'name email studentId');
  return res.status(201).json({ item: populatedItem });
};

export const getItems = async (req, res) => {
  const { q, category, type, status, limit } = req.query;
  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
    ];
  }

  if (type && type !== 'all') filter.type = type;
  if (category && category !== 'all') filter.category = category;
  if (status && status !== 'all') filter.status = status;

  const items = await Item.find(filter)
    .populate('reportedBy', 'name email studentId')
    .sort({ createdAt: -1 })
    .limit(limit ? Number(limit) : 0);

  return res.json({ items });
};

export const getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id).populate('reportedBy', 'name email studentId');
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  return res.json({ item });
};

export const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You can only update your own report.' });
  }

  Object.assign(item, req.body);
  await item.save();

  return res.json({ item });
};

export const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  if (item.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You can only delete your own report.' });
  }

  await item.deleteOne();
  return res.json({ message: 'Item deleted successfully.' });
};

export const getMyItems = async (req, res) => {
  const items = await Item.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
  return res.json({ items });
};
