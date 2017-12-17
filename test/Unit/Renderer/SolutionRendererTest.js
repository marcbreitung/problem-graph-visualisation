let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {SolutionRenderer} from './../../../lib/Renderer/SolutionRenderer';
import {Level} from "../../../lib/Level/Level";

suite('SolutionRenderer', function () {

    suite('#renderLevel(context, level)', function () {
        test('should call drawLine', function () {

            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            let level = new Level('level', {
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

            let solutionRenderer = new SolutionRenderer();

            let spyDrawLineTo = sinon.spy(solutionRenderer, 'drawLineTo');

            solutionRenderer.renderLevel(context, level);

            assert.isTrue(spyDrawLineTo.calledTwice);
        });
    });

});