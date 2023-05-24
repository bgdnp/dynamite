import { EntityConstructor } from '@types';
import { Repository as MainRepository } from './repository';

export function BaseRepository<TEntity extends Record<string, any>>(entity: EntityConstructor<TEntity>) {
  abstract class Repository extends MainRepository<TEntity> {
    constructor() {
      super(entity);
    }
  }

  return Repository;
}
