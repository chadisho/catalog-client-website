"use client";

import { useEffect, useState, useTransition } from 'react';
import { ChevronUp } from 'lucide-react';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { createAddress } from '../api/addressApi';
import type { AddressCreatePayload } from '../model/addressModel';
import { getProvinces, getCities, type ProvinceModel, type CityModel } from '../api/locationApi';
import type { CatalogTranslations } from '../../../core/i18n/catalogLocale';

type AddressCreateFormProps = {
  t: CatalogTranslations;
  onCreated: () => void;
  onCancel: () => void;
};

export default function AddressCreateForm({ t, onCreated, onCancel }: AddressCreateFormProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isSubmitting, startTransition] = useTransition();

  const [provinceId, setProvinceId] = useState<number | ''>('');
  const [cityId, setCityId] = useState<number | ''>('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        toastError(t.addressCreateToastError);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, [t]);

  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      setCityId('');
      return;
    }

    const loadCities = async () => {
      try {
        setIsLoadingCities(true);
        const data = await getCities(Number(provinceId));
        setCities(data);
      } catch (error) {
        toastError(t.addressCreateToastError);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadCities();
  }, [provinceId, t]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !address.trim() || !postalCode.trim() || !phone.trim() || !provinceId || !cityId) {
      toastError('Please fill all required fields');
      return;
    }

    startTransition(async () => {
      try {
        const payload: AddressCreatePayload = {
          province: Number(provinceId),
          city: Number(cityId),
          postal_code: postalCode,
          address,
          name: title,
          prenumber: '',
          telephone: phone,
        };

        await createAddress(payload);
        toastSuccess(t.addressCreateToastSuccess);
        onCreated();
      } catch (error) {
        const message = error instanceof Error && error.message.trim().length > 0
          ? error.message
          : t.addressCreateToastError;
        toastError(message);
      }
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-sm font-semibold text-text"
      >
        <span>{t.addressAddNew}</span>
        <ChevronUp
          size={18}
          strokeWidth={2}
          className={`transition-transform ${!isExpanded ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {isExpanded ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="address-title" className="block text-xs font-medium text-text/70 mb-2">
              {t.addressTitle}
            </label>
            <input
              id="address-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.addressTitle}
              className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition placeholder:text-text/50 focus:ring-2"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="address-province" className="block text-xs font-medium text-text/70 mb-2">
                {t.addressProvince}
              </label>
              <select
                id="address-province"
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value ? Number(e.target.value) : '')}
                className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition focus:ring-2 disabled:opacity-60"
                disabled={isLoadingProvinces}
                required
              >
                <option value="">{isLoadingProvinces ? 'Loading...' : t.addressProvince}</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="address-city" className="block text-xs font-medium text-text/70 mb-2">
                {t.addressCity}
              </label>
              <select
                id="address-city"
                value={cityId}
                onChange={(e) => setCityId(e.target.value ? Number(e.target.value) : '')}
                className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition focus:ring-2 disabled:opacity-60"
                disabled={!provinceId || isLoadingCities}
                required
              >
                <option value="">{isLoadingCities ? 'Loading...' : t.addressCity}</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="address-field" className="block text-xs font-medium text-text/70 mb-2">
              {t.addressField}
            </label>
            <input
              id="address-field"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t.addressField}
              className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition placeholder:text-text/50 focus:ring-2"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="address-phone" className="block text-xs font-medium text-text/70 mb-2">
                {t.addressPhone}
              </label>
              <input
                id="address-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.addressPhone}
                className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition placeholder:text-text/50 focus:ring-2"
                required
              />
            </div>

            <div>
              <label htmlFor="address-postal-code" className="block text-xs font-medium text-text/70 mb-2">
                {t.addressPostalCode}
              </label>
              <input
                id="address-postal-code"
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder={t.addressPostalCode}
                className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-text outline-none ring-primary transition placeholder:text-text/50 focus:ring-2"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-content transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-content/30 border-t-primary-content" />
              ) : (
                t.addressSave
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-text transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t.addressCancel}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
