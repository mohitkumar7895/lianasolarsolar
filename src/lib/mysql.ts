import mysql from 'mysql2/promise';

interface MySQLCache {
  pool: mysql.Pool | null;
  initialized: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var mysqlCache: MySQLCache | undefined;
}

const cached: MySQLCache = global.mysqlCache || { pool: null, initialized: false };

if (!global.mysqlCache) {
  global.mysqlCache = cached;
}

/**
 * Get or create MySQL Connection Pool
 */
export function getMySQLPool(): mysql.Pool {
  if (cached.pool) {
    return cached.pool;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    cached.pool = mysql.createPool({
      uri: databaseUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  } else {
    cached.pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'lianasolar',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  return cached.pool;
}

/**
 * Auto-initialize database tables in MySQL (Raw SQL)
 */
export async function initDatabase(): Promise<void> {
  if (cached.initialized) return;

  const pool = getMySQLPool();

  try {
    // 1. Users table (Admin & Customer Authentication)
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(191) NOT NULL UNIQUE,
        phone VARCHAR(30) DEFAULT '',
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.query(createUsersTableQuery);

    // 2. Site Content CMS Storage Table (Stores solutions, products, projects, trust photos, config in MySQL)
    const createContentTableQuery = `
      CREATE TABLE IF NOT EXISTS site_content (
        section_key VARCHAR(100) PRIMARY KEY,
        content_data LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await pool.query(createContentTableQuery);

    // 3. Leads Database Table (Raw SQL Solar Inquiries)
    const createLeadsTableQuery = `
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
    `;
    await pool.query(createLeadsTableQuery);

    cached.initialized = true;
  } catch (err: any) {
    console.warn('MySQL Table Init Warning:', err.message);
  }
}

/**
 * Helper to run parameterized SQL queries
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const pool = getMySQLPool();
  await initDatabase();
  const [results] = await pool.execute(sql, params);
  return results as T;
}

export default query;
