export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  phones: string[];
  address: string;
  createdAt: Date;
  updatedAt: Date;
  items: any[];
  orders: any[];

  constructor(
    id: string,
    email: string,
    password: string,
    name: string,
    type: string,
    phones: string[],
    address: string,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.type = type;
    this.phones = phones;
    this.address = address;
    this.createdAt = new Date(); // Set creation date to current date
    this.updatedAt = new Date(); // Set update date to current date
    this.items = []; // Initialize items as an empty array
    this.orders = []; // Initialize orders as an empty array
  }
}
