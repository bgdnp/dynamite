export class Employee {
  email: string;
  name: string;
}

export class Address {
  id: string;
  street: string;
  city: string;
}

export class Company {
  id: string;
  name: string;
  employees: Employee[];
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
