export class LineFromTo {
    static draw(context, parameters) {
        context.beginPath();
        context.moveTo(parameters.from.position.x, parameters.from.position.y);
        context.lineTo(parameters.to.position.x, parameters.to.position.y);
        context.lineWidth = parameters.size;
        context.strokeStyle = parameters.color;
        context.stroke();
    }
}