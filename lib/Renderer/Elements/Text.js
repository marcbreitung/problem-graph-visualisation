export class Text {
    static draw(context, parameters) {
        let {node, text, size, color} = parameters;
        context.font = `${size}px Arial`;
        context.fillStyle = color;
        context.fillText(text, node.position.x - 4, node.position.y + 4);
    }
}