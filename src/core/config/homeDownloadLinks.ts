export type HomeDownloadLink = {
  href: string;
  isSoon?: boolean;
};

export type HomeDownloadLinks = {
  android: HomeDownloadLink;
  ios: HomeDownloadLink;
  pwa: HomeDownloadLink;
};

export const homeDownloadLinks: HomeDownloadLinks = {
  android: {
    href: 'https://cafebazaar.ir/app/com.chaadisho.chaadisho_seller',
    isSoon: false,
  },
  ios: {
    href: '#',
    isSoon: true,
  },
  pwa: {
    href: '#',
    isSoon: true,
  },
};
