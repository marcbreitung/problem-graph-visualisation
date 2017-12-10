export class Level {
    constructor(name, parameters) {
        let {type, nodes, nodeColor, lineColor, textColor} = parameters;
        this.type = type;
        this.name = name;
        this.nodes = nodes;
        this.nodeColor = nodeColor;
        this.lineColor = lineColor;
        this.textColor = textColor;
    }
}