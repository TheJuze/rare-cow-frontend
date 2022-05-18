/* eslint-disable @typescript-eslint/no-explicit-any */
export const mapToRequest = (
  type: 'items' | 'collections' | 'users',
  categories: string | number,
  page: number,
  filters: any,
) => ({
  type,
  categories,
  page,
  collections: filters?.collections?.join(','),
});
