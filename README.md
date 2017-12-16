# Problem Graph Visualisation

[![Build Status](https://travis-ci.org/marcbreitung/problem-graph-visualisation.svg?branch=master)](https://travis-ci.org/marcbreitung/problem-graph-visualisation) [![Coverage Status](https://coveralls.io/repos/github/marcbreitung/problem-graph-visualisation/badge.svg?branch=master)](https://coveralls.io/github/marcbreitung/problem-graph-visualisation?branch=master)

Draws the [problem-map-generator](https://github.com/marcbreitung/problem-map-generator) graph in a canvas.

```html
<canvas id="search-map" width="100" height="100"></canvas>

<script src="dist/problem-graph-visualisation.min.js"></script>
<script>
    let canvas = new ProblemGraphVisualisation.Canvas({
        element: document.getElementById('search-map'),
        height: 100,
        width: 100
    });
    canvasNodes.rendererFabric.registerRenderer('node', ProblemGraphVisualisation.NodesRenderer);
    
    let level = new ProblemGraphVisualisation.Level('level 01', {
        type: 'node',
        nodes: [
            {position: {x: 10, y: 50}, childs: [{position: {x: 90, y: 50}, childs: []}]},
            {position: {x: 90, y: 50}, childs: [{position: {x: 10, y: 50}, childs: []}]}
        ], 
        nodeColor: '#e34f00', 
        lineColor: '#385171'
    });
    canvas.addLevel(level);
    canvas.update();
</script>
```
## Canvas Object
```javascript
  let canvas = new ProblemGraphVisualisation.Canvas(attributes);
```
### Possible Attributes
| Attribute | Description | Value |
| --- | --- | --- |
| `element` | canvas | canvas DOM element |
| `height` | canvas height | integer |
| `width` | canvas width | integer |
| `background` | background color as Hex (default value is `#FFFFFF` ) | `#00ff00` |

## Level Object
```javascript
let level = new ProblemGraphVisualisation.Level(name, attributes)
```
### Possible Attributes
| Attribute | Description | Value |
| --- | --- | --- |
| `type` | defines the renderer | `node` or `text` |
| `nodes` | list of nodes | array |
| `nodeColor` | node color as Hex | `#00ff00` |
| `lineColor` | line color as Hex | `#00ff00` |
| `textColor` | text color as Hex | `#000000` |
| `nodeSize` | node size | integer |
| `textSize` | text size | integer |

## Node Renderer
```javascript
let canvas = new ProblemGraphVisualisation.Canvas({});
canvas.rendererFabric.registerRenderer('node', ProblemGraphVisualisation.NodesRenderer);
```
### Output
![Example Output](assets/nodeRenderer.png)

## Text Renderer
```javascript
let canvas = new ProblemGraphVisualisation.Canvas({});
canvas.rendererFabric.registerRenderer('text', ProblemGraphVisualisation.TextRenderer);
```
### Output
![Example Output](assets/textRenderer.png)