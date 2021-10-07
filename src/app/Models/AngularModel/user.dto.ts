export class UserDTO {
    _id?: string;
    name: string;
    test: boolean;
    constructor(name: string, test: boolean) {
        this.name = name;
        this.test = test;

    }
}