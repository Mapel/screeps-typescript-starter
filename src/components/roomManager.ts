import {Config} from "config/config";

export class roomManager {

    private rooms: {[roomName: string]: Room} = {};
    private roomNames: string[] = [];

    constructor(){
      this.loadRooms();
    }

    private loadRooms() {
        this.rooms = Game.rooms;

        this._loadRoomNames();

        if (Config.VERBOSE) {
            let count = _.size(this.rooms);
            console.log(count + " rooms found.");
        }
    }

    public getFirstRoom(): Room {
        return this.rooms[this.roomNames[0]];
    }

    private _loadRoomNames() {
        for (let roomName in this.rooms) {
            if (this.rooms.hasOwnProperty(roomName)) {
                this.roomNames.push(roomName);
            }
        }
    }

}
