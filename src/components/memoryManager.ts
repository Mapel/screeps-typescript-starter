
export class MemoryManager {

    private _memory!: Memory;

    constructor() {

    }

    public get memory(){
      return this._memory;
    }

    public loadMemory(){
      this._memory = Memory;
    }

    public changeSavedAssignment(){
      //this._memory.assignements[assignement.sourceID].sourceID = assignement.sourceID;
    }
}
