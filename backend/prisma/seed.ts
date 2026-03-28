import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create test users
  const hashedPassword1 = await bcrypt.hash('Test123!', 10);
  const hashedPassword2 = await bcrypt.hash('Admin123!', 10);

  const investor = await prisma.user.upsert({
    where: { email: 'investor@test.com' },
    update: {},
    create: {
      email: 'investor@test.com',
      password: hashedPassword1,
      fullName: 'Test Investor',
      phone: '+971500000000',
      role: 'investor',
      kycStatus: 'verified',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      password: hashedPassword2,
      fullName: 'Admin User',
      phone: '+971501111111',
      role: 'admin',
      kycStatus: 'verified',
    },
  });

  console.log('Created users:', investor.email, admin.email);

  // Properties mapping according to user requirements
  const propertiesData = [
    {
      name: 'Marina Pearl Tower - Unit 1502',
      type: 'apartment',
      locationEmirate: 'Dubai',
      locationArea: 'Dubai Marina',
      totalTokens: 10000,
      availableTokens: 3500,
      pricePerToken: 500,
      minInvestment: 500,
      sizeSqft: 1450,
      bedrooms: 2,
      bathrooms: 3,
      expectedYield: 8.5,
      fundedAmount: 3250000,
      status: 'funding',
      images: ['/assets/property-marina.png'],
      amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Concierge'],
      description: 'A luxurious apartment in the heart of Dubai Marina.',
    },
    {
      name: 'Downtown Executive Suite',
      type: 'apartment',
      locationEmirate: 'Dubai',
      locationArea: 'Downtown Dubai',
      totalTokens: 8000,
      availableTokens: 0,
      pricePerToken: 625,
      minInvestment: 500,
      sizeSqft: 1100,
      bedrooms: 1,
      bathrooms: 2,
      expectedYield: 9.2,
      fundedAmount: 5000000,
      status: 'funded',
      images: ['/assets/property-downtown.png'],
      amenities: ['Pool', 'Gym', 'City Views', 'Valet Parking'],
      description: 'High-end suite fully funded.',
    },
    {
      name: 'Palm Jumeirah Villa',
      type: 'villa',
      locationEmirate: 'Dubai',
      locationArea: 'Palm Jumeirah',
      totalTokens: 40000,
      availableTokens: 28000,
      pricePerToken: 750,
      minInvestment: 500,
      sizeSqft: 3500,
      bedrooms: 4,
      bathrooms: 5,
      expectedYield: 7.8,
      fundedAmount: 9000000,
      status: 'funding',
      images: ['/assets/property-palm.png'],
      amenities: ['Private Beach', 'Private Pool', 'Maids Room', 'Garden'],
      description: 'Exclusive villa on the Palm.',
    },
    {
      name: 'Business Bay Office Space',
      type: 'commercial',
      locationEmirate: 'Dubai',
      locationArea: 'Business Bay',
      totalTokens: 15000,
      availableTokens: 12500,
      pricePerToken: 550,
      minInvestment: 500,
      sizeSqft: 2200,
      bedrooms: 0,
      bathrooms: 2,
      expectedYield: 10.5,
      fundedAmount: 1375000,
      status: 'funding',
      images: ['/assets/property-difc.png'], // reusing difc for commercial
      amenities: ['Conference Room', 'Pantry', 'High-speed Internet', 'Covered Parking'],
      description: 'Prime commercial location.',
    },
    {
      name: 'JBR Beachfront Apartment',
      type: 'apartment',
      locationEmirate: 'Dubai',
      locationArea: 'JBR',
      totalTokens: 12000,
      availableTokens: 5000,
      pricePerToken: 600,
      minInvestment: 500,
      sizeSqft: 1800,
      bedrooms: 3,
      bathrooms: 3,
      expectedYield: 8.0,
      fundedAmount: 4200000,
      status: 'funding',
      images: ['/assets/hero-bg-4k.png'], // generic
      amenities: ['Beach Access', 'Gym', 'Pool', 'Retail Outlets'],
      description: 'Beachfront living at its finest.',
    },
  ];

  for (const property of propertiesData) {
    const p = await prisma.property.create({
      data: property,
    });
    console.log('Created property:', p.name);
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
