import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone number are required.' },
        { status: 400 }
      );
    }

    // In a production environment, store in DB or dispatch to CRM / WhatsApp Webhook / Resend Email
    console.log('[Contact Inquiry Received]:', { name, phone, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Our solar engineer will call you shortly.',
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}
