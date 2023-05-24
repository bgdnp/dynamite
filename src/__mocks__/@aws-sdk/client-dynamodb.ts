import {
  QueryCommand,
  QueryCommandOutput,
  TransactGetItemsCommandOutput,
  TransactWriteItemsCommand,
} from '@aws-sdk/client-dynamodb';
import { items } from '../items';

export class DynamoDBClient {
  constructor(config: any) {}

  async send(
    command: QueryCommand | TransactWriteItemsCommand
  ): Promise<QueryCommandOutput | TransactGetItemsCommandOutput> {
    if (command instanceof QueryCommand) {
      return {
        Items: command.input.ExpressionAttributeValues?.[':pk']?.S?.includes('noitems')
          ? undefined
          : items.filter(
              (item) =>
                command.input.ExpressionAttributeValues?.[':entity']?.S === undefined ||
                command.input.ExpressionAttributeValues?.[':entity']?.S === item.entity.S
            ),
      } as unknown as QueryCommandOutput;
    }

    if (command instanceof TransactWriteItemsCommand) {
      return {
        Responses: items.map((item) => ({
          Item: item,
        })),
      } as unknown as TransactGetItemsCommandOutput;
    }

    throw new Error('Mock command not implemented.');
  }
}

export { QueryCommand, TransactWriteItemsCommand } from '@aws-sdk/client-dynamodb';
