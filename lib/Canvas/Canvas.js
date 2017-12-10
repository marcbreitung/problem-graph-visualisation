import {CircleRenderer} from './../Renderer/CircleRenderer';
import {LineRenderer} from './../Renderer/LineRenderer';
import {TextRenderer} from './../Renderer/TextRenderer';

export class Canvas {

    constructor(parameters) {
        let {element, height, width, background} = parameters;
        this.element = element;
        this.background = background || `#FFFFFF`;
        this.context = this.element.getContext(`2d`);
        this.levels = [];
        this.activeLevel = null;
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
        let size = {
            'height': this.element.getAttribute(`height`),
            'width': this.element.getAttribute(`width`)
        };
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, size.width, size.height);
        this.levels.forEach((level) => {
            this.activeLevel = level;
            this.renderLevel(level);
        });
    }

    renderLevel(level) {
        level.nodes.forEach((node) => {
            this.drawConnections(node);
        });
        level.nodes.forEach((node) => {
            this.drawCircle({
                'color': this.activeLevel.nodeColor,
                node,
                'size': 5
            });
        });
    }

    drawConnections(node) {
        node.childs.forEach((child) => {
            this.drawLine({
                'color': this.activeLevel.lineColor,
                'from': node,
                'size': 1,
                'to': child
            });
        });
    }

    drawText(parameters) {
        TextRenderer.draw(this.context, parameters);
    }

    drawCircle(parameters) {
        CircleRenderer.draw(this.context, parameters);
    }

    drawLine(parameters) {
        LineRenderer.draw(this.context, parameters);
    }
}