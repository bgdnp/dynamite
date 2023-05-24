import {
  DynamoDBClient,
  DynamoDBClientConfig,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  TransactGetItemsCommandOutput,
  TransactWriteItemsCommand,
  TransactWriteItemsCommandInput,
} from '@aws-sdk/client-dynamodb';
import { EntityItem } from '@types';

type ModifiedQueryCommandOutput = Omit<QueryCommandOutput, 'Items'> & { Items: EntityItem[] };

export class Client {
  private dynamodb: DynamoDBClient;

  constructor(config?: DynamoDBClientConfig) {
    this.dynamodb = new DynamoDBClient(config ?? {});
  }

  public async query(input: QueryCommandInput): Promise<ModifiedQueryCommandOutput> {
    const command = new QueryCommand(input);
    const output = await this.dynamodb.send(command);

    return { ...output, Items: (output.Items as EntityItem[]) ?? [] };
  }

  public async transactWrite(input: TransactWriteItemsCommandInput): Promise<TransactGetItemsCommandOutput> {
    const command = new TransactWriteItemsCommand(input);

    return await this.dynamodb.send(command);
  }
}
