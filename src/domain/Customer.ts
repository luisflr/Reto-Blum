export class Customer {
  private id: string;

  name: string;

  lastName: string;

  email: string;

  phone: string;

  constructor(data?: Partial<Customer>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static toEnum() {
    return {
      ID: 'id',
      NAME: 'name',
      LASTNAME: 'lastName',
      EMAIL: 'email',
      PHONE: 'phone',
    };
  }

  public getId(): string {
    return this.id;
  }
}
