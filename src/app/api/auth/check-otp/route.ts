import { NextResponse } from 'next/server';
import { parseAuthResponse, requestAuthEndpoint, setAuthCookie } from '../_lib';

type CheckOtpApiSuccess = {
  options?: {
    token?: string;
    userRole?: string;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    otp?: string;
    loginToken?: string;
  } | null;

  const otp = (body?.otp ?? '').trim();
  const loginToken = (body?.loginToken ?? '').trim();

  if (!otp || !loginToken) {
    return NextResponse.json({ message: 'invalid_otp_payload' }, { status: 422 });
  }

  const params = new URLSearchParams({ otp, loginToken });
  const upstreamResponse = await requestAuthEndpoint('app/auth/check-otp', params);
  const parsed = await parseAuthResponse(upstreamResponse);

  if (parsed instanceof NextResponse) {
    return parsed;
  }

  const payload = parsed as CheckOtpApiSuccess;
  const token = payload?.options?.token;

  if (!token) {
    return NextResponse.json({ message: 'missing_auth_token' }, { status: 500 });
  }

  await setAuthCookie(token);

  return NextResponse.json({
    userRole: payload?.options?.userRole ?? null,
  });
}
