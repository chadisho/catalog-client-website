"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { deleteAddress as deleteAddressApi, getAddresses } from '../api/addressApi';
import AddressCard from './AddressCard';
import AddressCreateForm from './AddressCreateForm';
import type { AddressModel } from '../model/addressModel';
import type { CatalogLocale, CatalogTranslations } from '../../../core/i18n/catalogLocale';

type AddressListProps = {
  initialAddresses: AddressModel[];
  locale: CatalogLocale;
  t: CatalogTranslations;
};

export default function AddressList({ initialAddresses, locale, t }: AddressListProps) {
  const [addresses, setAddresses] = useState<AddressModel[]>(initialAddresses);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddressApi(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toastSuccess(t.addressDeleteToastSuccess);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.addressDeleteToastError;
      toastError(message);
      throw error;
    }
  };

  const handleAddressCreated = async () => {
    try {
      const updated = await getAddresses();
      setAddresses(updated);
      setIsFormOpen(false);
      toastSuccess(t.addressCreateToastSuccess);
    } catch (error) {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : t.addressCreateToastError;
      toastError(message);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">{t.addressesPageTitle}</h1>
        <p className="mt-2 text-sm text-text/70">{t.addressesEmptyDescription}</p>
      </div>

      {addresses.length === 0 && !isFormOpen ? (
        <section className="rounded-3xl border border-border bg-surface p-8 text-center">
          <p className="text-lg font-semibold text-text">{t.addressesEmptyTitle}</p>
          <p className="mt-2 text-sm text-text/70">{t.addressesEmptyDescription}</p>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-content transition hover:opacity-90"
          >
            <Plus size={16} strokeWidth={2} aria-hidden />
            {t.addressAddNew}
          </button>
        </section>
      ) : (
        <div className="space-y-4">
          {isFormOpen && (
            <AddressCreateForm
              t={t}
              onCreated={handleAddressCreated}
              onCancel={() => setIsFormOpen(false)}
            />
          )}

          {!isFormOpen && addresses.length > 0 && (
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface/50 py-4 text-sm font-medium text-text/70 transition hover:bg-surface hover:text-text"
            >
              <Plus size={18} strokeWidth={2} aria-hidden />
              {t.addressAddNew}
            </button>
          )}

          <div className="space-y-3">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                locale={locale}
                onDelete={handleDeleteAddress}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
