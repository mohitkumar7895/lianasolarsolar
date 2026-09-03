import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { findUserById } from '@/lib/user-db';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, user: null, message: 'Not authenticated' },
        { status: 200 }
      );
    }

    const payload = verifyJwtToken(token);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { success: false, user: null, message: 'Invalid or expired session token' },
        { status: 200 }
      );
    }

    // Connect to MySQL and fetch fresh user record
    try {
      const user = await findUserById(payload.userId);
      if (!user || !user.isActive) {
        return NextResponse.json(
          { success: false, user: null, message: 'User not found or deactivated in database' },
          { status: 200 }
        );
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (dbError) {
      // Fallback to token payload if MySQL connection is busy
      return NextResponse.json({
        success: true,
        user: {
          id: payload.userId,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, user: null, message: error.message },
      { status: 500 }
    );
  }
}
