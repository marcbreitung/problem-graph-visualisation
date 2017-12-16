export class Level {
    constructor(name, parameters) {
        let {type, nodes, nodeColor, lineColor, textColor, nodeSize, textSize} = parameters;
        this.type = type;
        this.name = name;
        this.nodes = nodes;
        this.nodeColor = nodeColor;
        this.lineColor = lineColor;
        this.textColor = textColor;
        this.nodeSize = nodeSize;
        this.textSize = textSize;
    }
}
