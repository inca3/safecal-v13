import { NextResponse } from 'next/server';

export async function GET() {
  const waterOptions = [];
  for (let i = 50; i <= 500; i += 50) {
    waterOptions.push({ label: `${i}ml (${i / 250} glass)`, value: i });
  }

  return NextResponse.json({ waterOptions });
}
