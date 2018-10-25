import { Member } from "../core/member/member.model";

export class Event {
    id : string;
    title : string;
    startTime : Date;
    endTime : Date;
    capacity : number;
    participants : Array<Member>;
    location : string;
}
