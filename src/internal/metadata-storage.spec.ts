import { Address, Company } from '../__mocks__/entities';
import { MetadataStorage } from './metadata-storage';

describe('MetadataStorage', () => {
  describe('get', () => {
    it('should return metadata', () => {
      const metadata = MetadataStorage.get(Address);

      expect(metadata).toEqual({
        name: 'Address',
        constructor: Address,
        key: 'id',
        attributes: ['id', 'street', 'city'],
        children: [],
      });
    });
  });

  describe('set', () => {
    it('should set metadata', () => {
      MetadataStorage.set(Company, { name: 'ChangedCompany', constructor: Company });

      const metadata = MetadataStorage.get(Company);

      expect(metadata).toEqual(expect.objectContaining({ name: 'ChangedCompany' }));

      const childrenMetadata = metadata.children.map((child) => child.metadata());

      expect(childrenMetadata).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'Address' }),
          expect.objectContaining({ name: 'Employee' }),
        ])
      );
    });
  });
});
