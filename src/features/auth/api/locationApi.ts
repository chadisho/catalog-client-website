import { apiClient } from '../../../core/api';

export type ProvinceModel = { id: number; title: string };
export type CityModel = { id: number; title: string };

export type LocationApiResponse = {
    options?: {
        provinces?: Record<string, unknown>[];
        cities?: Record<string, unknown>[];
    }
};

function mapLocationItems(response: LocationApiResponse): ProvinceModel[] | CityModel[] {
  const items = response.options?.provinces ?? response.options?.cities ?? [];
  return (items as Record<string, unknown>[]).map((item) => ({
    id: Number(item.id ?? 0),
    title: String(item.title ?? item.name ?? ''),
  }));
}

export async function getProvinces(): Promise<ProvinceModel[]> {
  const response = (await apiClient('app/addresses/province-city', {
    method: 'GET',
  })) as LocationApiResponse;
  return mapLocationItems(response) as ProvinceModel[];
}

export async function getCities(provinceId: number): Promise<CityModel[]> {
  const response = (await apiClient('app/addresses/province-city', {
    method: 'POST',
    body: JSON.stringify({ province_id: provinceId }),
  })) as LocationApiResponse;

  return mapLocationItems(response) as CityModel[];
}
