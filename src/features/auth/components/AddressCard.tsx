"use client";

import { useState } from 'react';
import { Trash2, Phone, Hash } from 'lucide-react';
import type { AddressModel } from '../model/addressModel';
import type { CatalogLocale } from '../../../core/i18n/catalogLocale';

type AddressCardProps = {
  address: AddressModel;
  locale: CatalogLocale;
  onDelete: (id: number) => Promise<void>;
};

export default function AddressCard({ address, locale, onDelete }: AddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(address.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const displayAddress = address.formatedAddress || address.address || '';
  const displayLocation = [address.city, address.province].filter(Boolean).join(' / ');

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text truncate">{address.title}</h3>
          {displayAddress && <p className="mt-1 text-sm text-text/70 line-clamp-2">{displayAddress}</p>}
          {displayLocation && <p className="mt-1 text-xs text-text/60">{displayLocation}</p>}
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="ms-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 text-danger transition hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-60"
          title="Delete address"
        >
          {isDeleting ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-danger/30 border-t-danger" />
          ) : (
            <Trash2 size={16} strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>

      {address.phone && (
        <div className="mt-2 flex gap-4 text-xs text-text/60">
          <span className="inline-flex items-center gap-1">
            <Phone size={12} strokeWidth={2} aria-hidden />
            {address.phone}
          </span>
          {address.postalCode && (
            <span className="inline-flex items-center gap-1">
              <Hash size={12} strokeWidth={2} aria-hidden />
              {address.postalCode}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
