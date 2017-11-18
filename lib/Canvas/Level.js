export class Level {
    constructor(name, parameters) {
        let {nodes, nodeColor, lineColor, textColor} = parameters;
        this.name = name;
        this.nodes = nodes;
        this.nodeColor = nodeColor;
        this.lineColor = lineColor;
        this.textColor = textColor;
    }
}