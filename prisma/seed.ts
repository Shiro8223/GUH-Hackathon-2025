import prisma from "../app/lib/prisma";

const mockEvents = [
  {
    title: "Intro to 3D Printing Workshop",
    dateISO: new Date().toISOString(),
    city: "Manchester",
    tags: ["STEM", "Makers", "Technology"],
    imageUrl: "https://media.printables.com/media/prints/16204/images/153738_3c777ac0-8795-4709-b6dd-248c94f267ee/thumbs/inside/1280x960/jpg/img_1579_16204.webp",
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
    imageUrl: "https://roarnews.co.uk/wp-content/uploads/2024/10/Screenshot-2024-10-25-at-19.26.34.png",
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
    imageUrl: "https://www.entrepreneurscollective.biz/wp-content/uploads/2022/04/image.png",
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
    imageUrl: "https://gridphilly.com/wp-content/uploads/2023/06/thumbnail_July-dYojxB.tmp_.jpg",
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
    imageUrl: "https://static.wixstatic.com/media/c31f4e_e59a45d205f342249e4e155451942099~mv2.png/v1/fit/w_2500,h_1330,al_c/c31f4e_e59a45d205f342249e4e155451942099~mv2.png",
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
    imageUrl: "https://sustainability.leeds.ac.uk/wp-content/uploads/sites/106/2024/02/IMG_3606.jpg",
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
    imageUrl: "https://cdn-icons-png.freepik.com/512/8561/8561396.png",
    recommendedMajors: ["Computer Science", "Digital Arts"],
    isPaid: false,
    distanceBucket: "nearby",
    priceGBP: 0,
    isOppositeOfUserMajor: false,
  },
  {
    title: "Knitting night at the pub",
    dateISO: new Date(Date.now() + 7 * 86400000).toISOString(),
    city: "Liverpool",
    tags: ["Wellbeing", "Social", "Crafts"],
    imageUrl: "https://images.squarespace-cdn.com/content/v1/6590759b14ea15704a285c7a/536ef389-8a61-4040-abb7-69378f4ee181/knit+night+.jpg",
    recommendedMajors: ["Fashion", "Art & Design"],
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
