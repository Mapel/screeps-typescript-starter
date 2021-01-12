import {assert} from "chai";
import {gameManager} from "components/gameManager";
import {Game, Memory} from "../mock"


describe("gameManager", () => {
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

  it("should create an object of type GameManager", () => {
    var GM: gameManager = new gameManager();
    assert.isTrue(typeof GM === "object");
  });

  it("should ave spawnManager and creepManager property", () => {
    var GM: gameManager = new gameManager();
    assert.isTrue(typeof GM.cM === "object");
    assert.isTrue(typeof GM.sM === "object");
  });

  it("testLog", () => {
    var GM: gameManager = new gameManager();
    GM.testLog();
  });
});
