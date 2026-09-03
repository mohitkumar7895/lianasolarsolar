import { query } from './mysql';
import { randomUUID } from 'crypto';

export interface DBUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: 'admin' | 'customer';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Find user by email using raw MySQL query
 */
export async function findUserByEmail(email: string): Promise<DBUser | null> {
  const sql = `
    SELECT 
      id, 
      name, 
      email, 
      phone, 
      password, 
      role, 
      is_active AS isActive, 
      created_at AS createdAt, 
      updated_at AS updatedAt 
    FROM users 
    WHERE email = ? 
    LIMIT 1
  `;
  const rows = await query<any[]>(sql, [email.trim().toLowerCase()]);
  if (!rows || rows.length === 0) {
    return null;
  }
  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    password: row.password,
    role: row.role as 'admin' | 'customer',
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Find user by ID using raw MySQL query
 */
export async function findUserById(id: string): Promise<DBUser | null> {
  const sql = `
    SELECT 
      id, 
      name, 
      email, 
      phone, 
      role, 
      is_active AS isActive, 
      created_at AS createdAt, 
      updated_at AS updatedAt 
    FROM users 
    WHERE id = ? 
    LIMIT 1
  `;
  const rows = await query<any[]>(sql, [id]);
  if (!rows || rows.length === 0) {
    return null;
  }
  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    role: row.role as 'admin' | 'customer',
    isActive: Boolean(row.isActive),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Create a new user with raw MySQL INSERT query
 */
export async function createUser(data: {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: 'admin' | 'customer';
}): Promise<DBUser> {
  const id = randomUUID();
  const normalizedEmail = data.email.trim().toLowerCase();
  const phone = data.phone ? data.phone.trim() : '';

  const sql = `
    INSERT INTO users (id, name, email, phone, password, role, is_active)
    VALUES (?, ?, ?, ?, ?, ?, TRUE)
  `;

  await query(sql, [id, data.name.trim(), normalizedEmail, phone, data.passwordHash, data.role]);

  return {
    id,
    name: data.name.trim(),
    email: normalizedEmail,
    phone,
    role: data.role,
    isActive: true,
  };
}

/**
 * Get total users count from MySQL
 */
export async function countUsers(role?: string): Promise<number> {
  try {
    if (role) {
      const sql = 'SELECT COUNT(*) AS total FROM users WHERE role = ?';
      const rows = await query<any[]>(sql, [role]);
      return rows[0]?.total || 0;
    }
    const sql = 'SELECT COUNT(*) AS total FROM users';
    const rows = await query<any[]>(sql, []);
    return rows[0]?.total || 0;
  } catch {
    return 0;
  }
}
