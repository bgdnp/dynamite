import { EntityMetadata } from '../types';
import { marshall } from './marshall';

class Company {
  id: string;
  name: string;
  employees: number;
}

describe('marshall', () => {
  it('should marshall entity', () => {
    const company = new Company();
    company.id = 'a';
    company.name = 'A Company';
    company.employees = 10;

    const metadata: EntityMetadata<Company> = {
      name: 'Company',
      constructor: Company,
      key: 'id',
      attributes: ['id', 'name', 'employees'],
      children: [],
    };

    expect(marshall(company, metadata)).toEqual([
      {
        pk: { S: 'Company#a' },
        sk: { S: 'Company#a' },
        entity: { S: 'Company' },
        id: { S: 'a' },
        name: { S: 'A Company' },
        employees: { N: '10' },
      },
    ]);
  });
});
