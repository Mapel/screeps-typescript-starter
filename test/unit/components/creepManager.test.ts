import {assert} from "chai";
import {creepManager} from "components/creepManager";
import {Game, Memory} from "../mock"
import { gameManager } from "components/gameManager";


describe("creepManager", () => {
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
    var GM: creepManager = new creepManager(new gameManager());
    assert.isTrue(typeof GM === "object");
  });

    it("should have a methode moveCreeps of Type fuction", () => {
    var GM: creepManager = new creepManager(new gameManager());
    assert.isTrue(typeof GM.moveCreeps === "function")
  });
});
