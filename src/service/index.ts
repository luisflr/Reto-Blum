import { CustomersServiceImpl } from './CustomersServiceImpl';
import { repository } from '../repository';

export const service = new CustomersServiceImpl(repository);
