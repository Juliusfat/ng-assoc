export enum Role {
    ADMIN = "ADMIN"
}

export class Member {
    firstname : string;
    lastname : string;
    email : string;
    role : Array<Role>;
}
