import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'liana_solar_super_secure_jwt_secret_key_2025_987654321';
const COOKIE_NAME = 'auth_token';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password with hashed password
 */
export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/**
 * Generate a signed JWT token
 */
export function signJwtToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
