import {RendererFabric} from "./../Renderer/RendererFabric";

export class Canvas {

    constructor(parameters) {
        this.element = parameters.element || null;
        this.height = parameters.height || 100;
        this.width = parameters.width || 100;
        this.background = parameters.background || `#FFFFFF`;
        this.rendererFabric = new RendererFabric();
        this.levels = [];

        if (this.element !== null) {
            this.context = this.element.getContext(`2d`);
            this.resize({
                'height': this.height,
                'width': this.width
            });
        }
    }

    addLevel(level) {
        let levelIndex = this.levels.findIndex(element => element.name === level.name);
        if (levelIndex === -1) {
            this.levels.push(level);
        } else {
            this.levels[levelIndex] = level;
        }
    }

    removeLevelByName(name) {
        let level = this.levels.find((item) => item.name === name);
        if (this.levels.indexOf(level) > -1) {
            this.levels.splice(this.levels.indexOf(level), 1);
        }
    }

    resize(size) {
        this.element.setAttribute(`height`, size.height);
        this.element.setAttribute(`width`, size.width);
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