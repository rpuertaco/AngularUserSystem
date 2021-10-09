export class RestaurantDTO {
    _id?: string;
    name: string;
    username: string;
    password: string;
    email: string;

    constructor(name: string, username: string, password: string, email: string) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}