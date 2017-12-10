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

![Example Output](assets/example.png)