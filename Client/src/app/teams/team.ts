export class Team {
    constructor(public team_id : number, public team_name : string, public profile : string, public members : {pseudo: string, profile: string, user_id: number}[]) {

    }
}
