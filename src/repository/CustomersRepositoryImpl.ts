import axios from 'axios';
import { CustomersRepository } from './CustomersRepository';
import { Customer } from '../domain/Customer';
import { RandomUser } from '../Types/TypeCustomer';

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');
    if (!result.data.results) {
      return [];
    }

    const customerModel = Customer.toEnum();

    return result.data.results
      .filter((item: RandomUser) =>
        item.name.first.toLowerCase().startsWith(customer.name.toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            [customerModel.ID]: item.id.value,
            [customerModel.NAME]: item.name.first,
            [customerModel.LASTNAME]: item.name.last,
            [customerModel.PHONE]: item.phone,
          })
      );
  }
}
