import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, createUser } from '@/lib/user-db';
import { hashPassword, signJwtToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password, role = 'customer', adminKey } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields (name, email, password).' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // If registering as Admin, verify security key
    if (role === 'admin') {
      const serverAdminKey = process.env.ADMIN_REGISTRATION_KEY || 'LIANA_ADMIN_2025';
      if (!adminKey || adminKey.trim() !== serverAdminKey.trim()) {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid Admin Registration Passkey. Contact system administrator for authorization.',
          },
          { status: 403 }
        );
      }
    }

    // Check if user already exists with MySQL SELECT query
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await hashPassword(password);

    // Insert user into MySQL table
    const newUser = await createUser({
      name: name.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      passwordHash: hashedPassword,
      role: role === 'admin' ? 'admin' : 'customer',
    });

    // Generate JWT session token
    const token = signJwtToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    };

    const response = NextResponse.json(
      {
        success: true,
        message: `${newUser.role === 'admin' ? 'Admin' : 'Customer'} account created successfully in MySQL database!`,
        user: userResponse,
      },
      { status: 201 }
    );

    // Set HttpOnly session cookie
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('MySQL Registration Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'MySQL database error during registration.',
      },
      { status: 500 }
    );
  }
}
