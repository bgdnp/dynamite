import { Attribute, Entity, HasMany, HasOne, KeyAttribute } from '../decorators';

@Entity()
export class Employee {
  @KeyAttribute()
  email: string;

  @Attribute()
  name: string;
}

@Entity()
export class Address {
  @KeyAttribute()
  id: string;

  @Attribute()
  street: string;

  @Attribute()
  city: string;
}

@Entity()
export class Company {
  @KeyAttribute()
  id: string;

  @Attribute()
  name: string;

  @HasMany(() => Employee)
  employees: Employee[];

  @HasOne(() => Address)
  address: Address;
}

export const newCompany = (): Company => {
  const company = new Company();
  company.id = 'a';
  company.name = 'A Company';
  company.employees = [{ email: 'someone@a.com', name: 'Someone' }];
  company.address = { id: 'street148', street: 'Street 148', city: 'City' };

  return company;
};
