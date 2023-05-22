import { MetadataStorage } from '@internal';
import { EntityConstructor } from '@types';

export function Attribute() {
  return (target: Record<string, any>, property: string) => {
    const constructor = target.constructor as EntityConstructor;
    const metadata = MetadataStorage.get(constructor);

    metadata.attributes.push(property);

    MetadataStorage.set(constructor, metadata);
  };
}
