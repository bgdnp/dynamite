import { QueryCommandInput } from '@aws-sdk/client-dynamodb';
import { Client, MetadataStorage, marshall, unmarshall } from '@internal';
import { EntityConstructor, EntityItem, EntityMetadata } from '@types';

export class Repository<TEntity extends Record<string, any>> {
  public readonly client: Client;
  public readonly table: string;
  public readonly metadata: EntityMetadata<TEntity>;

  constructor(entity: EntityConstructor<TEntity>) {
    this.client = new Client();
    this.metadata = MetadataStorage.get(entity);
  }

  public async getOne(key: string): Promise<TEntity> {
    const input: QueryCommandInput = {
      TableName: this.table,
      KeyConditionExpression: '#pk = :pk',
      ExpressionAttributeNames: { '#pk': 'pk' },
      ExpressionAttributeValues: {
        ':pk': { S: `${this.metadata.name}#${key}` },
      },
    };

    const { Items } = await this.client.query(input);

    return unmarshall(Items as EntityItem[], this.metadata);
  }

  public async getChunk(from?: string, limit?: number): Promise<TEntity[]> {
    const input: QueryCommandInput = {
      TableName: this.table,
      IndexName: 'entity-index',
      KeyConditionExpression: '#entity = :entity',
      ExpressionAttributeNames: { '#entity': ':entity' },
      ExpressionAttributeValues: {
        ':entity': { S: this.metadata.name },
      },
      Limit: limit ?? 10,
      Select: 'pk',
    };

    if (from) {
      input.ExclusiveStartKey = {
        pk: { S: `${this.metadata.name}#${from}` },
        sk: { S: `${this.metadata.name}#${from}` },
        entity: { S: this.metadata.name },
      };
    }

    const { Items } = await this.client.query(input);

    return await Promise.all(Items.map((item) => this.getOne(item.pk.S)));
  }

  public async save(entity: TEntity): Promise<TEntity> {
    const items = marshall(entity, this.metadata);

    await this.client.transactWrite({
      TransactItems: items.map((item) => {
        return {
          Put: {
            TableName: this.table,
            Item: item,
          },
        };
      }),
    });

    return entity;
  }

  public async delete(entity: TEntity): Promise<void> {
    const items = marshall(entity, this.metadata);

    await this.client.transactWrite({
      TransactItems: items.map(({ pk, sk }) => {
        return {
          Delete: {
            TableName: this.table,
            Key: { pk, sk },
          },
        };
      }),
    });
  }
}
