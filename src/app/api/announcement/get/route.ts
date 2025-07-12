import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Announcement from '@/models/Announcement.model';

export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json({ message: 'Failed to fetch announcements' }, { status: 500 });
  }
}
