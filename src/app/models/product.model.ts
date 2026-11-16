export interface Product {
  id: string;
  name: string;
  categoryId: string;
  brand: string;
  model: string;
  image: string; // path, e.g. 'assets/products/compressors/a.webp' ('' = placeholder)
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
}
