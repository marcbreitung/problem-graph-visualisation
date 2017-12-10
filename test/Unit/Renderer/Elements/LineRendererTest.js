let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {Line} from './../../../../lib/Renderer/Elements/Line';

suite('Line', function () {

    suite('#draw(context, parameters)', function () {
        test('should draw a line', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            Line.draw(context, {
                'from': {'position': {'x': 10, 'y': 10}},
                'to': {'position': {'x': 20, 'y': 20}},
                'size': 1,
                'color': '#385171'
            });

            assert.equal(context.lineWidth, 1);
            assert.equal(context.strokeStyle, '#385171');
        });
    });

});