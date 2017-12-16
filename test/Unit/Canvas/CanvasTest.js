let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {Canvas} from './../../../lib/Canvas/Canvas';
import {Level} from './../../../lib/Level/Level';

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

    suite('#removeLevelByName(name)', function () {
        test('should remove the level by names', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let level = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLevel(level);
            canvas.removeLevelByName('level 01');

            assert.sameDeepMembers(canvas.levels, []);
        });
        test('should not remove the level if no level with given name exists', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});
            let level = new Level('level 01', {nodes: [], nodeColor: '#e34f00', lineColor: '#385171'});

            canvas.addLevel(level);
            canvas.removeLevelByName('level 02');

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
            canvas.update();

            assert.isTrue(spy.calledTwice);
        });
    });

    suite('#renderLevel(level)', function () {
        test('should set active Level', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let canvas = new Canvas({element: searchMap, height: 100, width: 100});

            let spyLevel = sinon.spy(canvas, 'renderLevel');

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
            canvas.update();

            assert.isTrue(spyLevel.calledTwice);
        });
    });

});