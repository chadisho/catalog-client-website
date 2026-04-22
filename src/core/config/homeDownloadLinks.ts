export type HomeDownloadLink = {
  href: string;
  isPlaceholder?: boolean;
};

export type HomeDownloadLinks = {
  android: HomeDownloadLink;
  ios: HomeDownloadLink;
  pwa: HomeDownloadLink;
};

export const homeDownloadLinks: HomeDownloadLinks = {
  android: {
    href: '#',
    isPlaceholder: true,
  },
  ios: {
    href: '#',
    isPlaceholder: true,
  },
  pwa: {
    href: '#',
    isPlaceholder: true,
  },
};
