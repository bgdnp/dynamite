import { MetadataStorage } from '@internal';
import { EntityConstructor } from '@types';

export function HasOne(type: () => EntityConstructor) {
  return (target: Record<string, any>, property: string) => {
    const constructor = target.constructor as EntityConstructor;
    const metadata = MetadataStorage.get(constructor);

    metadata.children.push({
      property: property,
      list: false,
      metadata: () => MetadataStorage.get(type()),
    });
  };
}
