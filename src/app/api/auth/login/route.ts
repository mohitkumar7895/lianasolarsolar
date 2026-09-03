import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/user-db';
import { comparePassword, signJwtToken, AUTH_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user from MySQL database
    const user = await findUserByEmail(normalizedEmail);
    if (!user || !user.password) {
      return NextResponse.json(
        { success: false, message: 'No account found with this email address.' },
        { status: 401 }
      );
    }

    // Verify hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please try again.' },
        { status: 401 }
      );
    }

    // Verify account active status
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Your account is deactivated. Contact admin.' },
        { status: 403 }
      );
    }

    // Role check
    if (role && role === 'admin' && user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          message: 'Access denied: This account does not have Administrative privileges.',
        },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };

    const response = NextResponse.json(
      {
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: userResponse,
      },
      { status: 200 }
    );

    // Set HttpOnly cookie
    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('MySQL Login Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'MySQL database error occurred during login.',
      },
      { status: 500 }
    );
  }
}
