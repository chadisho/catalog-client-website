export type UserProfileApi = {
  firstName?: string;
  lastName?: string;
  cellphone?: string;
};

export type CompanyProfileApi = {
  name?: string;
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
  companyName: string;
};

function toSafeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function mapProfileResponse(response: ProfileApiResponse): ProfileModel {
  const sourceUser = response.options?.user ?? response.user;
  const sourceCompany = response.options?.company ?? response.company;

  return {
    firstName: toSafeString(sourceUser?.firstName),
    lastName: toSafeString(sourceUser?.lastName),
    cellphone: toSafeString(sourceUser?.cellphone),
    companyName: toSafeString(sourceCompany?.name),
  };
}
