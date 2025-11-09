import prisma from "../app/lib/prisma";

const mockEvents = [
  {
    title: "Intro to 3D Printing Workshop",
    dateISO: new Date().toISOString(),
    city: "Manchester",
    tags: ["STEM", "Makers", "Technology"],
    imageUrl: "https://via.placeholder.com/640x360?text=3D+Printing+Workshop",
    recommendedMajors: ["Art & Design", "Engineering"],
    isPaid: false,
    distanceBucket: "city-away",
    priceGBP: 0,
    isOppositeOfUserMajor: true,
  },
  {
    title: "Stand-up Comedy Night",
    dateISO: new Date(Date.now() + 86400000).toISOString(),
    city: "Manchester",
    tags: ["Arts", "Performance", "Entertainment"],
    imageUrl: "https://via.placeholder.com/640x360?text=Comedy+Night",
    recommendedMajors: ["Computer Science", "Engineering"],
    isPaid: true,
    priceGBP: 8,
    distanceBucket: "nearby",
    isOppositeOfUserMajor: true,
  },
  {
    title: "Startup Pitch Workshop",
    dateISO: new Date(Date.now() + 2 * 86400000).toISOString(),
    city: "Salford",
    tags: ["Business", "Startups", "Networking"],
    imageUrl: "https://via.placeholder.com/640x360?text=Pitch+Workshop",
    recommendedMajors: ["Business", "Economics"],
    isPaid: true,
    distanceBucket: "local",
    priceGBP: 15,
    isOppositeOfUserMajor: false,
  },
  {
    title: "Creative Photography Walk",
    dateISO: new Date(Date.now() + 3 * 86400000).toISOString(),
    city: "Liverpool",
    tags: ["Art", "Photography", "Outdoor"],
    imageUrl: "https://via.placeholder.com/640x360?text=Photography+Walk",
    recommendedMajors: ["STEM", "Business"],
    isPaid: false,
    distanceBucket: "city-away",
    priceGBP: 0,
    isOppositeOfUserMajor: true,
  },
  {
    title: "AI in Healthcare Symposium",
    dateISO: new Date(Date.now() + 4 * 86400000).toISOString(),
    city: "Manchester",
    tags: ["Technology", "Healthcare", "AI"],
    imageUrl: "https://via.placeholder.com/640x360?text=AI+Healthcare",
    recommendedMajors: ["Medicine", "Computer Science"],
    isPaid: true,
    distanceBucket: "nearby",
    priceGBP: 25,
    isOppositeOfUserMajor: false,
  },
  {
    title: "Sustainable Fashion Workshop",
    dateISO: new Date(Date.now() + 5 * 86400000).toISOString(),
    city: "Salford",
    tags: ["Fashion", "Sustainability", "Design"],
    imageUrl: "https://via.placeholder.com/640x360?text=Sustainable+Fashion",
    recommendedMajors: ["Environmental Science", "Fashion Design"],
    isPaid: true,
    distanceBucket: "local",
    priceGBP: 12,
    isOppositeOfUserMajor: true,
  },
  {
    title: "Game Development Hackathon",
    dateISO: new Date(Date.now() + 6 * 86400000).toISOString(),
    city: "Manchester",
    tags: ["Gaming", "Technology", "Development"],
    imageUrl: "https://via.placeholder.com/640x360?text=Game+Dev+Hackathon",
    recommendedMajors: ["Computer Science", "Digital Arts"],
    isPaid: false,
    distanceBucket: "nearby",
    priceGBP: 0,
    isOppositeOfUserMajor: false,
  },
  {
    title: "Mental Health in Tech",
    dateISO: new Date(Date.now() + 7 * 86400000).toISOString(),
    city: "Liverpool",
    tags: ["Wellbeing", "Technology", "Health"],
    imageUrl: "https://via.placeholder.com/640x360?text=Tech+Mental+Health",
    recommendedMajors: ["Psychology", "Computer Science"],
    isPaid: false,
    distanceBucket: "city-away",
    priceGBP: 0,
    isOppositeOfUserMajor: true,
  },
];

async function main() {
  console.log("Starting to seed events...");

  // Clear existing events
  await prisma.event.deleteMany();
  console.log("Cleared existing events");

  // Seed events
  for (const event of mockEvents) {
    await prisma.event.create({
      data: {
        ...event,
        tags: JSON.stringify(event.tags),
        recommendedMajors: JSON.stringify(event.recommendedMajors),
      },
    });
  }

  console.log(`Seeded ${mockEvents.length} events successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
