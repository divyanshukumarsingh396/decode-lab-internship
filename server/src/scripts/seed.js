import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Item from '../models/Item.js';
import Claim from '../models/Claim.js';
import connectDB from '../config/db.js';

const runSeed = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Item.deleteMany({});
    await Claim.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);

    const admin = await User.create({
      name: 'Campus Admin',
      email: 'admin@campusfind.com',
      studentId: 'TMU-ADMIN-001',
      password: adminPassword,
      role: 'admin',
    });

    const student = await User.create({
      name: 'Aarav Sharma',
      email: 'student@campusfind.com',
      studentId: 'TMU-2023-101',
      password: studentPassword,
      role: 'student',
    });

    await Item.insertMany([
      {
        title: 'Black Laptop Bag',
        type: 'lost',
        category: 'Accessories',
        description: 'Black backpack with silver zipper and blue key chain.',
        location: 'Library Block',
        date: new Date('2026-10-10'),
        status: 'open',
        reportedBy: student._id,
      },
      {
        title: 'Blue Water Bottle',
        type: 'found',
        category: 'Personal Items',
        description: 'Found near the engineering canteen during lunch break.',
        location: 'Engineering Canteen',
        date: new Date('2026-10-12'),
        status: 'open',
        reportedBy: admin._id,
      },
      {
        title: 'Student ID Card',
        type: 'lost',
        category: 'Documents',
        description: 'Student ID card with name and student number printed.',
        location: 'Hostel Gate',
        date: new Date('2026-10-15'),
        status: 'resolved',
        reportedBy: student._id,
      },
    ]);

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  } finally {
    mongoose.disconnect();
  }
};

runSeed();
