import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Announcement from '@/models/Announcement.model';

// POST /api/announcement/create
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, subtitle, description, links } = body;

    if (!title || !subtitle || !description || !links) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    const newAnnouncement = new Announcement({
      title,
      subtitle,
      description,
      links,
      date: new Date(),
    });

    await newAnnouncement.save();

    return NextResponse.json(
      { message: 'Announcement created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { message: 'Server error while creating announcement' },
      { status: 500 }
    );
  }
}
