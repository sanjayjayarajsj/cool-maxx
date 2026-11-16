// src/app/data/products.ts
// Add a product = copy one block, change the values, put the picture in
// src/assets/products/<category-id>/ and paste the path in `image`.
import { Product } from '../models/product.model';

export const PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Compressor Model A',
    categoryId: 'compressors',
    brand: 'DemoBrand',
    model: 'CA-100',
    image: 'assets/products/compressors/compr.jpg',
    shortDescription: 'High-efficiency rotary compressor.',
    description: 'Demo product for the Cool Maxx catalogue. This compressor offers reliable performance for commercial AC units.',
    specifications: { Power: '5 HP', Voltage: '380V', Capacity: '2000 BTU', Refrigerant: 'R410A' },
  },
  {
    id: 'r1',
    name: 'Refrigerant R-410A',
    categoryId: 'refrigerants',
    brand: 'CoolCool',
    model: 'RC-410',
    image: 'assets/products/refrigerants/Gas Refrigerant.jpg',
    shortDescription: 'Eco-friendly refrigerant.',
    description: 'Sample refrigerant product. Suitable for modern split AC systems.',
    specifications: { GWP: '2088', ODP: '0', Phase: 'Gas' },
  },
  {
    id: 'f1',
    name: 'Copper Fitting 3/8"',
    categoryId: 'copper-fittings',
    brand: 'CopperCo',
    model: 'CF-38',
    image: 'assets/products/copper-fittings/Pancake Coil Copper Tube.jpg',
    shortDescription: 'Standard copper pipe fitting.',
    description: 'Demo copper fitting used in AC piping.',
    specifications: { Size: '3/8"', Material: 'Copper', 'Pressure Rating': '150 psi' },
  },
  // Add more products here ↓
];
