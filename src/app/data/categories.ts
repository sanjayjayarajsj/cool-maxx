// src/app/data/categories.ts
// Put each category picture in src/assets/categories/ and paste the path in `image`.
// Leave '' and a clean placeholder is shown instead.
import { Category } from '../models/category.model';

export const CATEGORIES: Category[] = [
  { id: 'compressors', name: 'Compressors', description: 'Rotary & scroll compressors for split, window and commercial units.', image: 'assets/products/compressors/compr.jpg' },
  { id: 'refrigerants', name: 'Refrigerants / Freon', description: 'R22, R32, R410A and more – sealed cylinders, trusted purity.', image: 'assets/products/refrigerants/Gas Refrigerant.jpg' },
  { id: 'copper-fittings', name: 'Copper Coils & Fittings', description: 'Copper pipes, coils, flare nuts and fittings for clean installations.', image: 'assets/products/copper-fittings/Pancake Coil Copper Tube.jpg' },
  { id: 'motors-fans', name: 'Motors & Fans', description: 'Indoor & outdoor fan motors, blades and blower assemblies.', image: 'assets/products/motors-fans/70635a23efd8b4fa0bd48ef857d2ca79.jpg' },
  { id: 'capacitors', name: 'Capacitors', description: 'Run & start capacitors in all common ratings.', image: 'assets/products/capacitors/comp.jpg' },
  { id: 'electrical-components', name: 'Electrical Components', description: 'PCBs, relays, contactors, sensors, remotes and wiring parts.', image: 'assets/products/electrical-components/BlueNatHxRPR 3 Pole 40 Amp 24 VAC Coil Definite Purpose Air Conditioner Contactor.jpg' },
];

export const getCategory = (id: string) => CATEGORIES.find(c => c.id === id);
