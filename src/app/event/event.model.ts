import { Member } from "../core/member/member.model";

export class Event {
    id : string;
    title : string;
    date : Date;
    duration : number;
    capacity : number;
    participants : Array<Member>;
    location : string;
}
