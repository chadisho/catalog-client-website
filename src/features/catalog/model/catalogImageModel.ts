export type CatalogImageModel = {
  id: number;
  image: string;
  title?: string | null;
  description?: string | null;
  link?: string | null;
};

export const mapCatalogImage = (data: any): CatalogImageModel => {
  return {
    id: typeof data?.id === 'number' ? data.id : 0,
    image: typeof data?.image === 'string' ? data.image : '',
    title: typeof data?.title === 'string' ? data.title : null,
    description: typeof data?.description === 'string' ? data.description : null,
    link: typeof data?.link === 'string' ? data.link : null,
  };
};

export const mapCatalogImages = (data: any): CatalogImageModel[] => {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(mapCatalogImage);
};
