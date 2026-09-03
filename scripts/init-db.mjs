import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const host = process.env.MYSQL_HOST || '127.0.0.1';
const port = Number(process.env.MYSQL_PORT) || 3306;
const user = process.env.MYSQL_USER || 'root';
const password = process.env.MYSQL_PASSWORD || '';
const database = process.env.MYSQL_DATABASE || 'lianasolar';

console.log(`Connecting to MySQL server at ${host}:${port} as ${user}...`);

async function runMigration() {
  let connection;
  try {
    // 1. Connect without database to ensure database exists
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });

    console.log('Connected to MySQL server successfully!');

    // 2. Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`Database "${database}" created / verified.`);

    // 3. Switch to database
    await connection.query(`USE \`${database}\`;`);

    // 4. Create Tables
    console.log('Creating tables...');

    // Users Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        phone VARCHAR(30) DEFAULT '',
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `users` created');

    // Site Content CMS Table (Fast JSON Store for Next.js CMS Sync)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        section_key VARCHAR(100) PRIMARY KEY,
        content_data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `site_content` created');

    // Leads & Inquiries Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(150) DEFAULT '',
        city VARCHAR(100) DEFAULT '',
        property_type VARCHAR(50) DEFAULT '',
        capacity VARCHAR(50) DEFAULT '',
        bill VARCHAR(50) DEFAULT '',
        status VARCHAR(50) DEFAULT 'New Lead',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `leads` created');

    // Solutions Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS solutions (
        id VARCHAR(50) PRIMARY KEY,
        slug VARCHAR(100) NOT NULL,
        title VARCHAR(150) NOT NULL,
        subtitle VARCHAR(255) DEFAULT '',
        description TEXT,
        image TEXT,
        capacity_range VARCHAR(50) DEFAULT '',
        ideal_for VARCHAR(150) DEFAULT '',
        features JSON,
        specs JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `solutions` created');

    // Products & Hardware Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(50) NOT NULL,
        tagline VARCHAR(255) DEFAULT '',
        description TEXT,
        image TEXT,
        key_features JSON,
        warranty VARCHAR(100) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `products` created');

    // Projects & Gallery Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        category VARCHAR(50) NOT NULL,
        capacity VARCHAR(50) DEFAULT '',
        capacity_kw INT DEFAULT 10,
        location VARCHAR(150) DEFAULT '',
        image TEXT,
        annual_savings VARCHAR(100) DEFAULT '',
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `projects` created');

    // Brand Partners Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        tagline VARCHAR(150) DEFAULT '',
        color VARCHAR(50) DEFAULT '#f97316',
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `partners` created');

    // Trust & Field Photos Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trust_photos (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        tag VARCHAR(100) DEFAULT '',
        image TEXT NOT NULL,
        category VARCHAR(50) DEFAULT 'Installation',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✓ Table `trust_photos` created');

    // 5. Seed Default Admin User
    const [existingAdmin] = await connection.query('SELECT id FROM users WHERE email = ?', ['admin@lianasolar.com']);
    if (Array.isArray(existingAdmin) && existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        `INSERT INTO users (id, name, email, phone, password, role, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['admin-master-001', 'Liana Master Admin', 'admin@lianasolar.com', '+91 91603 42240', hashedPassword, 'admin', 1]
      );
      console.log('✓ Seeded Master Admin: admin@lianasolar.com (password: admin123)');
    }

    // 6. Seed Default Solutions
    const defaultSolutions = [
      {
        id: 'residential',
        slug: 'residential-solar',
        title: 'Residential Rooftop Solar',
        subtitle: 'Cut home electricity bills by up to 90%',
        description: 'Turn your roof into an independent clean energy generator. Custom-designed for villas and duplexes with direct PM Surya Ghar subsidy support.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
        capacity_range: '2 kW to 15 kW',
        ideal_for: 'Villas & Homes',
        features: JSON.stringify(['Direct Govt. Subsidy under PM Surya Ghar', 'Tier-1 Monocrystalline Bifacial Modules', 'Net Metering Approval', '25-Year Warranty']),
        specs: JSON.stringify([{ label: 'Sizing', value: '3 kW - 10 kW' }, { label: 'Payback', value: '3.2 - 3.8 Yrs' }]),
      },
      {
        id: 'commercial',
        slug: 'commercial-solar',
        title: 'Commercial Rooftop Solar',
        subtitle: 'Hedge operating costs & claim 40% depreciation',
        description: 'High-yield rooftop solar solutions for offices, schools, hospitals, and commercial complexes to dramatically lower tariff costs.',
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
        capacity_range: '20 kW to 250 kW',
        ideal_for: 'Offices & Schools',
        features: JSON.stringify(['40% Accelerated Depreciation', 'DG Sync Controller', 'Zero Downtime', 'IoT Cloud Analytics']),
        specs: JSON.stringify([{ label: 'Sizing', value: '25 kW - 200 kW' }, { label: 'Payback', value: '3.0 - 3.5 Yrs' }]),
      },
      {
        id: 'industrial',
        slug: 'industrial-solar',
        title: 'Industrial Solar Plants',
        subtitle: 'Megawatt-scale clean energy for factories & warehouses',
        description: 'Heavy-duty solar installations on metal sheds, engineered for continuous manufacturing loads.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95',
        capacity_range: '100 kW to 2 MW+',
        ideal_for: 'Factories & Sheds',
        features: JSON.stringify(['Non-penetrating Metal Clamps', 'HT/LT Interconnection', 'SCADA Integration']),
        specs: JSON.stringify([{ label: 'Sizing', value: '100 kW - 1.5 MW' }, { label: 'Payback', value: '2.8 - 3.2 Yrs' }]),
      },
      {
        id: 'agricultural',
        slug: 'agricultural-solar',
        title: 'Agricultural Solar Systems',
        subtitle: 'Daylight irrigation with zero fuel expenses',
        description: 'High-efficiency solar water pumps and microgrids under PM KUSUM initiative.',
        image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
        capacity_range: '3 HP to 25 HP Pumps',
        ideal_for: 'Farms & Drip Irrigation',
        features: JSON.stringify(['Solar Submersible Pumps', 'MPPT Frequency Drive', 'Zero Diesel Fuel', 'PM KUSUM Subsidy']),
        specs: JSON.stringify([{ label: 'Sizing', value: '3 HP - 15 HP' }, { label: 'Payback', value: '2.0 - 3.0 Yrs' }]),
      },
    ];

    for (const sol of defaultSolutions) {
      await connection.query(
        `INSERT INTO solutions (id, slug, title, subtitle, description, image, capacity_range, ideal_for, features, specs)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title = VALUES(title), image = VALUES(image), description = VALUES(description)`,
        [sol.id, sol.slug, sol.title, sol.subtitle, sol.description, sol.image, sol.capacity_range, sol.ideal_for, sol.features, sol.specs]
      );
    }
    console.log(`✓ Seeded ${defaultSolutions.length} Solutions in MySQL`);

    // 7. Seed Default Hardware Products
    const defaultProducts = [
      {
        id: 'prod-panels',
        name: 'Solar Panels',
        category: 'panels',
        tagline: 'High-Efficiency Tier-1 Monocrystalline Modules',
        description: 'Advanced N-Type TOPCon and Mono PERC bifacial modules offering greater than 22.5% efficiency.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95',
        key_features: JSON.stringify(['Bifacial power boost', 'Ultra-low temperature coefficient', 'ALMM & BIS certified']),
        warranty: '25-Year Linear Output Guarantee',
      },
      {
        id: 'prod-inverters',
        name: 'Solar Inverters',
        category: 'inverters',
        tagline: 'High-Efficiency String & Hybrid Inverters',
        description: 'Smart grid-tied and hybrid inverters with dual MPPT trackers and up to 98.8% efficiency.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=95',
        key_features: JSON.stringify(['Dual MPPT trackers', 'Integrated DC disconnect', 'IP65 rating', 'Wi-Fi / 4G IoT']),
        warranty: '5 to 10-Year Manufacturer Warranty',
      },
      {
        id: 'prod-batteries',
        name: 'Solar Batteries',
        category: 'batteries',
        tagline: 'Lithium-ion Energy Storage Systems (BESS)',
        description: 'Safe LiFePO4 battery banks for uninterrupted night backup and load management.',
        image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1920&q=95',
        key_features: JSON.stringify(['6,000+ deep cycles', 'Integrated BMS', 'Modular scalability', 'Zero maintenance']),
        warranty: '10-Year Battery Warranty',
      },
    ];

    for (const prod of defaultProducts) {
      await connection.query(
        `INSERT INTO products (id, name, category, tagline, description, image, key_features, warranty)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image)`,
        [prod.id, prod.name, prod.category, prod.tagline, prod.description, prod.image, prod.key_features, prod.warranty]
      );
    }
    console.log(`✓ Seeded ${defaultProducts.length} Hardware Products in MySQL`);

    // 8. Seed Default Gallery Projects
    const defaultProjects = [
      {
        id: 'proj-1',
        title: 'Precision Auto Tech Industrial Rooftop',
        category: 'industrial',
        capacity: '450 kWp',
        capacity_kw: 450,
        location: 'Greater Noida, Uttar Pradesh',
        image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95',
        annual_savings: '6,30,000 kWh/year',
        description: '450 kWp metal shed installation with zero plant shutdown, powering manufacturing lines.',
      },
      {
        id: 'proj-2',
        title: 'The Grand Vista Luxury Residence',
        category: 'residential',
        capacity: '10 kWp',
        capacity_kw: 10,
        location: 'Golf Course Extension, Gurugram',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=95',
        annual_savings: '14,500 kWh/year',
        description: 'Elevated aesthetic solar pergola providing terrace shade while zeroing monthly power bills.',
      },
      {
        id: 'proj-3',
        title: 'Heritage Medicare Hospital',
        category: 'commercial',
        capacity: '125 kWp',
        capacity_kw: 125,
        location: 'Jaipur, Rajasthan',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=95',
        annual_savings: '1,80,000 kWh/year',
        description: 'Commercial grid-tied rooftop system synchronized with existing diesel generators.',
      },
    ];

    for (const proj of defaultProjects) {
      await connection.query(
        `INSERT INTO projects (id, title, category, capacity, capacity_kw, location, image, annual_savings, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title = VALUES(title), image = VALUES(image)`,
        [proj.id, proj.title, proj.category, proj.capacity, proj.capacity_kw, proj.location, proj.image, proj.annual_savings, proj.description]
      );
    }
    console.log(`✓ Seeded ${defaultProjects.length} Gallery Projects in MySQL`);

    // 9. Seed Default Leads
    const defaultLeads = [
      { id: 'LD-101', name: 'Ramesh Sharma', phone: '+91 91603 42240', email: 'ramesh@example.com', city: 'Noida', property_type: 'Residential', capacity: '5 kW', bill: '650 units/mo', status: 'New Lead' },
      { id: 'LD-102', name: 'Pooja Agarwal', phone: '+91 95500 01418', email: 'pooja@agri.com', city: 'Greater Noida', property_type: 'Commercial', capacity: '15 kW', bill: '1,800 units/mo', status: 'Site Survey Scheduled' },
      { id: 'LD-103', name: 'Sunil Verma', phone: '+91 99887 66554', email: 'sunil@gmail.com', city: 'Gurugram', property_type: 'Residential', capacity: '3 kW', bill: '380 units/mo', status: 'Subsidy Form Filled' },
      { id: 'LD-104', name: 'Apex Polymers', phone: '+91 97766 55443', email: 'info@apexpoly.in', city: 'Faridabad', property_type: 'Industrial', capacity: '100 kW', bill: '14,000 units/mo', status: 'Proposal Sent' },
    ];

    for (const lead of defaultLeads) {
      await connection.query(
        `INSERT INTO leads (id, name, phone, email, city, property_type, capacity, bill, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [lead.id, lead.name, lead.phone, lead.email, lead.city, lead.property_type, lead.capacity, lead.bill, lead.status]
      );
    }
    console.log(`✓ Seeded ${defaultLeads.length} Customer Leads in MySQL`);

    // 10. Seed Default Trust Photos
    const defaultTrust = [
      { id: 't-1', title: 'Solar Installed', tag: 'Rooftop EPC', image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1920&q=95' },
      { id: 't-2', title: 'Trust Delivered', tag: 'Quality Inspection', image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1920&q=95' },
      { id: 't-3', title: 'Solar EPC Engineering', tag: 'Tier-1 Hardware', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=95' },
    ];

    for (const item of defaultTrust) {
      await connection.query(
        `INSERT INTO trust_photos (id, title, tag, image)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title = VALUES(title), image = VALUES(image)`,
        [item.id, item.title, item.tag, item.image]
      );
    }
    console.log(`✓ Seeded ${defaultTrust.length} Trust Photos in MySQL`);

    // 11. Sync Site Content JSON store in MySQL
    await connection.query(
      `INSERT INTO site_content (section_key, content_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
      ['solutions', JSON.stringify(defaultSolutions)]
    );
    await connection.query(
      `INSERT INTO site_content (section_key, content_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
      ['products', JSON.stringify(defaultProducts)]
    );
    await connection.query(
      `INSERT INTO site_content (section_key, content_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
      ['projects', JSON.stringify(defaultProjects)]
    );
    await connection.query(
      `INSERT INTO site_content (section_key, content_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
      ['leads', JSON.stringify(defaultLeads)]
    );
    await connection.query(
      `INSERT INTO site_content (section_key, content_data) VALUES (?, ?) ON DUPLICATE KEY UPDATE content_data = VALUES(content_data)`,
      ['trust', JSON.stringify(defaultTrust)]
    );
    console.log('✓ Synchronized `site_content` JSON cache in MySQL');

    console.log('\n=============================================');
    console.log('🎉 ALL TABLES CREATED AND SEEDED IN MYSQL!');
    console.log('=============================================');
    console.log('Visible Tables in Database `lianasolar`:');
    console.log('  1. users');
    console.log('  2. site_content');
    console.log('  3. leads');
    console.log('  4. solutions');
    console.log('  5. products');
    console.log('  6. projects');
    console.log('  7. partners');
    console.log('  8. trust_photos');
    console.log('=============================================\n');
  } catch (error) {
    console.error('MySQL Setup Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

runMigration();
