import { creepManager } from "./creepManager";
import { spawnManager } from "./spawnManager";
import { roomManager } from "./roomManager";
import { sourceManager } from "./sourceManager";
import { MemoryManager } from "./memoryManager";
import {Config} from "config/config";

export class gameManager {

  public cM: creepManager = new creepManager();

  public sM: spawnManager = new spawnManager();

  public rM: roomManager = new roomManager();

  public soM: sourceManager = new sourceManager(this.rM.rooms);

  public mM: MemoryManager = new MemoryManager();

  constructor() {

  }

  public testLog() {
    console.log('Testlog');
  }

  public mainLoop(){
    if (Config.VERBOSE) {
      console.log("Start loop. Used CPU: " + Game.cpu.getUsed());
    }

    this.mM.loadMemory();
    this.cM.loadCreeps();

    if (Config.VERBOSE) {
      console.log("Creepcount " + this.cM.creepCount + " - Used CPU: " + Game.cpu.getUsed() );
    }



    if (Config.MAX_HARVESTERS_PER_SOURCE > this.cM.creepCount * this.soM.sourceCount){
      if (Config.VERBOSE) {
        console.log("Spawning harvester. - Used CPU: " + Game.cpu.getUsed());
      }
      this.cM.spawnCreep(
        this.sM.getFirstSpawn(),
        {memory: {role: 'harvester'}})
    };

    this.cM.harvestersGoToWork(this.sM.getFirstSpawn(), this.soM.Sources[0]);
  }
}
