import { AttributeValue } from '@aws-sdk/client-dynamodb';

export type EntityContructor<TEntity extends Record<string, any> = Record<string, any>> = {
  new (): TEntity;
};

export type EntityMetadata<TEntity extends Record<string, any> = Record<string, any>> = {
  name: string;
  constructor: EntityContructor<TEntity>;
  key: string;
  attributes: string[];
  children: {
    property: string;
    metadata: () => EntityMetadata;
  }[];
};

export type EntityItem = {
  pk: AttributeValue.SMember;
  sk: AttributeValue.SMember;
  entity: AttributeValue.SMember;
  [attribute: string]: AttributeValue;
};
