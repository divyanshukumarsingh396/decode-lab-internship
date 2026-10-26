import Claim from '../models/Claim.js';
import Item from '../models/Item.js';

export const createClaim = async (req, res) => {
  const { itemId, name, email, studentId, reason, identificationDetails } = req.body;

  if (!itemId || !name || !email || !studentId || !reason) {
    return res.status(400).json({ message: 'Please fill in all required claim fields.' });
  }

  const item = await Item.findById(itemId);
  if (!item) {
    return res.status(404).json({ message: 'Item not found.' });
  }

  if (item.reportedBy.toString() === req.user.id) {
    return res.status(400).json({ message: 'You cannot claim your own item.' });
  }

  const existingClaim = await Claim.findOne({ itemId, claimantId: req.user.id });
  if (existingClaim) {
    return res.status(400).json({ message: 'You have already submitted a claim for this item.' });
  }

  const claim = await Claim.create({
    itemId,
    claimantId: req.user.id,
    ownerId: item.reportedBy,
    name,
    email,
    studentId,
    reason,
    identificationDetails: identificationDetails || '',
  });

  item.status = 'claim requested';
  await item.save();

  return res.status(201).json({ claim });
};

export const getMyClaims = async (req, res) => {
  const claims = await Claim.find({ claimantId: req.user.id }).populate('itemId').sort({ createdAt: -1 });
  return res.json({ claims });
};

export const getClaimById = async (req, res) => {
  const claim = await Claim.findById(req.params.id).populate('itemId').populate('claimantId', 'name email');
  if (!claim) {
    return res.status(404).json({ message: 'Claim not found.' });
  }

  return res.json({ claim });
};

export const updateClaimStatus = async (req, res) => {
  const { status } = req.body;
  const claim = await Claim.findById(req.params.id);

  if (!claim) {
    return res.status(404).json({ message: 'Claim not found.' });
  }

  if (claim.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only the item owner or admin can update claim status.' });
  }

  claim.status = status;
  await claim.save();

  if (status === 'accepted') {
    const item = await Item.findById(claim.itemId);
    if (item) {
      item.status = 'claimed';
      await item.save();
    }
  }

  return res.json({ claim });
};
