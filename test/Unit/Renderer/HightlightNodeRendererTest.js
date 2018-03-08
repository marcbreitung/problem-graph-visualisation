let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {HighlightNodeRenderer} from "../../../lib/Renderer/HighlightNodeRenderer";
import {Layer} from "../../../lib/Layer/Layer";

suite('HighlightNodeRenderer', function () {

    suite('#renderLevel(context, level)', function () {
        test('should call drawCircle', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            let layer = new Layer('layer', {
                'nodes': [{
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }, {
                    'label': '',
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }],
                'nodeColor': '#e34f00',
                'lineColor': '#385171'
            });

            let highlightNodeRenderer = new HighlightNodeRenderer();

            let spyDrawCircle = sinon.spy(highlightNodeRenderer, 'drawCircle');

            highlightNodeRenderer.renderLayer(context, layer);

            assert.isTrue(spyDrawCircle.calledTwice);
        });

    });

});