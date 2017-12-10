let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {Canvas} from './../../../lib/Canvas/Canvas';
import {Level} from './../../../lib/Level/Level';

suite('Canvas', function () {

    suite('#constructor(parameters)', function () {
        test('should set element, width, height and background attributes', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100, background: '#e34f00'});

            assert.deepPropertyVal(canvas, 'levels', []);
            assert.propertyVal(canvas, 'element', searchMap);
            assert.propertyVal(canvas, 'context', searchMap.getContext(`2d`));
            assert.equal(searchMap.getAttribute('height'), 100);
            assert.equal(searchMap.getAttribute('width'), 100);
            assert.propertyVal(canvas, 'background', '#e34f00');
        });
    });

    suite('#addLevel(level)', function () {
        test('should add a new level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let level = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLevel(level);

            assert.sameDeepMembers(canvas.levels, [level]);
        });
        test('should not add an existing level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let level = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLevel(level);
            canvas.addLevel(level);

            assert.sameDeepMembers(canvas.levels, [level]);
        });
        test('should update an existing level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let level = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            canvas.addLevel(level);
            assert.sameDeepMembers(canvas.levels, [level]);

            level = new Level('level 01', {nodes: [], nodeColor: '#ffffff', lineColor: '#385171'});
            canvas.addLevel(level);

            assert.sameDeepMembers(canvas.levels, [level]);
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
        test('should set active Level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let spy = sinon.spy(canvas, 'renderLevel');

            let level1 = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});
            let level2 = new Level('level 02', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLevel(level1);
            canvas.addLevel(level2);

            assert.equal(canvas.activeLevel, null);
            canvas.update();
            assert.equal(canvas.activeLevel, level2);
            assert.isTrue(spy.calledTwice);
        });
    });

    suite('#renderLevel(level)', function () {
        test('should set active Level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let spyLevel = sinon.spy(canvas, 'renderLevel');
            let spyConnections = sinon.spy(canvas, 'drawConnections');

            let level1 = new Level('level 01', {
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
            let level2 = new Level('level 02', {
                'nodes': [{
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }],
                'nodeColor': '#e34f00',
                'lineColor': '#385171'
            });

            canvas.addLevel(level1);
            canvas.addLevel(level2);

            assert.equal(canvas.activeLevel, null);
            canvas.update();
            assert.equal(canvas.activeLevel, level2);
            assert.isTrue(spyLevel.calledTwice);
            assert.isTrue(spyConnections.calledThrice);
        });
    });

    suite('#drawConnections(node) ', function () {
        test('should draw the connections', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let spy = sinon.spy(canvas, 'drawLine');

            canvas.activeLevel = new Level('level 01', {
                nodes: [],
                nodeColor: '#e34f00',
                lineColor: '#385171'
            });

            canvas.drawConnections({
                'position': {'x': 10, 'y': 10},
                'childs': [
                    {'position': {'x': 20, 'y': 20}},
                    {'position': {'x': 30, 'y': 30}},
                    {'position': {'x': 40, 'y': 40}}]
            });

            assert.isTrue(spy.calledThrice);
        });
    });

    suite('#drawText(parameters)', function () {
        test('should draw text', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            canvas.drawText({
                'node': {'position': {'x': 10, 'y': 10}},
                'text': 'hello',
                'size': 10,
                'color': '#385171'
            });

            assert.equal(canvas.context.font, '10px Arial');
            assert.equal(canvas.context.fillStyle, '#385171');
        });
    });

    suite('#drawCircle(parameters)', function () {
        test('should draw a circle', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            canvas.drawCircle({
                'node': {'position': {'x': 10, 'y': 10}},
                'size': 10,
                'color': '#385171'
            });

            assert.equal(canvas.context.fillStyle, '#385171');
        });
    });

    suite('#drawLine(parameters)', function () {
        test('should draw a line', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            canvas.drawLine({
                'from': {'position': {'x': 10, 'y': 10}},
                'to': {'position': {'x': 20, 'y': 20}},
                'size': 1,
                'color': '#385171'
            });

            assert.equal(canvas.context.lineWidth, 1);
            assert.equal(canvas.context.strokeStyle, '#385171');
        });
    });

});