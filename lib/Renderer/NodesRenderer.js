import {Circle} from './Elements/Circle';
import {LineFromTo} from './Elements/LineFromTo';

export class NodesRenderer {

    renderLevel(context, level) {

        this.context = context;
        this.level = level;

        level.nodes.forEach((node) => {
            this.drawLines(node);
        });

        level.nodes.forEach((node) => {
            this.drawCircle(node);
        });
    }

    drawLines(node) {
        node.childs.forEach((child) => {
            LineFromTo.draw(this.context, {
                'color': this.level.lineColor,
                'from': node,
                'size': this.level.lineSize,
                'to': child
            });
        });
    }

    drawCircle(node) {
        Circle.draw(this.context, {
            'color': this.level.nodeColor,
            node,
            'size': this.level.nodeSize
        });
    }

}
