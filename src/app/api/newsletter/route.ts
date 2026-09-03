import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 });
    }

    console.log('[Newsletter subscription]:', email);
    return NextResponse.json({ success: true, message: 'Subscribed to solar newsletter' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
