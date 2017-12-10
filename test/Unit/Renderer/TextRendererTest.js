let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {TextRenderer} from './../../../lib/Renderer/TextRenderer';

suite('TextRenderer', function () {

    suite('#draw(context, parameters)', function () {
        test('should draw text', function () {
            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            TextRenderer.draw(context, {
                'node': {'position': {'x': 10, 'y': 10}},
                'text': 'hello',
                'size': 10,
                'color': '#385171'
            });

            assert.equal(context.font, '10px Arial');
            assert.equal(context.fillStyle, '#385171');
        });
    });

});