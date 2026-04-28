export type AuthSessionModel = {
  isAuthenticated: boolean;
};

export type LoginOtpRequestModel = {
  loginToken: string;
  isNewUser: boolean;
};

type MessageResponse = {
  message?: string;
  errors?: unknown;
};

function extractValidationErrorsMessage(errors: unknown): string | null {
  if (!Array.isArray(errors)) {
    return null;
  }

  const messages = errors
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return messages.length > 0 ? messages.join(' | ') : null;
}

async function parseMessage(response: Response): Promise<string> {
  const payload = (await response.json().catch(() => null)) as MessageResponse | null;
    let message = payload?.message ?? `HTTP ${response.status}`;

  const validationMessage = extractValidationErrorsMessage(payload?.errors);
  if (validationMessage) {
    message = validationMessage;
  }

  return message;
}

export async function requestLogin(cellphone: string): Promise<LoginOtpRequestModel> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cellphone }),
  });

  if (!response.ok) {
    throw new Error(await parseMessage(response));
  }

  return (await response.json()) as LoginOtpRequestModel;
}

export async function verifyOtp(otp: string, loginToken: string): Promise<void> {
  const response = await fetch('/api/auth/check-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ otp, loginToken }),
  });

  if (!response.ok) {
    throw new Error(await parseMessage(response));
  }
}

export async function resendOtp(loginToken: string): Promise<string> {
  const response = await fetch('/api/auth/resend-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loginToken }),
  });

  if (!response.ok) {
    throw new Error(await parseMessage(response));
  }

  const payload = (await response.json()) as { loginToken?: string };
  return payload.loginToken ?? loginToken;
}

export async function logout(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(await parseMessage(response));
  }
}

export async function getAuthSession(): Promise<AuthSessionModel> {
  const response = await fetch('/api/auth/session', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(await parseMessage(response));
  }

  return (await response.json()) as AuthSessionModel;
}
