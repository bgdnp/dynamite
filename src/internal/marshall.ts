import { marshall as marshallUtil } from '@aws-sdk/util-dynamodb';
import { EntityItem, EntityMetadata } from '@types';

export function marshall<TEntity extends Record<string, any>>(
  entity: TEntity,
  metadata: EntityMetadata<TEntity>,
  parent?: { name: string; key: string }
): EntityItem[] {
  const attributes = marshallUtil(Object.fromEntries(metadata.attributes.map((key) => [key, entity[key]])));

  const item: EntityItem = {
    pk: { S: parent ? `${parent.name}#${parent.key}` : `${metadata.name}#${entity[metadata.key]}` },
    sk: { S: `${metadata.name}#${entity[metadata.key]}` },
    entity: { S: metadata.name },
    ...attributes,
  };

  const children = metadata.children
    .map((child) => {
      if (child.list) {
        return entity[child.property].map((childEntity: Record<string, any>) =>
          marshall(childEntity, child.metadata(), { name: metadata.name, key: entity[metadata.key] })
        );
      } else {
        return marshall(entity[child.property], child.metadata(), { name: metadata.name, key: entity[metadata.key] });
      }
    })
    .flat(2);

  return [item, ...children];
}
