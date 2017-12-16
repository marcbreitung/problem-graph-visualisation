import {RendererFabric} from "./../Renderer/RendererFabric";

export class Canvas {

    constructor(parameters) {
        let {element, height, width, background} = parameters;
        this.rendererFabric = new RendererFabric();
        this.element = element;
        this.background = background || `#FFFFFF`;
        this.context = this.element.getContext(`2d`);
        this.levels = [];
        this.resize({
            height,
            width
        });
    }

    addLevel(level) {
        let levelIndex = this.levels.findIndex(element => element.name === level.name);
        if (levelIndex === -1) {
            this.levels.push(level);
        } else {
            this.levels[levelIndex] = level;
        }
    }

    resize(size) {
        let {height, width} = size;
        this.element.setAttribute(`height`, height);
        this.element.setAttribute(`width`, width);
    }

    update() {
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.element.getAttribute(`width`), this.element.getAttribute(`height`));
        this.levels.forEach((level) => {
            this.renderLevel(level);
        });
    }

    renderLevel(level) {
        this.rendererFabric.getRenderer(level.type).renderLevel(this.context, level);
    }

}