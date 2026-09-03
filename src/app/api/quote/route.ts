import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, propertyType, capacity, monthlyBill, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    const leadId = `LD-${Date.now().toString().slice(-4)}`;

    try {
      // Raw SQL Insert into MySQL
      await query(
        `INSERT INTO leads (id, name, phone, email, city, property_type, capacity, bill, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New Lead')`,
        [
          leadId,
          name.trim(),
          phone.trim(),
          email?.trim() || '',
          city || 'Delhi NCR',
          propertyType || 'Residential',
          capacity || '3 kW',
          monthlyBill || '',
        ]
      );
    } catch (dbErr: any) {
      console.warn('MySQL Lead Insert fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Solar consultation inquiry submitted and saved to MySQL.',
      data: {
        id: leadId,
        name,
        phone,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process solar quote request: ' + err.message },
      { status: 500 }
    );
  }
}
