import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

let users: User[] = [];

function randomHex(length: number): string {
  let result = '';
  const charset = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

function randomChars(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, email, password, name, phone } = body;

  if (action === 'login') {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouve' },
        { status: 401 }
      );
    }
    return NextResponse.json({
      success: true,
      data: {
        user,
        token: randomHex(32),
      },
    });
  }

  if (action === 'signup') {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'Email deja utilise' },
        { status: 400 }
      );
    }

    const user: User = {
      id: 'usr-' + randomChars(6, '0123456789'),
      email,
      name: name || '',
      phone,
    };

    users.push(user);

    return NextResponse.json({
      success: true,
      data: {
        user,
        token: randomHex(32),
      },
    });
  }

  return NextResponse.json(
    { success: false, error: 'Action non reconnue' },
    { status: 400 }
  );
}
