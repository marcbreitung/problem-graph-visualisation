let assert = require('chai').assert;
let sinon = require('sinon');
let jsdom = require('jsdom');

let {JSDOM} = jsdom;

import {TextRenderer} from './../../../lib/Renderer/TextRenderer';
import {Layer} from "../../../lib/Layer/Layer";

suite('TextRenderer', function () {

    suite('#renderLevel(context, level)', function () {
        test('should call drawText', function () {

            let dom = (new JSDOM(`<body><canvas id="search-map"></canvas></body>`));
            let searchMap = dom.window.document.getElementById('search-map');
            let context = searchMap.getContext('2d');

            let layer = new Layer('layer', {
                'nodes': [{
                    'label': 'A',
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }, {
                    'label': 'B',
                    'position': {'x': 10, 'y': 10},
                    'childs': [{'position': {'x': 40, 'y': 40}}]
                }],
                'nodeColor': '#e34f00',
                'lineColor': '#385171'
            });

            let textRenderer = new TextRenderer();

            let spyDrawCircle = sinon.spy(textRenderer, 'drawCircle');
            let spyDrawText = sinon.spy(textRenderer, 'drawText');

            textRenderer.renderLayer(context, layer);

            assert.isTrue(spyDrawCircle.calledTwice);
            assert.isTrue(spyDrawText.calledTwice);
        });

        test('should not render text if the label is empty', function () {
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

            let textRenderer = new TextRenderer();

            let spyDrawCircle = sinon.spy(textRenderer, 'drawCircle');
            let spyDrawText = sinon.spy(textRenderer, 'drawText');

            textRenderer.renderLayer(context, layer);

            assert.isTrue(spyDrawCircle.calledTwice);
            assert.isTrue(spyDrawText.notCalled);
        });

    });

});