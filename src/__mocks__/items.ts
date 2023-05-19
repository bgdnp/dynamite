import { EntityItem } from '../types';

export const items: EntityItem[] = [
  {
    pk: { S: 'Company#a' },
    sk: { S: 'Company#a' },
    entity: { S: 'Company' },
    id: { S: 'a' },
    name: { S: 'A Company' },
  },
  {
    pk: { S: 'Company#a' },
    sk: { S: 'Employee#someone@a.com' },
    entity: { S: 'Employee' },
    email: { S: 'someone@a.com' },
    name: { S: 'Someone' },
  },
  {
    pk: { S: 'Company#a' },
    sk: { S: 'Address#street148' },
    entity: { S: 'Address' },
    id: { S: 'street148' },
    street: { S: 'Street 148' },
    city: { S: 'City' },
  },
];
