let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {Circle} from './../../../../lib/Renderer/Elements/Circle';

suite('Circle', function () {

    suite('#draw(context, parameters)', function () {
        test('should draw a circle', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            Circle.draw(context, {
                'node': {'position': {'x': 10, 'y': 10}},
                'size': 10,
                'color': '#385171'
            });

            assert.equal(context.fillStyle, '#385171');
        });
    });

});