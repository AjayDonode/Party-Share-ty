export interface EventUserAccess {
    id?: string;
    eventid:string,
    userid:string,
    granted:boolean;
    grantedOn:Date,
    grantedBy:string,
    endBy:Date
}