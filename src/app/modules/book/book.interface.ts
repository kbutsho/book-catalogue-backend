
export type IBook = {
  title: string | undefined;
  author: string | undefined;
  price: number | undefined;
  genre: string | undefined;
  publicationDate: Date | undefined;
  categoryId: string | undefined;
}

export type IBookFilter = {
  search?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  genre?: string | undefined;
  publicationDate?: Date | undefined;
  category?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};

export const bookFilterableFields: string[] = [
  'search',
  'title',
  'author',
  'genre',
  'category',
  'minPrice',
  'maxPrice',
]
export const bookSearchableFields: string[] = [
  'title',
  'author',
  'genre',
];

