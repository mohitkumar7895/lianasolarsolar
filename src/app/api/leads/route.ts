import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

/**
 * GET /api/leads
 * Returns all leads and call queries from MySQL
 */
export async function GET() {
  try {
    // 1. Try fetching from site_content JSON store first
    const rows = await query<Array<{ content_data: string }>>(
      `SELECT content_data FROM site_content WHERE section_key = 'leads'`
    );

    if (rows && rows.length > 0 && rows[0].content_data) {
      try {
        const leads = JSON.parse(rows[0].content_data);
        return NextResponse.json({ success: true, source: 'mysql_json', data: leads });
      } catch {}
    }

    // 2. Fallback to direct raw table
    const tableRows = await query<Array<any>>(
      `SELECT id, name, phone, email, city, property_type as type, capacity, bill, status, created_at FROM leads ORDER BY created_at DESC`
    );

    const formatted = (tableRows || []).map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email || '',
      city: row.city || 'Delhi NCR',
      capacity: row.capacity || '5 kW',
      type: row.type || 'Call Query',
      bill: row.bill || '',
      subject: row.type || 'Customer Query',
      message: row.bill || '',
      source: row.type?.includes('Call') ? 'Call Query' : row.type?.includes('Contact') ? 'Contact Form' : 'Solar Quote',
      date: row.created_at ? new Date(row.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'Recent',
      status: row.status || 'New Call Query',
    }));

    return NextResponse.json({ success: true, source: 'mysql_table', data: formatted });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, data: [] }, { status: 500 });
  }
}

/**
 * POST /api/leads
 * Adds a new lead or call query
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, city, capacity, type, subject, message, source, status } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Name and Phone required' }, { status: 400 });
    }

    const isCall = source === 'Call Query' || type === 'Call Query';
    const prefix = isCall ? 'CQ' : source === 'Contact Form' ? 'CONT' : 'QT';
    const id = body.id || `${prefix}-${Date.now().toString().slice(-4)}`;
    const finalStatus = status || (isCall ? 'New Call Query' : 'New Lead');
    const finalSource = source || (isCall ? 'Call Query' : 'Solar Quote');

    // 1. Raw SQL table insert
    try {
      await query(
        `INSERT INTO leads (id, name, phone, email, city, property_type, capacity, bill, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), phone=VALUES(phone), status=VALUES(status)`,
        [
          id,
          name.trim(),
          phone.trim(),
          email?.trim() || '',
          city || 'Delhi NCR',
          finalSource,
          capacity || '5 kW',
          message || subject || '',
          finalStatus,
        ]
      );
    } catch (e: any) {
      console.warn('Direct leads table insert warning:', e.message);
    }

    // 2. Sync to site_content JSON cache
    try {
      const rows = await query<Array<{ content_data: string }>>(
        `SELECT content_data FROM site_content WHERE section_key = 'leads'`
      );
      let current: any[] = [];
      if (rows && rows.length > 0 && rows[0].content_data) {
        try {
          current = JSON.parse(rows[0].content_data);
        } catch {}
      }

      const item = {
        id,
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || '',
        city: city || 'Delhi NCR',
        capacity: capacity || '5 kW',
        type: type || finalSource,
        subject: subject || `${finalSource} Request`,
        message: message || `Inquiry received for ${capacity || 'solar installation'}.`,
        source: finalSource,
        date: 'Today, ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: finalStatus,
      };

      const updated = [item, ...current.filter((l: any) => l.id !== id)];

      await query(
        `INSERT INTO site_content (section_key, content_data) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
        ['leads', JSON.stringify(updated)]
      );
    } catch (e: any) {
      console.warn('site_content leads sync warning:', e.message);
    }

    return NextResponse.json({ success: true, message: 'Saved successfully', id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/leads
 * Updates status or info of a lead / query
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, name, phone, email, city, capacity, type, message } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    // 1. Update in raw MySQL table
    try {
      if (status) {
        await query(`UPDATE leads SET status = ? WHERE id = ?`, [status, id]);
      }
    } catch (e: any) {
      console.warn('MySQL Lead status update warning:', e.message);
    }

    // 2. Update in site_content JSON
    try {
      const rows = await query<Array<{ content_data: string }>>(
        `SELECT content_data FROM site_content WHERE section_key = 'leads'`
      );
      if (rows && rows.length > 0 && rows[0].content_data) {
        let current = JSON.parse(rows[0].content_data);
        current = current.map((item: any) => {
          if (item.id === id) {
            return {
              ...item,
              ...(status ? { status } : {}),
              ...(name ? { name } : {}),
              ...(phone ? { phone } : {}),
              ...(email !== undefined ? { email } : {}),
              ...(city ? { city } : {}),
              ...(capacity ? { capacity } : {}),
              ...(type ? { type } : {}),
              ...(message ? { message } : {}),
            };
          }
          return item;
        });

        await query(
          `INSERT INTO site_content (section_key, content_data) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
          ['leads', JSON.stringify(current)]
        );
      }
    } catch (e: any) {
      console.warn('site_content JSON update warning:', e.message);
    }

    return NextResponse.json({ success: true, message: `Lead ${id} updated` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * DELETE /api/leads
 * Deletes a lead / call query
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    // 1. Delete from MySQL raw table
    try {
      await query(`DELETE FROM leads WHERE id = ?`, [id]);
    } catch (e: any) {
      console.warn('MySQL Lead delete warning:', e.message);
    }

    // 2. Delete from site_content JSON
    try {
      const rows = await query<Array<{ content_data: string }>>(
        `SELECT content_data FROM site_content WHERE section_key = 'leads'`
      );
      if (rows && rows.length > 0 && rows[0].content_data) {
        let current = JSON.parse(rows[0].content_data);
        current = current.filter((item: any) => item.id !== id);

        await query(
          `INSERT INTO site_content (section_key, content_data) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
          ['leads', JSON.stringify(current)]
        );
      }
    } catch (e: any) {
      console.warn('site_content JSON delete sync warning:', e.message);
    }

    return NextResponse.json({ success: true, message: `Lead ${id} deleted` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
