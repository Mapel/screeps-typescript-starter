import {assert} from "chai";
import {roomManager} from "components/roomManager";
import {Game, Memory} from "../mock"


describe("roomManager", () => {
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
});
