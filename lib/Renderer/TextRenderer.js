import {Circle} from "./Elements/Circle";
import {Text} from './Elements/Text';

export class TextRenderer {

    renderLayer(context, layer) {

        this.context = context;
        this.layer = layer;

        this.layer.nodes.forEach((node) => {
            this.drawCircle(node);
            if (node.label) {
                this.drawText(node);
            }
        });
    }

    drawCircle(node) {
        Circle.draw(this.context, {
            'color': this.layer.nodeColor,
            node,
            'size': this.layer.nodeSize
        });
    }

    drawText(node) {
        Text.draw(this.context, {
            'color': this.layer.textColor,
            node,
            'size': this.layer.textSize,
            'text': node.label
        });
    }
}
