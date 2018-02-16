let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {Canvas} from './../../../lib/Canvas/Canvas';
import {Layer} from "../../../lib/Layer/Layer";

suite('Canvas', function () {

    suite('#constructor(parameters)', function () {
        test('should set default values if parameters are empty', function () {
            let canvas = new Canvas({});
            assert.propertyVal(canvas, 'element', null);
            assert.propertyVal(canvas, 'height', 100);
            assert.propertyVal(canvas, 'width', 100);
            assert.propertyVal(canvas, 'background', '#FFFFFF');
        });
        test('should set element, width, height and background attributes', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100, background: '#e34f00'});

            assert.deepPropertyVal(canvas, 'layers', []);
            assert.propertyVal(canvas, 'element', searchMap);
            assert.propertyVal(canvas, 'context', searchMap.getContext(`2d`));
            assert.equal(searchMap.getAttribute('height'), 100);
            assert.equal(searchMap.getAttribute('width'), 100);
            assert.propertyVal(canvas, 'background', '#e34f00');
        });
    });

    suite('#addLayer(layer)', function () {
        test('should add a new layer', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let layer = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLayer(layer);

            assert.sameDeepMembers(canvas.layers, [layer]);
        });
        test('should not add an existing layer', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let layer = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLayer(layer);
            canvas.addLayer(layer);

            assert.sameDeepMembers(canvas.layers, [layer]);
        });
        test('should update an existing layer', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let layer = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLayer(layer);
            assert.sameDeepMembers(canvas.layers, [layer]);

            layer = new Layer('layer 01', {nodes: [], nodeColor: '#ffffff', lineColor: '#385171'});
            canvas.addLayer(layer);

            assert.sameDeepMembers(canvas.layers, [layer]);
        });
    });

    suite('#sortLayers(layer)', function () {

        test('should sort layer by sorting', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let layer01 = new Layer('layer 01', {sorting: 1});
            canvas.addLayer(layer01);
            let layer02 = new Layer('layer 02', {sorting: 2});
            canvas.addLayer(layer02);

            assert.sameDeepMembers(canvas.layers, [layer02, layer01]);
        });
    });

    suite('#removeLayerByName(name)', function () {
        test('should remove the layer by names', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let layer = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLayer(layer);
            canvas.removeLayerByName('layer 01');

            assert.sameDeepMembers(canvas.layers, []);
        });
        test('should not remove the layer if no layer with given name exists', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let layer = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLayer(layer);
            canvas.removeLayerByName('layer 02');

            assert.sameDeepMembers(canvas.layers, [layer]);
        });
    });

    suite('#resize(size)', function () {
        test('should update with and height', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            canvas.resize({height: 200, width: 200});

            assert.equal(searchMap.getAttribute('height'), 200);
            assert.equal(searchMap.getAttribute('width'), 200);

        });
    });

    suite('#update()', function () {
        test('should set active layer', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let spy = sinon.spy(canvas, 'renderLayer');

            let layer1 = new Layer('layer 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            let layer2 = new Layer('layer 02', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLayer(layer1);
            canvas.addLayer(layer2);
            canvas.update();

            assert.isTrue(spy.calledTwice);
        });
    });

    suite('#renderLayer(layer)', function () {
        test('should set active layer', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let spyLayer = sinon.spy(canvas, 'renderLayer');

            let layer1 = new Layer('layer 01', {
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
            let layer2 = new Layer('layer 02', {
                'nodes': [{
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }],
                'nodeColor': '#e34f00',
                'lineColor': '#385171'
            });

            canvas.addLayer(layer1);
            canvas.addLayer(layer2);
            canvas.update();

            assert.isTrue(spyLayer.calledTwice);
        });
    });
});