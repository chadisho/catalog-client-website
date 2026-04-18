"use client";

import type { ReactNode } from 'react';
import { toast, type ExternalToast } from 'sonner';

type ToastAction = {
  label: ReactNode;
  onClick: () => void;
};

type ToastOptions = Omit<ExternalToast, 'action' | 'style' | 'actionButtonStyle' | 'classNames'> & {
  action?: ToastAction | ReactNode;
  style?: ExternalToast['style'];
  actionButtonStyle?: ExternalToast['actionButtonStyle'];
  classNames?: ExternalToast['classNames'];
};

const defaultToastStyle: NonNullable<ExternalToast['style']> = {
  fontFamily: 'var(--sans)',
};

const defaultActionButtonStyle: NonNullable<ExternalToast['actionButtonStyle']> = {
  fontFamily: 'var(--sans)',
  border: '1px solid var(--color-border)',
  background: 'transparent',
  color: 'var(--color-text)',
};

function isToastAction(action: ToastAction | ReactNode): action is ToastAction {
  return action != null && typeof action === 'object' && 'label' in action && 'onClick' in action;
}

function buildToastOptions(options?: ToastOptions): ExternalToast {
  if (!options) {
    return {
      style: defaultToastStyle,
      actionButtonStyle: defaultActionButtonStyle,
    };
  }

  const { action, style, actionButtonStyle, classNames, ...rest } = options;

  return {
    ...rest,
    action: action
      ? isToastAction(action)
        ? {
            label: action.label,
            onClick: () => action.onClick(),
          }
        : action
      : undefined,
    style: {
      ...defaultToastStyle,
      ...style,
    },
    actionButtonStyle: {
      ...defaultActionButtonStyle,
      ...actionButtonStyle,
    },
    classNames,
  };
}

export function toastSuccess(message: string, options?: ToastOptions) {
  toast.success(message, buildToastOptions(options));
}

export function toastError(message: string, options?: ToastOptions) {
  toast.error(message, buildToastOptions(options));
}
