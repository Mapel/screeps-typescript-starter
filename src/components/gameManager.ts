import { creepManager } from "./creepManager";
import { spawnManager } from "./spawnManager";
import { roomManager } from "./roomManager";
import { sourceManager } from "./sourceManager";

export class gameManager {

  public cM: creepManager = new creepManager();

  public sM: spawnManager = new spawnManager();

  public rM: roomManager = new roomManager();

  public soM: sourceManager = new sourceManager(this);

  constructor() {

  }

  public testLog() {
    console.log('Testlog');
  }

  public mainLoop(){

  }
}
