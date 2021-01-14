import {Config} from "config/config";

export interface CreepActionInterface {

    creep: Creep;
    renewStation: StructureSpawn;
    _minLifeBeforeNeedsRenew: number;
    /**
     * Wrapper for Creep.moveTo() method.
     */
    moveTo(target: RoomPosition|{pos: RoomPosition}): number;
    needsRenew(): boolean;
    tryRenew(): number;
    moveToRenew(): void;

    action(): boolean;
}

export class MyCreep implements CreepActionInterface {

    public creep: Creep;
    public renewStation!: StructureSpawn;

    constructor(creep: Creep){
      this.creep = creep;
    }

    public setRenewStation(renewStation: StructureSpawn){
      this.renewStation = renewStation;
      return this;
    }


    public _minLifeBeforeNeedsRenew: number = Config.DEFAULT_MIN_LIFE_BEFORE_NEEDS_REFILL;


    public moveTo(target: RoomPosition|{pos: RoomPosition}) {
        return this.creep.moveTo(target);
    }

    public needsRenew(): boolean {
      if(this.creep.ticksToLive){
        return (this.creep.ticksToLive < this._minLifeBeforeNeedsRenew);
      }else{
        return(false);
      }

    }

    public tryRenew(): number {
        return this.renewStation.renewCreep(this.creep);
    }

    public moveToRenew(): void {
        if (this.tryRenew() == ERR_NOT_IN_RANGE) {
            this.moveTo(this.renewStation);
        }
    }

    public action(): boolean {
        return true;
    }
}
