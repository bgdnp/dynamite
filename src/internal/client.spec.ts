import { QueryCommandInput, TransactWriteItemsCommandInput } from '@aws-sdk/client-dynamodb';
import { Client } from './client';
import { items } from '../__mocks__/items';

describe('Client', () => {
  const client = new Client();

  describe('query', () => {
    it('should return items', async () => {
      const input: QueryCommandInput = {
        TableName: 'table',
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: { '#pk': 'pk' },
        ExpressionAttributeValues: {
          ':pk': { S: `Company#a` },
        },
      };

      await expect(client.query(input)).resolves.toEqual(
        expect.objectContaining({ Items: expect.arrayContaining(items) })
      );
    });

    it('should not return items', async () => {
      const input: QueryCommandInput = {
        TableName: 'table',
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: { '#pk': 'pk' },
        ExpressionAttributeValues: {
          ':pk': { S: `Company#noitems` },
        },
      };

      await expect(client.query(input)).resolves.toEqual(expect.objectContaining({ Items: [] }));
    });
  });

  describe('transactWrite', () => {
    it('should send transact write request', async () => {
      const input: TransactWriteItemsCommandInput = {
        TransactItems: items.map((item) => {
          return {
            Put: {
              TableName: 'table',
              Item: item,
            },
          };
        }),
      };

      await expect(client.transactWrite(input)).resolves.toEqual(
        expect.objectContaining({ Responses: expect.arrayContaining(items.map((item) => ({ Item: item }))) })
      );
    });
  });
});
