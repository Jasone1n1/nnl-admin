// app/admin/protected/dashboard/page.tsx
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Form from '@/models/formModel';
import DashboardCharts from './DashboardCharts';
import { Types } from 'mongoose';

interface LeanUser {
  _id: string | Types.ObjectId;
  username: string;
  isActive: boolean;
}

export default async function DashboardPage() {
  await dbConnect();

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const totalApplicationsToday = await Form.countDocuments({ submittedAt: { $gte: twentyFourHoursAgo } });
  const targetApplications = 100;
  const totalApplications = await Form.countDocuments();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const loginData = await User.aggregate([
    { $match: { role: { $in: ['admin', 'editor'] }, lastLogin: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$lastLogin' }
        },
        logins: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const users = await User.find({}, 'username isActive').lean<LeanUser[]>();
  const usersWithStringId = users.map(user => ({
    ...user,
    _id: user._id.toString(),
  }));

  return (
    <DashboardCharts
      totalApplicationsToday={totalApplicationsToday}
      totalApplications={totalApplications}
      targetApplications={targetApplications}
      loginData={loginData.map(item => ({ date: item._id, logins: item.logins }))}
      users={usersWithStringId}
    />
  );
}
