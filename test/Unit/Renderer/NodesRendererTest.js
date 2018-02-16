let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {NodesRenderer} from './../../../lib/Renderer/NodesRenderer';
import {Layer} from "../../../lib/Layer/Layer";

suite('NodesRenderer', function () {

    suite('#renderLevel(context, layer)', function () {
        test('should call drawLines and drawCircle', function () {

            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            let layer = new Layer('layer', {
                'nodes': [{
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }, {
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }],
                'nodeColor': '#e34f00',
                'lineColor': '#385171'
            });

            let nodesRenderer = new NodesRenderer();

            let spyDrawLines = sinon.spy(nodesRenderer, 'drawLines');
            let spyDrawCircle = sinon.spy(nodesRenderer, 'drawCircle');


            nodesRenderer.renderLayer(context, layer);

            assert.isTrue(spyDrawLines.calledTwice);
            assert.isTrue(spyDrawCircle.calledTwice);

        });
    });

});