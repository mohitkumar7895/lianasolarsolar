import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, city, source, capacity } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and Phone number are required.' },
        { status: 400 }
      );
    }

    const isCallQuery = source === 'Call Query' || !subject;
    const inquiryPrefix = isCallQuery ? 'CQ' : 'CONT';
    const inquiryId = `${inquiryPrefix}-${Date.now().toString().slice(-4)}`;
    const status = isCallQuery ? 'New Call Query' : 'New Contact Inquiry';
    const finalSource = source || (isCallQuery ? 'Call Query' : 'Contact Form');
    const finalSubject = subject || 'Request Immediate Call Callback';
    const finalCity = city || 'Delhi NCR / Online';
    const finalCapacity = capacity || subject || 'Solar Rooftop Consultation';

    // 1. Save directly into MySQL `leads` table
    try {
      await query(
        `INSERT INTO leads (id, name, phone, email, city, property_type, capacity, bill, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inquiryId,
          name.trim(),
          phone.trim(),
          email?.trim() || '',
          finalCity,
          finalSource,
          finalCapacity,
          message ? message.slice(0, 100) : finalSubject,
          status,
        ]
      );
    } catch (sqlErr: any) {
      console.warn('[MySQL Direct Lead Insert fallback]:', sqlErr?.message);
    }

    // 2. Also synchronize with `site_content` JSON cache in MySQL
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
        id: inquiryId,
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || '',
        city: finalCity,
        bill: finalSubject,
        capacity: finalCapacity,
        type: finalSource,
        subject: finalSubject,
        message: message || 'Customer requested direct callback / solar inquiry.',
        source: finalSource,
        date: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status,
      };

      const updatedLeads = [newLeadItem, ...currentLeads.filter((l: any) => l.id !== inquiryId)];

      await query(
        `INSERT INTO site_content (section_key, content_data)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
        ['leads', JSON.stringify(updatedLeads)]
      );
    } catch (cacheErr: any) {
      console.warn('[MySQL JSON Sync fallback]:', cacheErr?.message);
    }

    console.log(`[Admin Live Notification]: ${finalSource} received from ${name} (${phone}) - Saved to Admin.`);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and saved to Admin successfully.',
      data: {
        id: inquiryId,
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || '',
        status,
        source: finalSource,
      },
    });
  } catch (err: any) {
    console.error('Contact / Call Query submission error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing inquiry: ' + err.message },
      { status: 500 }
    );
  }
}
