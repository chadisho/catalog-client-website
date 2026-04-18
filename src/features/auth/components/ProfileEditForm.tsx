"use client";

import { type FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from '../../../core/lib/toast';
import { updateProfile } from '../api/profileApi';
import type { ProfileUpdatePayload } from '../model/profileModel';

type ProfileEditFormTranslations = {
  profileFirstName: string;
  profileLastName: string;
  profileCellphone: string;
  profileGender: string;
  profileGenderMale: string;
  profileGenderFemale: string;
  profileGenderUnknown: string;
  profileSave: string;
  profileCancel: string;
  profileEditSuccessToast: string;
  profileEditErrorToast: string;
};

type ProfileEditFormProps = {
  initialPayload: ProfileUpdatePayload;
  t: ProfileEditFormTranslations;
};

export default function ProfileEditForm({ initialPayload, t }: ProfileEditFormProps) {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();
  const [firstName, setFirstName] = useState(initialPayload.user.first_name?.toString() ?? '');
  const [lastName, setLastName] = useState(initialPayload.user.last_name?.toString() ?? '');
  const [gender, setGender] = useState<string>(() => {
    const normalized = Number(initialPayload.user.gender);
    return normalized === 0 || normalized === 1 ? String(normalized) : '';
  });
  const cellphone = initialPayload.user.cellphone?.toString() ?? '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        const nextPayload: any = {
            ...initialPayload.user,
           first_name: firstName,
           last_name: lastName,
            gender: gender === '' ? initialPayload.user.gender : Number(gender),
        
        
        };

        await updateProfile(nextPayload);
        toastSuccess(t.profileEditSuccessToast);
        router.push('/profile');
        router.refresh();
      } catch {
        toastError(t.profileEditErrorToast);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
      <div>
        <label htmlFor="profile-first-name" className="mb-2 block text-text/65">
          {t.profileFirstName}
        </label>
        <input
          id="profile-first-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
        />
      </div>

      <div>
        <label htmlFor="profile-last-name" className="mb-2 block text-text/65">
          {t.profileLastName}
        </label>
        <input
          id="profile-last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
        />
      </div>

      <div>
        <label htmlFor="profile-cellphone" className="mb-2 block text-text/65">
          {t.profileCellphone}
        </label>
        <input
          id="profile-cellphone"
          value={cellphone}
          readOnly
          className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
        />
      </div>

      <div>
        <label htmlFor="profile-gender" className="mb-2 block text-text/65">
          {t.profileGender}
        </label>
        <select
          id="profile-gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          className="h-11 w-full rounded-lg border border-secondary/30 bg-surface px-3 text-text"
        >
          <option value="">{t.profileGenderUnknown}</option>
          <option value="0">{t.profileGenderMale}</option>
          <option value="1">{t.profileGenderFemale}</option>
        </select>
      </div>

      <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-content transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t.profileSave}
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => router.push('/profile')}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-text transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t.profileCancel}
        </button>
      </div>
    </form>
  );
}
