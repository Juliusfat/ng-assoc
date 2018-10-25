export enum Role {
    ADMIN = "ADMIN"
}

export class Member {
    id: string;
    firstname : string;
    lastname : string;
    email : string;
    role : Array<Role>;
    password: string | null;
}
