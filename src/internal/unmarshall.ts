import { unmarshall as unmarshallUtil } from '@aws-sdk/util-dynamodb';
import { EntityItem, EntityMetadata } from '@types';

export function unmarshall<TEntity extends Record<string, any>>(
  items: EntityItem[],
  metadata: EntityMetadata<TEntity>,
  item?: EntityItem
): TEntity {
  item = item ?? items.find((item) => item.entity.S === metadata.name);

  console.log(metadata.attributes.map((key) => [key, item![key]]));

  const attributes = unmarshallUtil(Object.fromEntries(metadata.attributes.map((key) => [key, item![key]])));
  const children = metadata.children.reduce((agg, child) => {
    if (child.list) {
      agg[child.property] = items
        .filter((item) => item.entity.S === child.metadata().name)
        .map((item) => unmarshall(items, child.metadata(), item));
    } else {
      agg[child.property] = unmarshall(items, child.metadata());
    }

    return agg;
  }, {} as Record<string, any>);

  return Object.assign(new metadata.constructor(), attributes, children);
}
