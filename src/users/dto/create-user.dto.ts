import { ArrayNotEmpty, ArrayUnique, isArray, isEmail, IsString, isString } from "class-validator";

export class CreateUserDto{
    @isEmail()
    email: string;

    @isString()
    password: string;

    @isArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsString({each: true})
    permissionCodes: string[];
}
