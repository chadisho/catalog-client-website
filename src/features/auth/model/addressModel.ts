export type AddressModel = {
  id: number;
  title: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  lat: string | null;
  lon: string | null;
  formatedAddress: string | null;
  name: string | null;
  phone: string | null;
  preNumber: string | null;
};

export type AddressCreatePayload = {
  province: number;
  city: number;
  postal_code: string;
  address: string;
  name: string;
  prenumber: string;
  telephone: string;
  longitude?: number;
  latitude?: number;
  formatted_address?: string;
};

export type AddressApiResponse = {
  options?: {
    addresses?: Record<string, unknown>[];
  };
  addresses?: Record<string, unknown>[];
};

export function mapAddressResponse(data: Record<string, unknown>): AddressModel {
  return {
    id: Number(data.id ?? 0),
    title: (data.title as string) ?? null,
    address: (data.address as string) ?? null,
    city: (data.city as string) ?? null,
    province: (data.province as string) ?? null,
    postalCode: (data.postal_code as string) ?? null,
    lat: (data.latitude as string) ?? null,
    lon: (data.longitude as string) ?? null,
    formatedAddress: (data.formatted_address as string) ?? null,
    name: (data.name as string) ?? null,
    phone: (data.telephone as string) ?? null,
    preNumber: (data.prenumber as string) ?? null,
  };
}

export function mapAddressesResponse(response: AddressApiResponse): AddressModel[] {
  const addresses = response.options?.addresses ?? response.addresses ?? [];
  return (addresses as Record<string, unknown>[]).map(mapAddressResponse);
}
