export class User {
    id: String;
    username: String;
    email: String;

    constructor(id: String, uname: String, email: String){
        this.id = id;
        this.username = uname;
        this.email = email;
    }
}