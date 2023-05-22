import { EntityConstructor, EntityMetadata } from '@types';

export class MetadataStorage {
  private static entities: Map<EntityConstructor, EntityMetadata> = new Map();

  public static get<TEntity extends Record<string, any>>(entity: EntityConstructor<TEntity>): EntityMetadata<TEntity> {
    return (this.entities.get(entity) ?? {
      name: entity.name,
      constructor: entity,
      key: 'id',
      attributes: [],
      children: [],
    }) as EntityMetadata<TEntity>;
  }

  public static set<TEntity extends Record<string, any>>(
    entity: EntityConstructor<TEntity>,
    metadata: Partial<EntityMetadata<TEntity>>
  ): typeof MetadataStorage {
    this.entities.set(entity, { ...this.get(entity), ...metadata });

    return this;
  }
}
