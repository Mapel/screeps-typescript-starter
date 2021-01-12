import {Config} from "config/config";
import {CreepActionInterface, MyCreep} from "./creep"

export interface HarvesterInterface {

    targetSource: Source;
    targetEnergyDropOff: Structure;

    isBagFull(): boolean;
    tryHarvest(): number;
    moveToHarvest(): void;
    tryEnergyDropOff(): number;
    moveToDropEnergy(): void;

    action(): boolean;
}

export class Harvester extends MyCreep implements HarvesterInterface, CreepActionInterface {

    public targetSource: Source;
    public targetEnergyDropOff: StructureSpawn|Structure;

    constructor(public creep: Creep, renewStation: StructureSpawn, targetSource: Source, targetEnergyDropOff: StructureSpawn){
      super(creep,renewStation);

      this.targetSource = targetSource;
      this.targetEnergyDropOff = targetEnergyDropOff;


    }

    public isBagFull(): boolean {
        return (this.creep.carry.energy == this.creep.carryCapacity);
    }

    public tryHarvest(): number {
        return this.creep.harvest(this.targetSource);
    }

    public moveToHarvest(): void {
        if (this.tryHarvest() == ERR_NOT_IN_RANGE) {
            this.moveTo(this.targetSource);
        }
    }

    public tryEnergyDropOff(): number {
        return this.creep.transfer(this.targetEnergyDropOff, RESOURCE_ENERGY);
    }

    public moveToDropEnergy(): void {
        if (this.tryEnergyDropOff() == ERR_NOT_IN_RANGE) {
            this.moveTo(this.targetEnergyDropOff);
        }
    }

    public action(): boolean {
        if (this.needsRenew()) {
            this.moveToRenew();
        } else if (this.isBagFull()) {
            this.moveToDropEnergy();
        } else {
            this.moveToHarvest();
        }

        return true
    }


}
