import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../controller/CustomersController';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      const customerModel = Customer.toEnum();
      // Validate
      const myCustomer = [
        new Customer({
          [customerModel.ID]: 'customerId',
          [customerModel.NAME]: 'name',
          [customerModel.LASTNAME]: 'lastName',
          [customerModel.EMAIL]: 'email',
          [customerModel.PHONE]: 'phone',
        }),
      ];

      expect(response).toEqual(controller.apiResponseOk(myCustomer));
      expect(controller.apiResponseOk(myCustomer)).toEqual({
        body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email","phone":"phone"}]',
        isBase64Encoded: false,
        statusCode: 200,
      });
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });

    // ErrorResponse
    it('should return bad request', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              name: 'name',
              id: 'customerId',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          id: 'A',
        },
      } as unknown as APIGatewayProxyEvent);
      // Validate
      expect(response).toEqual(controller.apiResponseBadRequestError());
    });

    it('should returns de customer info', async () => {
      const customerModel = Customer.toEnum();
      const customerInfo = new Customer({
        [customerModel.ID]: 'testid',
        [customerModel.NAME]: 'name',
        [customerModel.LASTNAME]: 'lastname',
        [customerModel.PHONE]: '123456789',
      });
      // Validate

      expect(Customer.toEnum()).toEqual({
        ID: 'id',
        NAME: 'name',
        LASTNAME: 'lastName',
        EMAIL: 'email',
        PHONE: 'phone',
      });

      expect(customerInfo.getId()).toEqual('testid');
    });
  });
});
