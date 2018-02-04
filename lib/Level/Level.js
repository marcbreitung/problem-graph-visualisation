import {Layer} from "../Layer/Layer";

export class Level extends Layer {
    constructor(name, parameters) {
        super(name, parameters);
        /* eslint no-console: ["error", { allow: ["log"] }] */
        console.log(`Level is deprecated, use Layer instead.`);
    }
}