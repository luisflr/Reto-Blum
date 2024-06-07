import { CustomersController } from './CustomersController';
import { service } from '../service';

export const controller = new CustomersController(service);
