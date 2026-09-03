import { NextRequest, NextResponse } from 'next/server';
import { query, getMySQLPool, initDatabase } from '@/lib/mysql';
import { countUsers } from '@/lib/user-db';

export async function GET(req: NextRequest) {
  try {
    const startTime = Date.now();
    await initDatabase();
    
    // Execute ping test query
    const pingResult = await query<any[]>('SELECT 1 + 1 AS ping, DATABASE() as db_name, VERSION() as mysql_version');
    const duration = Date.now() - startTime;

    const totalUsers = await countUsers();
    const adminUsers = await countUsers('admin');

    const dbName = pingResult[0]?.db_name || process.env.MYSQL_DATABASE || 'lianasolar';
    const mysqlVersion = pingResult[0]?.mysql_version || 'MySQL 8.x';

    return NextResponse.json({
      success: true,
      databaseType: 'MySQL',
      status: 'MySQL Database Connected Successfully',
      database: dbName,
      version: mysqlVersion,
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: process.env.MYSQL_PORT || 3306,
      readyState: 'Connected',
      responseTimeMs: duration,
      stats: {
        totalUsers,
        adminUsers,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        databaseType: 'MySQL',
        status: 'MySQL Connection Error',
        message: error.message || 'Could not connect to MySQL server.',
        tip: 'Please check your MySQL credentials in .env (MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE) and ensure MySQL service (XAMPP / WAMP / MySQL Workbench / Docker) is running.',
      },
      { status: 500 }
    );
  }
}
