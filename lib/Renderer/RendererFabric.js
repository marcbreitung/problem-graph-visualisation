import {NodesRenderer} from "./NodesRenderer";

export class RendererFabric {

    constructor() {
        this.types = {'node': NodesRenderer};
    }

    getRenderer(type) {
        if (this.types[type]) {
            return new this.types[type]();
        }
        return null;
    }

    registerRenderer(type, Renderer) {
        let proto = Renderer.prototype;
        if (proto.renderLevel) {
            this.types[type] = Renderer;
        }
    }
}
