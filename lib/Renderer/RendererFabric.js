import {NullRenderer} from "./NullRenderer";

export class RendererFabric {

    constructor() {
        this.types = {};
    }

    getRenderer(type) {
        if (this.types[type]) {
            return new this.types[type]();
        }
        return new NullRenderer();
    }

    registerRenderer(type, Renderer) {
        let proto = Renderer.prototype;
        if (proto.renderLevel) {
            this.types[type] = Renderer;
        }
    }
}
