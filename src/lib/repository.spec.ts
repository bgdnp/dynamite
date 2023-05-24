import { Company, newCompany } from '../__mocks__/entities';
import { Repository } from './repository';

describe('Repository', () => {
  const repository = new Repository(Company);

  describe('getOne', () => {
    it('should return single entity', async () => {
      const company = await repository.getOne('a');

      expect(company).toEqual(newCompany());
    });
  });

  describe('getChunk', () => {
    it('should return list of entities', async () => {
      const company = await repository.getChunk();

      expect(company).toEqual([newCompany()]);
    });
  });
});
