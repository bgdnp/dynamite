import { EntityMetadata } from '@types';
import { items } from '../__mocks__/items';
import { unmarshall } from './unmarshall';
import { Address, Company, Employee, newCompany } from '../__mocks__/entities';

describe('unmarshall', () => {
  it('should unmarshall item', () => {
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

    const entity = unmarshall(items, metadata);

    expect(entity).toBeInstanceOf(Company);
    expect(entity).toEqual(newCompany());
  });
});
