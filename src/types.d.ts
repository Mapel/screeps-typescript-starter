// example declaration file - remove these and add your own custom typings

// memory extension samples
// interface CreepMemory {
//   role: string;
//   room: string;
//   working: boolean;
// }

interface Memory {
  uuid: number;
  log: any;
  assignements: {[sourceID: string]: {creepNumber: number} };
  SourceContainer: {[roomName: string]: {[sourceId: string]: {containerPos: RoomPosition}}};
  roadPaths : string[];
}

interface CreepMemory {
  role: string,
  targetSource?: string,
  targetEnergyDropOff?: string
}
interface FlagMemory { }

interface SpawnMemory {  }

interface RoomMemory { }

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
