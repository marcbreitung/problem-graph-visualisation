export class CircleRenderer {
    static draw(context, parameters) {
        let {node, size, color} = parameters;
        context.beginPath();
        context.arc(node.position.x, node.position.y, size, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
    }
}