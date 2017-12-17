export class Circle {
    static draw(context, parameters) {
        context.beginPath();
        context.arc(parameters.node.position.x, parameters.node.position.y, parameters.size, 0, 2 * Math.PI, false);
        context.fillStyle = parameters.color;
        context.fill();
    }
}