import {Circle} from './Elements/Circle';
import {LineFromTo} from './Elements/LineFromTo';

export class NodesRenderer {

    renderLayer(context, layer) {

        this.context = context;
        this.layer = layer;

        this.layer.nodes.forEach((node) => {
            this.drawLines(node);
        });

        this.layer.nodes.forEach((node) => {
            this.drawCircle(node);
        });
    }

    drawLines(node) {
        node.childs.forEach((child) => {
            LineFromTo.draw(this.context, {
                'color': this.layer.lineColor,
                'from': node,
                'size': this.layer.lineSize,
                'to': child
            });
        });
    }

    drawCircle(node) {
        Circle.draw(this.context, {
            'color': this.layer.nodeColor,
            node,
            'size': this.layer.nodeSize
        });
    }

}
