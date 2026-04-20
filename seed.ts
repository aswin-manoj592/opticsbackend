import { AppDataSource } from './data-source';
import { AdminUser } from './src/admin/user/user.entity';
import { AdminBranch } from './src/admin/branch/branch.entity';

async function seed() {
  console.log('Initializing database connection for seeding...');
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(AdminUser);
  const branchRepository = AppDataSource.getRepository(AdminBranch);

  // 1. Create a Default Branch First
  const branchName = 'Main HQ';
  let defaultBranch = await branchRepository.findOneBy({ name: branchName });
  
  if (!defaultBranch) {
    defaultBranch = branchRepository.create({
      name: branchName,
      city: 'Central City',
    });
    await branchRepository.save(defaultBranch);
    console.log(`Created new branch: ${branchName}`);
  } else {
    console.log(`Branch '${branchName}' already exists.`);
  }

  // 2. Create the Admin User
  const adminEmail = 'admin@example.com';
  let adminUser = await userRepository.findOneBy({ email: adminEmail });

  if (!adminUser) {
    adminUser = userRepository.create({
      name: 'Super Admin',
      email: adminEmail,
      phone: '1234567890',
      password: 'password123', // In your current system, this is stored as plaintext
      role: 'admin',
      status: 'Active',
      branch: defaultBranch
    });
    await userRepository.save(adminUser);
    console.log(`✅ Successfully seeded Admin User!
    Email: ${adminEmail}
    Password: password123
    Role: admin`);
  } else {
    console.log(`✅ Admin User '${adminEmail}' already exists!`);
  }

  // 3. Create a Demo Manager
  const managerEmail = 'manager@example.com';
  let managerUser = await userRepository.findOneBy({ email: managerEmail });

  if (!managerUser) {
    managerUser = userRepository.create({
      name: 'Store Manager',
      email: managerEmail,
      phone: '0987654321',
      password: 'password123',
      role: 'manager',
      status: 'Active',
      branch: defaultBranch
    });
    await userRepository.save(managerUser);
    console.log(`✅ Successfully seeded Manager User!
    Email: ${managerEmail}
    Password: password123
    Role: manager`);
  } else {
    console.log(`✅ Manager User '${managerEmail}' already exists!`);
  }

  console.log('Seeding process completed securely.');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Error during database seeding:', error);
  process.exit(1);
});
