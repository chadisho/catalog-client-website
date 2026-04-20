"use client";

import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type AppDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  containerClassName?: string;
  panelClassName?: string;
  children: ReactNode;
};

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
}

export default function AppDialog({
  isOpen,
  onClose,
  closeLabel,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  containerClassName = 'fixed inset-0 z-50 flex items-end bg-overlay lg:items-center lg:justify-center',
  panelClassName,
  children,
}: AppDialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  const modalRoot = useMemo(() => {
    if (typeof document === 'undefined') {
      return null;
    }

    return document.getElementById('modal-root') ?? document.body;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) {
      return;
    }

    const focusableElements = getFocusableElements(panelRef.current);
    const initialElement = focusableElements[0] ?? panelRef.current;
    initialElement.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(panelRef.current);
      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEscape, isOpen, onClose]);

  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className={containerClassName} role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      <div ref={panelRef} className={panelClassName} tabIndex={-1}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}
