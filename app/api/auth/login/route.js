import { NextResponse } from 'next/server';

export async function POST(request) {
  const { code } = await request.json();
  const accessCode = process.env.SITE_ACCESS_CODE;

  if (!accessCode || code !== accessCode) {
    return NextResponse.json({ error: 'Code incorrect' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('themis-auth', accessCode, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 jours
  });
  return response;
}
