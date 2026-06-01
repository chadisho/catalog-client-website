import { apiClient } from '../../../core/api';
import {
  mapProfileResponse,
  mapProfileToUpdatePayload,
  type ProfileApiResponse,
  type ProfileModel,
  type ProfileUpdatePayload,
} from '../model/profileModel';

export async function getProfile(): Promise<ProfileModel> {
  const response = (await apiClient('app/users/profile', {
    method: 'GET',
  })) as ProfileApiResponse;

  return mapProfileResponse(response);
}

export async function getProfileUpdatePayload(): Promise<ProfileUpdatePayload> {
  const response = (await apiClient('app/users/profile', {
    method: 'GET',
  })) as ProfileApiResponse;
  return mapProfileToUpdatePayload(response);
}

export async function updateProfile(payload: ProfileUpdatePayload): Promise<void> {
  await apiClient('app/users/profile', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
