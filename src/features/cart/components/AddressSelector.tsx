"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings2 } from 'lucide-react';
import { getAddresses } from '../../auth/api/addressApi';
import type { AddressModel } from '../../auth/model/addressModel';
import type { CartTranslations } from '../../../core/i18n/cartLocale';

type AddressSelectorProps = {
  t: CartTranslations;
  onAddressChange: (id: number | null) => void;
};

export default function AddressSelector({ t, onAddressChange }: AddressSelectorProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setIsLoading(true);
        const data = await getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error('Failed to load addresses', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, []);

  const handleAddressChange = (id: string) => {
    setSelectedId(id as number | '');
    onAddressChange(id ? Number(id) : null);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="h-11 w-full rounded-lg border border-border bg-surface animate-pulse" />
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="text-sm text-text/70 mb-3">{t.addressSelectLabel}</p>
        <button
          type="button"
          onClick={() => router.push('/profile/addresses')}
          className="w-full inline-flex h-11 items-center justify-center rounded-lg border border-primary px-4 text-sm font-medium text-primary transition hover:bg-primary/10"
        >
          {t.addressManageLink}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <label htmlFor="cart-address-select" className="block text-sm font-medium text-text/70 mb-2">
        {t.addressSelectLabel}
      </label>
      <div className="flex gap-2">
        <select
          id="cart-address-select"
          value={selectedId}
          onChange={(e) => handleAddressChange(e.target.value)}
          className="flex-1 h-11 rounded-lg border border-border bg-surface px-3 text-sm text-text outline-none ring-primary transition focus:ring-2"
        >
          <option value="">{t.addressSelectPlaceholder}</option>
          {addresses.map((addr) => (
            <option key={addr.id} value={addr.id}>
              {addr.title} - {addr.formatedAddress || addr.address || `${addr.city} / ${addr.province}`}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => router.push('/profile/addresses')}
          className="inline-flex h-11 items-center gap-1 rounded-lg border border-border px-3 text-xs font-medium text-text transition hover:bg-muted whitespace-nowrap"
          title={t.addressManageLink}
        >
          <Settings2 size={16} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
