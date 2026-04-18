export type UserProfileApi = {
  first_name?: string;
    last_name?: string;
    father_name?: string;
    national_code?: string;
    birth_certificate_number?: string;
    birthdate?: string;
    email?: string;
    cellphone?: string;
    gender?: number | string;
    [key: string]: unknown;
};

export type CompanyProfileApi = {
  name?: string;
  [key: string]: unknown;
};

export type ProfileApiResponse = {
  options?: {
    user?: UserProfileApi;
    company?: CompanyProfileApi;
  };
  user?: UserProfileApi;
  company?: CompanyProfileApi;
};

export type ProfileModel = {
  firstName: string;
  lastName: string;
  cellphone: string;
  gender: number | null;
};

export type ProfileUpdatePayload = {
  user: UserProfileApi;
  company?: CompanyProfileApi;
};

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function toSafeNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : null;
  }

  return null;
}

function getProfileSource(response: ProfileApiResponse): {
  user: UserProfileApi;
  company?: CompanyProfileApi;
} {
  const sourceUser = response.options?.user ?? response.user ?? {};
  const sourceCompany = response.options?.company ?? response.company;

  return {
    user: { ...sourceUser },
    company: sourceCompany ? { ...sourceCompany } : undefined,
  };
}

export function mapProfileResponse(response: ProfileApiResponse): ProfileModel {
  const source = getProfileSource(response);

  return {
    firstName: toSafeString(source.user.first_name),
    lastName: toSafeString(source.user.last_name),
    cellphone: toSafeString(source.user.cellphone),
    gender: toSafeNumber(source.user.gender),
  };
}

export function mapProfileToUpdatePayload(response: ProfileApiResponse): ProfileUpdatePayload {
    const payload = getProfileSource(response);
      console.log("PAYLOAD");
    console.log(payload);
    return payload;

}
