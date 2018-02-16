import {RendererFactory} from "../Renderer/RendererFactory";

export class Canvas {

    constructor(parameters) {
        this.element = parameters.element || null;
        this.height = parameters.height || 100;
        this.width = parameters.width || 100;
        this.background = parameters.background || `#FFFFFF`;
        this.rendererFactory = new RendererFactory();
        this.layers = [];

        if (this.element !== null) {
            this.context = this.element.getContext(`2d`);
            this.resize({
                'height': this.height,
                'width': this.width
            });
        }
    }

    addLayer(layer) {
        let layerIndex = this.layers.findIndex(element => element.name === layer.name);
        if (layerIndex === -1) {
            this.layers.push(layer);
        } else {
            this.layers[layerIndex] = layer;
        }
        this.sortLayers();
    }

    sortLayers() {
        this.layers = this.layers.sort((layerA, layerB) => layerA.sorting - layerB.sorting);
    }

    removeLayerByName(name) {
        let layer = this.layers.find((item) => item.name === name);
        if (this.layers.indexOf(layer) > -1) {
            this.layers.splice(this.layers.indexOf(layer), 1);
        }
    }

    resize(size) {
        this.element.setAttribute(`height`, size.height);
        this.element.setAttribute(`width`, size.width);
    }

    update() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.element.getAttribute(`width`), this.element.getAttribute(`height`));
        this.layers.forEach((layer) => {
            this.renderLayer(layer);
        });
    }

    renderLayer(layer) {
        this.rendererFactory.getRenderer(layer.type).renderLayer(this.context, layer);
    }

}