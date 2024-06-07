import { CustomersService } from './CustomersService';
import { CustomersRepository } from '../repository/CustomersRepository';
import { Customer } from '../domain/Customer';

export class CustomersServiceImpl implements CustomersService {
  constructor(private repository: CustomersRepository) {}

  async findByFilter(customer: Customer): Promise<Customer[]> {
    return (await this.repository.findByFilter(customer)).map(
      (item) =>
        new Customer({
          ...item,
          email: `${item.name.charAt(0)}${item.lastName}@miblum.com`,
        })
    );
  }
}
