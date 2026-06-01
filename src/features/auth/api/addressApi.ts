import { apiClient } from '../../../core/api';
import {
  mapAddressesResponse,
  type AddressApiResponse,
  type AddressCreatePayload,
  type AddressModel,
} from '../model/addressModel';

export async function getAddresses(): Promise<AddressModel[]> {
  const response = (await apiClient('app/addresses/index', {
    method: 'GET',
  })) as AddressApiResponse;
  return mapAddressesResponse(response);
}

export async function createAddress(payload: AddressCreatePayload): Promise<void> {
  await apiClient('app/addresses/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteAddress(id: number): Promise<void> {
  await apiClient(`app/addresses/destroy/${id}`, {
    method: 'GET',
  });
}
