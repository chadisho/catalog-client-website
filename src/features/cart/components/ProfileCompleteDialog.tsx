"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import AppDialog from '../../../core/components/dialog/AppDialog';
import ProfileEditForm from '../../auth/components/ProfileEditForm';
import { getProfileUpdatePayload } from '../../auth/api/profileApi';
import { getCatalogTranslations } from '../../../core/i18n/catalogLocale';
import { toastError } from '../../../core/lib/toast';
import type { CartLocale, CartTranslations } from '../../../core/i18n/cartLocale';
import type { ProfileUpdatePayload } from '../../auth/model/profileModel';

type ProfileCompleteDialogProps = {
  isOpen: boolean;
  locale: CartLocale;
  t: CartTranslations;
  onClose: () => void;
  onProfileComplete: () => void;
};

export default function ProfileCompleteDialog({
  isOpen,
  locale,
  t,
  onClose,
  onProfileComplete,
}: ProfileCompleteDialogProps) {
  const [profilePayload, setProfilePayload] = useState<ProfileUpdatePayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const payload = await getProfileUpdatePayload();
        setProfilePayload(payload);
      } catch (error) {
        toastError(t.checkoutToastError);
        onClose();
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isOpen, onClose, t]);

  if (!isOpen || !profilePayload || isLoading) {
    return null;
  }

  const isRtl = locale === 'fa';
  const catalogT = getCatalogTranslations(locale);

  const handleSuccess = () => {
    onClose();
    onProfileComplete();
  };

  return (
    <AppDialog
      isOpen={isOpen}
      onClose={onClose}
      closeLabel={t.close}
      panelClassName="relative w-full rounded-t-3xl border border-border bg-background px-5 pb-6 pt-5 text-text shadow-2xl lg:max-w-[480px] lg:rounded-3xl lg:px-6 lg:pb-7 lg:pt-6"
    >
      <div dir={isRtl ? 'rtl' : 'ltr'}>
        <div className={`mb-3 flex items-center ${isRtl ? 'justify-start' : 'justify-end'}`}>
          <button
            type="button"
            aria-label={t.close}
            onClick={onClose}
            className="rounded-full p-2 text-text/70 transition hover:bg-muted"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold">{t.profileCompleteTitle}</h2>

          <ProfileEditForm
            initialPayload={profilePayload}
            t={{
              profileFirstName: catalogT.profileFirstName,
              profileLastName: catalogT.profileLastName,
              profileCellphone: catalogT.profileCellphone,
              profileGender: catalogT.profileGender,
              profileGenderMale: catalogT.profileGenderMale,
              profileGenderFemale: catalogT.profileGenderFemale,
              profileGenderUnknown: catalogT.profileGenderUnknown,
              profileSave: catalogT.profileSave,
              profileCancel: catalogT.profileCancel,
              profileEditSuccessToast: catalogT.profileEditSuccessToast,
              profileEditErrorToast: catalogT.profileEditErrorToast,
            }}
            onSuccess={handleSuccess}
            onCancel={onClose}
          />
        </div>
      </div>
    </AppDialog>
  );
}
