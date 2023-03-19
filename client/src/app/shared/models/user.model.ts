export interface Users {
  message: string;
  data: User[];
}

export interface User {
  id: Number;
  email: String;
  fname: String;
  role: String;
}
