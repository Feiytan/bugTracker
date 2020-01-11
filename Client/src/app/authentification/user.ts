export class User {
    constructor(public pseudo, private _token) {

    }

    get token() {
        return this._token
    }
}
