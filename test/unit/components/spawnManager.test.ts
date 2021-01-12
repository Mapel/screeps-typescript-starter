import {assert} from "chai";
import {spawnManager} from "components/spawnManager";
import {Game, Memory} from "../mock"


describe("spawnManager", () => {
  before(() => {
    // runs before all test in this block
  });

  beforeEach(() => {
    // runs before each test in this block
    // @ts-ignore : allow adding Game to global
    global.Game = _.clone(Game);
    // @ts-ignore : allow adding Memory to global
    global.Memory = _.clone(Memory);
  });

  it("should create an object of type spawnManager", () => {
    var GM: spawnManager = new spawnManager();
    assert.isTrue(typeof GM === "object");
  });

    it("should have a property MainSpawn of Type StructureSpawn", () => {
    var GM: spawnManager = new spawnManager();
    assert.isTrue(typeof GM === "object")
  });
});
