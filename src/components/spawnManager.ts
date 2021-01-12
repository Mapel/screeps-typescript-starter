import {Config} from "config/config";

export class spawnManager {

  private spawns: {[spawnName: string]: StructureSpawn} = {};
  private spawnNames: string[] = [];
  private spawnCount: number = 0;

  constructor() {
    this.loadSpawns();
  }

  private loadSpawns() {
    this.spawns = Game.spawns;
    this.spawnCount = _.size(this.spawns);

    this._loadSpawnNames();

    if (Config.VERBOSE) {
        console.log(this.spawnCount + " spawns in room.");
    }
  }

  public getFirstSpawn(): StructureSpawn {
      return this.spawns[this.spawnNames[0]];
  }

  private _loadSpawnNames() {
      for (let spawnName in this.spawns) {
          if (this.spawns.hasOwnProperty(spawnName)) {
              this.spawnNames.push(spawnName);
          }
      }
  }

}
