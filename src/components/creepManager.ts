import {Config} from "config/config";
import { gameManager } from "./gameManager";
import { Harvester } from "creeps/worker";

export interface bodyBuildOptions{
  bodypartRatio: bodyPartRation[],
  fatigueCompensation?: number,
  reversed?: boolean,
  maxEnergy: number
}

interface bodyPartRation{
  bodypartstring: BodyPartConstant,
  quantity: number
}

export class creepManager {

  private creeps: {[creepName: string]: Creep} = {};
  private creepNames: string[] = [];
  public creepCount: number = 0;

  constructor() {}

  public loadCreeps(): void {
    this.creeps = Game.creeps;
    this.creepCount = _.size(this.creeps);

    this._loadCreepNames();

    if (Config.VERBOSE) {
      console.log(this.creepCount + " creeps found in the playground.");
    }
  }

  private _loadCreepNames(): void {
    for (let creepName in this.creeps) {
      if (this.creeps.hasOwnProperty(creepName)) {
        this.creepNames.push(creepName);
      }
    }
  }

  public createBuild(bodyPartOptions: bodyBuildOptions): string[] {
    if(!bodyPartOptions.fatigueCompensation){
      bodyPartOptions.fatigueCompensation = 2;
    }

    let baseCost = 0;
    let baseCount = 0;
    _.forOwn(bodyPartOptions.bodypartRatio, function(v,k) {
        baseCost += BODYPART_COST[k as BodyPartConstant] * v;
        baseCount += v;
    });
    let repeats = Math.floor(
      bodyPartOptions.maxEnergy/(baseCost+(25*bodyPartOptions.fatigueCompensation)*baseCount));
    let moveparts = 1/2*bodyPartOptions.fatigueCompensation*repeats*baseCount;
    let body = [];

    _.forOwn(bodyPartOptions.bodypartRatio, function(v,k) {
      for(let i = 0; i < v*repeats; i++) body.push(k); });

    for(let i = 0; i < moveparts; i++) body.push(MOVE);

    return (bodyPartOptions.reversed ? body.reverse() : body);
  }

  public spawnCreep(spawnToUse: StructureSpawn, spawnOptions?: SpawnOptions, buildString?: BodyPartConstant[], name?: string){

    if(!name){
      name = 'Creep'+Game.time.toString();
    }
    if(!buildString){
      buildString = Config.DEFAULT_WORKER_BODY;
    }

    var status: ScreepsReturnCode = spawnToUse.canCreateCreep(buildString);
    if (status == OK) {
        status = spawnToUse.spawnCreep(buildString, name, spawnOptions);

        if (Config.VERBOSE) {
            console.log("Started creating new Harvester");
        }
    }

        return status;
  }

  public harvestersGoToWork(renewStation: StructureSpawn, targetSource: Source, targetEnergyDropOff?: Structure): void {

      let harvesters: Harvester[] = [];
      _.forEach(this.creeps, function(creep: Creep) {
          if (creep.memory.role == 'harvester') {
              let harvester = new Harvester(creep);
              harvester.setRenewStation(renewStation)
                .setTargetSource(targetSource)
                .setEnergyDropOff(targetEnergyDropOff? targetEnergyDropOff: renewStation);
              // Next move for harvester
              harvester.action();

              // Save harvester to collection
              harvesters.push(harvester);
          }
      });

      if (Config.VERBOSE) {
          console.log(harvesters.length + " harvesters reported on duty today!");
      }

  }
}
