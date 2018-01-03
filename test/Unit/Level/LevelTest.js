let assert = require('chai').assert;

import {Level} from './../../../lib/Level/Level';

suite('Level', function () {

    suite('#constructor(name, parameters)', function () {
        test('should set name and type, nodes, nodeColor, lineColor nodeSize and textSize to default values', function () {
            let level = new Level('level 01', {});
            assert.propertyVal(level, 'type', null);
            assert.propertyVal(level, 'sorting', 0);
            assert.deepPropertyVal(level, 'nodes', []);
            assert.propertyVal(level, 'nodeColor', '#000000');
            assert.propertyVal(level, 'lineColor', '#000000');
            assert.propertyVal(level, 'textColor', '#FFFFFF');
            assert.propertyVal(level, 'nodeSize', 10);
            assert.propertyVal(level, 'textSize', 12);
            assert.propertyVal(level, 'lineSize', 1);
        });
        test('should set name and type, nodes, nodeColor, lineColor nodeSize and textSize attributes', function () {
            let level = new Level('level 01', {
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
            assert.propertyVal(level, 'type', 'nodes');
            assert.propertyVal(level, 'sorting', 10);
            assert.propertyVal(level, 'name', 'level 01');
            assert.deepPropertyVal(level, 'nodes', []);
            assert.propertyVal(level, 'nodeColor', '#e34f00');
            assert.propertyVal(level, 'lineColor', '#385171');
            assert.propertyVal(level, 'textColor', '#444444');
            assert.propertyVal(level, 'nodeSize', 5);
            assert.propertyVal(level, 'textSize', 12);
            assert.propertyVal(level, 'lineSize', 2);
        });
    });

});