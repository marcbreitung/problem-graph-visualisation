export class SolutionRenderer {

    renderLevel(context, level) {
        this.context = context;
        this.level = level;

        this.context.beginPath();

        this.level.nodes.forEach((node) => {
            this.drawLineTo(node);
        });

        this.context.lineWidth = this.level.lineSize;
        this.context.strokeStyle = this.level.lineColor;
        this.context.stroke();
    }

    drawLineTo(node) {
        this.context.lineTo(node.position.x, node.position.y);
    }
}