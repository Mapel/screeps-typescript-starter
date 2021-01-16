import {Config} from "config/config";
import { gameManager } from "./gameManager";

export class sourceManager {

  private _sources: Source[] = [];
  private _sourceCount: number = 0;

  constructor(rooms: {[roomName: string]: Room}) {
    this.loadSources(rooms);
  }

  public get Sources() {
    return this._sources;
  }

  public get sourceCount() {
    return this._sourceCount;
  }

  public loadSources(rooms: {[roomName: string]: Room}) {

    this._sources = [];
    for (var room in rooms){
      this._sources.push.apply(
        this._sources,
        rooms[room].find(FIND_SOURCES_ACTIVE)
      );
    }

    this._sourceCount = _.size(this._sources);

    if (Config.VERBOSE) {
        console.log(this._sourceCount + " sources in cache.");
    }
  }

  public getRandomSource(){
    return this._sources[Math.floor(Math.random() * this._sources.length)];
  }

  public getNextSource(): void {

  }

}
