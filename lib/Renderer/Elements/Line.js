export class Line {
    static draw(context, parameters) {
        let {from, to, size, color} = parameters;
        context.beginPath();
        context.moveTo(from.position.x, from.position.y);
        context.lineTo(to.position.x, to.position.y);
        context.lineWidth = size;
        context.strokeStyle = color;
        context.stroke();
    }
}