import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

/**
 * GET /api/content
 * Fetches all CMS configuration, solutions, products, projects, trust photos, and partners from MySQL
 */
export async function GET() {
  try {
    const rows = await query<Array<{ section_key: string; content_data: string }>>(
      'SELECT section_key, content_data FROM site_content'
    );

    const data: Record<string, any> = {};
    for (const row of rows) {
      try {
        data[row.section_key] = JSON.parse(row.content_data);
      } catch {
        data[row.section_key] = row.content_data;
      }
    }

    return NextResponse.json({
      success: true,
      source: 'mysql',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        source: 'fallback',
        message: 'Could not fetch from MySQL: ' + error.message,
        data: {},
      },
      { status: 200 }
    );
  }
}

/**
 * POST /api/content
 * Saves or updates a CMS section in MySQL using Raw SQL
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section_key, content_data } = body;

    if (!section_key) {
      return NextResponse.json(
        { success: false, error: 'Missing section_key' },
        { status: 400 }
      );
    }

    const payloadString =
      typeof content_data === 'string'
        ? content_data
        : JSON.stringify(content_data);

    // Raw SQL UPSERT
    await query(
      `INSERT INTO site_content (section_key, content_data) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE content_data = VALUES(content_data), updated_at = CURRENT_TIMESTAMP`,
      [section_key, payloadString]
    );

    return NextResponse.json({
      success: true,
      message: `Section "${section_key}" saved to MySQL successfully.`,
    });
  } catch (error: any) {
    console.error('MySQL Content Save Error:', error);
    return NextResponse.json(
      { success: false, error: 'MySQL Save Failed: ' + error.message },
      { status: 500 }
    );
  }
}
