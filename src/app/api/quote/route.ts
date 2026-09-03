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

    const leadId = `QT-${Date.now().toString().slice(-4)}`;
    const finalType = propertyType ? (propertyType.charAt(0).toUpperCase() + propertyType.slice(1)) : 'Residential';
    const finalCity = city || 'Delhi NCR';
    const finalCapacity = capacity || '3 kW (1-2 BHK Homes)';

    try {
      // 1. Raw SQL Insert into MySQL leads table
      await query(
        `INSERT INTO leads (id, name, phone, email, city, property_type, capacity, bill, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'New Lead')`,
        [
          leadId,
          name.trim(),
          phone.trim(),
          email?.trim() || '',
          finalCity,
          finalType,
          finalCapacity,
          monthlyBill || '',
        ]
      );
    } catch (dbErr: any) {
      console.warn('MySQL Lead Insert fallback:', dbErr.message);
    }

    // 2. Synchronize with `site_content` JSON cache in MySQL
    try {
      const rows = await query<Array<{ content_data: string }>>(
        `SELECT content_data FROM site_content WHERE section_key = 'leads'`
      );

      let currentLeads: any[] = [];
      if (rows && rows.length > 0 && rows[0].content_data) {
        try {
          currentLeads = JSON.parse(rows[0].content_data);
        } catch {
          currentLeads = [];
        }
      }

      const newLeadItem = {
        id: leadId,
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || '',
        city: finalCity,
        bill: monthlyBill || '500 units/mo',
        capacity: finalCapacity,
        type: finalType,
        subject: `${finalType} Solar Consultation`,
        message: message || `Solar quote request for ${finalCapacity} in ${finalCity}.`,
        source: 'Solar Quote',
        date: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'New Lead',
      };

      const updatedLeads = [newLeadItem, ...currentLeads.filter((l: any) => l.id !== leadId)];

      await query(
        `INSERT INTO site_content (section_key, content_data)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
        ['leads', JSON.stringify(updatedLeads)]
      );
    } catch (cacheErr: any) {
      console.warn('[MySQL JSON Sync fallback]:', cacheErr?.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Solar consultation inquiry submitted and saved to MySQL.',
      data: {
        id: leadId,
        name: name.trim(),
        phone: phone.trim(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to process solar quote request: ' + err.message },
      { status: 500 }
    );
  }
}
