export class Canvas {

    constructor(parameters) {
        let {element, height, width} = parameters;
        this.element = element;
        this.context = this.element.getContext(`2d`);
        this.levels = [];
        this.activeLevel = null;
        this.resize({
            height,
            width
        });
    }

    addLevel(level) {
        if (this.levels.indexOf(level) === -1) {
            this.levels.push(level);
        }
    }

    resize(size) {
        let {height, width} = size;
        this.element.setAttribute(`height`, height);
        this.element.setAttribute(`width`, width);
    }

    update() {
        this.levels.forEach((level) => {
            this.activeLevel = level;
            this.drawLevel(level);
        });
    }

    drawLevel(level) {
        level.nodes.forEach((node) => {
            this.drawConnections(node);
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
        let {node, text, size, color} = parameters;
        this.context.font = `${size}px Arial`;
        this.context.fillStyle = color;
        this.context.fillText(text, node.position.x - 4, node.position.y + 4);
    }

    drawCircle(parameters) {
        let {node, size, color} = parameters;
        this.context.beginPath();
        this.context.arc(node.position.x, node.position.y, size, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
    }

    drawLine(parameters) {
        let {from, to, size, color} = parameters;
        this.context.beginPath();
        this.context.moveTo(from.position.x, from.position.y);
        this.context.lineTo(to.position.x, to.position.y);
        this.context.lineWidth = size;
        this.context.strokeStyle = color;
        this.context.stroke();
    }
}