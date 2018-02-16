export class SolutionRenderer {

    renderLayer(context, layer) {
        this.context = context;
        this.layer = layer;

        this.context.beginPath();

        this.layer.nodes.forEach((node) => {
            this.drawLineTo(node);
        });

        this.context.lineWidth = this.layer.lineSize;
        this.context.strokeStyle = this.layer.lineColor;
        this.context.stroke();
    }

    drawLineTo(node) {
        this.context.lineTo(node.position.x, node.position.y);
    }
}
