import { MetadataStorage } from '@internal';
import { EntityContructor } from '@types';

export function HasMany(type: () => EntityContructor) {
  return (target: Record<string, any>, property: string) => {
    const constructor = target.constructor as EntityContructor;
    const metadata = MetadataStorage.get(constructor);

    metadata.children.push({
      property: property,
      list: true,
      metadata: () => MetadataStorage.get(type()),
    });
  };
}
