export namespace Config {

    // APPLICATION CORE CONFIGURATION
    /**
     * Enable this if you want a lot of text to be logged to console.
     * @type {boolean}
     */
    export const VERBOSE: boolean = true;


    // APPLICATION GAMEPLAY CONFIGURATION
    /**
     * @type {number}
     */
    export const MAX_HARVESTERS_PER_SOURCE: number = 4;
    /**
     * Default amount of minimal ticksToLive Screep can have, before it goes to renew. This is only default value, that don't have to be used.
     * So it doesn't cover all Screeps
     * @type {number}
     */
    export const DEFAULT_MIN_LIFE_BEFORE_NEEDS_REFILL: number = 700;
    /**
     * Default worker
     * @type {BodyPartConstant[]}
     */
    export const DEFAULT_WORKER_BODY: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE];
    /**
     * Default harvester
     * @type {BodyPartConstant[]}
     */
    export const DEFAULT_HARVESTER_BODY: BodyPartConstant[] = [WORK, WORK, WORK, WORK, WORK, MOVE];

}
