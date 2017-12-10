import {Circle} from './Elements/Circle';
import {Line} from './Elements/Line';

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
            Line.draw(this.context, {
                'color': this.level.lineColor,
                'from': node,
                'size': 1,
                'to': child
            });
        });
    }

    drawCircle(node) {
        Circle.draw(this.context, {
            'color': this.level.nodeColor,
            node,
            'size': 5
        });
    }

}
