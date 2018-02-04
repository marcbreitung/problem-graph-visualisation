let assert = require('chai').assert;

import {Layer} from './../../../lib/Layer/Layer';

suite('Layer', function () {

    suite('#constructor(name, parameters)', function () {
        test('should set name and type, nodes, nodeColor, lineColor nodeSize and textSize to default values', function () {
            let layer = new Layer('level 01', {});
            assert.propertyVal(layer, 'type', null);
            assert.propertyVal(layer, 'sorting', 0);
            assert.deepPropertyVal(layer, 'nodes', []);
            assert.propertyVal(layer, 'nodeColor', '#000000');
            assert.propertyVal(layer, 'lineColor', '#000000');
            assert.propertyVal(layer, 'textColor', '#FFFFFF');
            assert.propertyVal(layer, 'nodeSize', 10);
            assert.propertyVal(layer, 'textSize', 12);
            assert.propertyVal(layer, 'lineSize', 1);
        });
        test('should set name and type, nodes, nodeColor, lineColor nodeSize and textSize attributes', function () {
            let layer = new Layer('level 01', {
                'type': 'nodes',
                'sorting': 10,
                'nodes': [],
                'nodeColor': '#e34f00',
                'lineColor': '#385171',
                'textColor': '#444444',
                'nodeSize': 5,
                'textSize': 12,
                'lineSize': 2
            });
            assert.propertyVal(layer, 'type', 'nodes');
            assert.propertyVal(layer, 'sorting', 10);
            assert.propertyVal(layer, 'name', 'level 01');
            assert.deepPropertyVal(layer, 'nodes', []);
            assert.propertyVal(layer, 'nodeColor', '#e34f00');
            assert.propertyVal(layer, 'lineColor', '#385171');
            assert.propertyVal(layer, 'textColor', '#444444');
            assert.propertyVal(layer, 'nodeSize', 5);
            assert.propertyVal(layer, 'textSize', 12);
            assert.propertyVal(layer, 'lineSize', 2);
        });
    });

});