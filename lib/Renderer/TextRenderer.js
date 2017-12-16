import {Circle} from "./Elements/Circle";
import {Text} from './Elements/Text';

export class TextRenderer {

    renderLevel(context, level) {

        this.context = context;
        this.level = level;

        level.nodes.forEach((node) => {
            this.drawText(node);
        });
    }

    drawText(node) {
        Circle.draw(this.context, {
            'color': this.level.nodeColor,
            node,
            'size': this.level.circleSize
        });
        Text.draw(this.context, {
            'color': this.level.textColor,
            node,
            'size': this.level.textSize,
            'text': node.label
        });
    }
}
