import { items } from '../__mocks__/items';
import { Address, Company, Employee, newCompany } from '../__mocks__/entities';
import { EntityMetadata } from '../types';
import { marshall } from './marshall';

describe('marshall', () => {
  it('should marshall entity', () => {
    const company = newCompany();
    const metadata: EntityMetadata<Company> = {
      name: 'Company',
      constructor: Company,
      key: 'id',
      attributes: ['id', 'name'],
      children: [
        {
          property: 'employees',
          list: true,
          metadata: () => ({
            name: 'Employee',
            constructor: Employee,
            key: 'email',
            attributes: ['email', 'name'],
            children: [],
          }),
        },
        {
          property: 'address',
          list: false,
          metadata: () => ({
            name: 'Address',
            constructor: Address,
            key: 'id',
            attributes: ['id', 'street', 'city'],
            children: [],
          }),
        },
      ],
    };

    expect(marshall(company, metadata)).toEqual(expect.arrayContaining(items));
  });
});
