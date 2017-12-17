export class Text {
    static draw(context, parameters) {
        context.font = `${parameters.size}px Arial`;
        context.fillStyle = parameters.color;
        context.fillText(parameters.text, parameters.node.position.x - 4, parameters.node.position.y + 4);
    }
}