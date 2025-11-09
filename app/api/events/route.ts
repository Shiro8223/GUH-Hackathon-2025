import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      dateISO,
      city,
      tags,
      imageUrl,
      recommendedMajors,
      isPaid,
      priceGBP,
      distanceBucket,
      isOppositeOfUserMajor,
    } = body;

    // Validate required fields
    if (!title || !dateISO || !city || !tags || !recommendedMajors || !distanceBucket) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create event in database
    const event = await prisma.event.create({
      data: {
        title,
        dateISO,
        city,
        tags: JSON.stringify(tags),
        imageUrl: imageUrl || null,
        recommendedMajors: JSON.stringify(recommendedMajors),
        isPaid: isPaid || false,
        priceGBP: priceGBP || null,
        distanceBucket,
        isOppositeOfUserMajor: isOppositeOfUserMajor || false,
      },
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: {
          ...event,
          tags: JSON.parse(event.tags),
          recommendedMajors: JSON.parse(event.recommendedMajors),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        dateISO: "asc",
      },
    });

    // Parse JSON strings back to arrays
    const parsedEvents = events.map((event: any) => ({
      ...event,
      tags: JSON.parse(event.tags),
      recommendedMajors: JSON.parse(event.recommendedMajors),
      hasFirstTimeBonus: event.hasFirstTimeBonus || false,
    }));

    return NextResponse.json({ events: parsedEvents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
