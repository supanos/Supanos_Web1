import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@suponos.com',
      password: 'admin123',
      role: 'ADMIN',
    },
  });

  // Menu categories with items
  await Promise.all([
    prisma.menuCategory.create({
      data: {
        name: 'Starters',
        items: {
          create: [
            {
              name: 'Buffalo Wings',
              description: 'Spicy chicken wings served with celery.',
              price: 8.99,
              ingredients: ['chicken', 'hot sauce', 'celery'],
              imageUrl: '/images/starters-wings.jpg',
            },
            {
              name: 'Loaded Nachos',
              description: 'Corn chips topped with cheese and jalapeños.',
              price: 6.5,
              ingredients: ['corn chips', 'cheese', 'jalapeños'],
              imageUrl: '/images/starters-nachos.jpg',
            },
          ],
        },
      },
    }),
    prisma.menuCategory.create({
      data: {
        name: 'Mains',
        items: {
          create: [
            {
              name: 'Classic Burger',
              description: 'Beef patty with lettuce and tomato.',
              price: 11.99,
              ingredients: ['beef', 'bun', 'lettuce', 'tomato'],
              imageUrl: '/images/mains-burger.jpg',
            },
          ],
        },
      },
    }),
    prisma.menuCategory.create({
      data: {
        name: 'Sides',
        items: {
          create: [
            {
              name: 'French Fries',
              description: 'Crispy golden fries.',
              price: 3.5,
              ingredients: ['potatoes', 'salt', 'oil'],
              imageUrl: '/images/sides-fries.jpg',
            },
          ],
        },
      },
    }),
    prisma.menuCategory.create({
      data: {
        name: 'Desserts',
        items: {
          create: [
            {
              name: 'Chocolate Cake',
              description: 'Rich chocolate layered cake.',
              price: 5.0,
              ingredients: ['chocolate', 'flour', 'eggs'],
              imageUrl: '/images/desserts-chocolate-cake.jpg',
            },
          ],
        },
      },
    }),
    prisma.menuCategory.create({
      data: {
        name: 'Drinks',
        items: {
          create: [
            {
              name: 'Lemonade',
              description: 'Freshly squeezed lemonade.',
              price: 2.5,
              ingredients: ['lemon', 'sugar', 'water'],
              imageUrl: '/images/drinks-lemonade.jpg',
            },
          ],
        },
      },
    }),
  ]);

  // Events
  await prisma.event.createMany({
    data: [
      {
        title: 'NFL Game Night',
        description: 'Watch the big game on our big screens.',
        date: new Date('2024-09-08T20:00:00Z'),
        imageUrl: '/images/events/nfl-game-night.jpg',
      },
      {
        title: 'Karaoke Night',
        description: 'Grab the mic and sing your favorite songs.',
        date: new Date('2024-09-15T20:00:00Z'),
        imageUrl: '/images/events/karaoke-night.jpg',
      },
    ],
  });

  // Reservations
  await prisma.reservation.createMany({
    data: [
      {
        name: 'John Doe',
        phone: '555-1234',
        guests: 4,
        date: new Date('2024-09-10T19:00:00Z'),
        status: 'PENDING',
      },
      {
        name: 'Jane Smith',
        phone: '555-5678',
        guests: 2,
        date: new Date('2024-09-12T20:00:00Z'),
        status: 'CONFIRMED',
      },
      {
        name: 'Mike Johnson',
        phone: '555-9012',
        guests: 6,
        date: new Date('2024-09-14T18:30:00Z'),
        status: 'CANCELLED',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
