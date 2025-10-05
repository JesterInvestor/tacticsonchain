import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tacticsonchain.vercel.app';
  
  const frameMetadata = {
    version: 'next',
    imageUrl: `${baseUrl}/og-image.png`,
    button: {
      title: 'Play Tactics',
      action: {
        type: 'launch_frame',
        name: 'Tactics on Chain',
        url: `${baseUrl}/game`,
        splashImageUrl: `${baseUrl}/splash.png`,
        splashBackgroundColor: '#1a1a1a',
      },
    },
  };

  return NextResponse.json(frameMetadata);
}

export async function POST(req: NextRequest) {
  // Handle Farcaster Frame actions
  const body = await req.json();
  
  // Process frame interactions here
  console.log('Frame action:', body);
  
  return NextResponse.json({ success: true });
}
