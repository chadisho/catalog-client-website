import { NextResponse } from 'next/server';
import { parseAuthResponse, requestAuthEndpoint } from '../_lib';

type ResendOtpApiSuccess = {
  options?: {
    loginToken?: string;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { loginToken?: string } | null;
  const loginToken = (body?.loginToken ?? '').trim();

  if (!loginToken) {
    return NextResponse.json({ message: 'missing_login_token' }, { status: 422 });
  }

  const params = new URLSearchParams({ loginToken });
  const upstreamResponse = await requestAuthEndpoint('auth/resend-otp', params);
  const parsed = await parseAuthResponse(upstreamResponse);

  if (parsed instanceof NextResponse) {
    return parsed;
  }

  const payload = parsed as ResendOtpApiSuccess;

  return NextResponse.json({
    loginToken: payload?.options?.loginToken ?? loginToken,
  });
}
