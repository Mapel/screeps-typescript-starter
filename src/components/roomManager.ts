import {Config} from "config/config";

export class roomManager {

    private _rooms: {[roomName: string]: Room} = {};
    private roomNames: string[] = [];

    constructor(){
      this.loadRooms();
    }

    public get rooms(){
      return this._rooms;
    }

    public loadRooms() {
        this._rooms = Game.rooms;

        this._loadRoomNames();

        if (Config.VERBOSE) {
            let count = _.size(this.rooms);
            console.log(count + " rooms found.");
        }
    }

    public getFirstRoom(): Room {
        return this._rooms[this.roomNames[0]];
    }

    private _loadRoomNames() {
        for (let roomName in this._rooms) {
            if (this._rooms.hasOwnProperty(roomName)) {
                this.roomNames.push(roomName);
            }
        }
    }

    public createSourceContainer(spawn: StructureSpawn,sources: Source[]){
      for(var source of sources){
        var possibleContainerPos = source.pos.findPathTo(spawn.pos.x, spawn.pos.y, {ignoreCreeps: true})[0];

        spawn.room.createConstructionSite(possibleContainerPos.x, possibleContainerPos.y, STRUCTURE_CONTAINER);

        Memory.SourceContainer[spawn.room.name][source.id].containerPos =
          new RoomPosition(possibleContainerPos.x, possibleContainerPos.y, spawn.room.name);
      }
    }

    public createRoadsForStructures(spawn: StructureSpawn,sources: Source[], controller: StructureController){
      for (var source of sources){
        roomManager.savePathToMemory(
          roomManager.createRoadsBetween(spawn.room, spawn.pos, source.pos)
        );
        roomManager.savePathToMemory(
          roomManager.createRoadsBetween(spawn.room,controller.pos, source.pos)
        );
      }

      roomManager.createRoadsBetween(spawn.room, controller.pos, spawn.pos);
    }

    public static createRoadsBetween(room: Room, posA: RoomPosition, posB: RoomPosition){
      var roadPath = posA.findPathTo(posB.x, posB.y);

      roomManager.createRoadFromRoadPath(room, roadPath);

      return roadPath;
    }

    public static createRoadFromRoadPath(room: Room, roadPath: PathStep[]){
      for(var roadPos of roadPath){
        room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
      }
    }

    public static savePathToMemory(roadPath: PathStep[]){
      var serializedRoadPath = Room.serializePath(roadPath);

      if (!Memory.roadPaths.find(c => c == serializedRoadPath)){
        Memory.roadPaths.push(serializedRoadPath);
      }
    }

    public static addDirectionToPosition(position: RoomPosition, direction: DirectionConstant): RoomPosition {
        // TOP: 1,
        if( direction == 1){
            return new RoomPosition(position.x-1,position.y, position.roomName);
        }
        // TOP_RIGHT: 2,
        if( direction == 2){
            return new RoomPosition(position.x-1,position.y+1, position.roomName);
        }
        // RIGHT: 3,
        if( direction == 3){
            return new RoomPosition(position.x,position.y+1, position.roomName);
        }
        // BOTTOM_RIGHT: 4,
        if( direction == 4){
            return new RoomPosition(position.x+1,position.y+1, position.roomName);
        }
        // BOTTOM: 5,
        if( direction == 5){
            return new RoomPosition(position.x+1,position.y, position.roomName);
        }
        // BOTTOM_LEFT: 6,
        if( direction == 6){
            return new RoomPosition(position.x-1,position.y+1, position.roomName);
        }
        // LEFT: 7,
        if( direction == 7){
            return new RoomPosition(position.x-1,position.y, position.roomName);
        }
        // TOP_LEFT: 8,
        if( direction == 8){
            return new RoomPosition(position.x-1,position.y-1, position.roomName);
        }
        return position;
    }
}
