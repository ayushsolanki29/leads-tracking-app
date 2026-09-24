import prisma from './prisma';

async function main() {
  console.log('Seeding data...');

  await prisma.note.deleteMany();
  await prisma.lead.deleteMany();

  const leads = [
    { name: 'John Doe', email: 'john@example.com', phone: '1234567890', status: 'new' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', status: 'contacted' },
    { name: 'Bob Johnson', email: 'bob@example.com', phone: '5551234567', status: 'qualified' },
    { name: 'Alice Williams', email: 'alice@example.com', phone: '5559876543', status: 'lost' },
    { name: 'Charlie Brown', email: 'charlie@example.com', phone: '5555555555', status: 'new' }
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({ data: leadData });
    
    if (lead.status === 'contacted') {
      await prisma.note.create({
        data: { leadId: lead.id, content: 'Called and left a voicemail.' }
      });
    } else if (lead.status === 'qualified') {
      await prisma.note.create({
        data: { leadId: lead.id, content: 'Had a great conversation, very interested.' }
      });
      await prisma.note.create({
        data: { leadId: lead.id, content: 'Sent pricing proposal.' }
      });
    } else if (lead.status === 'lost') {
      await prisma.note.create({
        data: { leadId: lead.id, content: 'Not interested at this time.' }
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
