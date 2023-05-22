import { MetadataStorage } from '@internal';
import { EntityConstructor } from '@types';

export function Entity() {
  return (constructor: EntityConstructor) => {
    MetadataStorage.set(constructor, {
      name: constructor.name,
      constructor: constructor,
    });
  };
}
