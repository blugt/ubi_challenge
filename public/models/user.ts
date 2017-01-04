export class User {
    id: string;
    username: string;
    email: string;

    constructor(id: string, uname: string, email: string){
        this.id = id;
        this.username = uname;
        this.email = email;
    }
}