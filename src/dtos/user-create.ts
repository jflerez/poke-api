import { IsNotEmpty } from "class-validator";

export class UserCreateDto {
  id?: number;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(user: UserCreateDto) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
  }
}
