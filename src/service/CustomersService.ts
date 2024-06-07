import { Customer } from '../domain/Customer';

export interface CustomersService {
  findByFilter(customer: Customer): Promise<Customer[]>;
}
