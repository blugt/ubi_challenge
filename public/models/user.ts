export class User {
    id: Number;
    username: String;
    password: String;

    constructor(id: Number, uname: String, pword: String){
        this.id = id;
        this.username = uname;
        this.password = pword;
    }
}