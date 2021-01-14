import {Config} from "config/config";
import { gameManager } from "./gameManager";

export class sourceManager {

  private globalGM: gameManager;

  private sources: Source[] = [];
  private sourceCount: number = 0;

  constructor(globalGM: gameManager) {
    this.globalGM = globalGM;
    this.loadSources();
  }

  public loadSources() {
      this.sources = this.globalGM.rM.getFirstRoom().find(FIND_SOURCES_ACTIVE);
      this.sourceCount = _.size(this.sources);

      if (Config.VERBOSE) {
          console.log(this.sourceCount + " sources in room.");
      }
  }

  public getFirstSource(): Source {
      return this.sources[0];
  }

  public getNextSource(): void {

  }

}
