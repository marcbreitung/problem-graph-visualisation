import {Circle} from "./Elements/Circle";

export class HighlightNodeRenderer {

    renderLayer(context, layer) {

        this.context = context;
        this.layer = layer;

        this.layer.nodes.forEach((node) => {
            this.drawCircle(node);
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
