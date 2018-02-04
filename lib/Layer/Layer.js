export class Layer {
    constructor(name, parameters) {
        this.name = name;
        this.sorting = parameters.sorting || 0;
        this.type = parameters.type || null;
        this.nodes = parameters.nodes || [];
        this.nodeColor = parameters.nodeColor || `#000000`;
        this.lineColor = parameters.lineColor || `#000000`;
        this.textColor = parameters.textColor || `#FFFFFF`;
        this.nodeSize = parameters.nodeSize || 10;
        this.textSize = parameters.textSize || 12;
        this.lineSize = parameters.lineSize || 1;
    }
}
