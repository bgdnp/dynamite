import { MetadataStorage } from '@internal';
import { EntityContructor } from '@types';

export function Entity() {
  return (constructor: EntityContructor) => {
    MetadataStorage.set(constructor, {
      name: constructor.name,
      constructor: constructor,
    });
  };
}
