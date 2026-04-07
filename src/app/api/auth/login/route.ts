import { NextResponse } from 'next/server';
import { normalizeIranianCellphone } from '../../../../features/auth/model/phone';
import { parseAuthResponse, requestAuthEndpoint } from '../_lib';

type LoginApiSuccess = {
  options?: {
    loginToken?: string;
    isNewUser?: boolean;
  };
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { cellphone?: string } | null;
//  const normalizedCellphone = normalizeIranianCellphone(body?.cellphone ?? '');
    const normalizedCellphone = body?.cellphone;

  if (!normalizedCellphone) {
    return NextResponse.json({ message: 'invalid_cellphone' }, { status: 422 });
  }

  const params = new URLSearchParams({ cellphone: normalizedCellphone });
  const upstreamResponse = await requestAuthEndpoint('app/auth/login', params);
  const parsed = await parseAuthResponse(upstreamResponse);

  if (parsed instanceof NextResponse) {
    return parsed;
  }

  const payload = parsed as LoginApiSuccess;

  return NextResponse.json({
    loginToken: payload?.options?.loginToken ?? '',
    isNewUser: Boolean(payload?.options?.isNewUser),
  });
}
