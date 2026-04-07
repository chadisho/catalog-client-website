import { apiClient } from '../../../core/api';
import { mapProfileResponse, type ProfileApiResponse, type ProfileModel } from '../model/profileModel';

export async function getProfile(): Promise<ProfileModel> {
  const response = (await apiClient('app/users/profile', {
    method: 'GET',
  })) as ProfileApiResponse;

  return mapProfileResponse(response);
}
