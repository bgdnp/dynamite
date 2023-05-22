import { MetadataStorage } from '@internal';
import { EntityContructor } from '@types';

export function Attribute() {
  return (target: Record<string, any>, property: string) => {
    const constructor = target.constructor as EntityContructor;
    const metadata = MetadataStorage.get(constructor);

    metadata.attributes.push(property);

    MetadataStorage.set(constructor, metadata);
  };
}
