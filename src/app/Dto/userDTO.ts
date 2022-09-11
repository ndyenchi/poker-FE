export class UserDTO {
    email: string;
    password: string;
    displayName: string;
    name:string;
    dob: string;
    address: string;
    phone: string;
    createDate: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
