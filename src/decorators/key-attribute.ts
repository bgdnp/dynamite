import { MetadataStorage } from '@internal';
import { EntityContructor } from '@types';

export function KeyAttribute() {
  return (target: Record<string, any>, property: string) => {
    const constructor = target.constructor as EntityContructor;
    const metadata = MetadataStorage.get(constructor);

    metadata.attributes.push(property);
    metadata.key = property;

    MetadataStorage.set(constructor, metadata);
  };
}
