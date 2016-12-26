export class User {
    id: Number;
    username: String;
    email: String;

    constructor(id: Number, uname: String, email: String){
        this.id = id;
        this.username = uname;
        this.email = email;
    }
}