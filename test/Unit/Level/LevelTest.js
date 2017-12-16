let assert = require('chai').assert;

import {Level} from './../../../lib/Level/Level';

suite('Level', function () {

    suite('#constructor(name, parameters)', function () {
        test('should set name and type, nodes, nodeColor, lineColor circleSize and textSize attributes', function () {
            let level = new Level('level 01', {
                'type': 'nodes',
                'nodes': [],
                'nodeColor': '#e34f00',
                'lineColor': '#385171',
                'textColor': '#444444',
                'circleSize': 5,
                'textSize': 12
            });
            assert.propertyVal(level, 'type', 'nodes');
            assert.propertyVal(level, 'name', 'level 01');
            assert.deepPropertyVal(level, 'nodes', []);
            assert.propertyVal(level, 'nodeColor', '#e34f00');
            assert.propertyVal(level, 'lineColor', '#385171');
            assert.propertyVal(level, 'textColor', '#444444');
            assert.propertyVal(level, 'circleSize', 5);
            assert.propertyVal(level, 'textSize', 12);
        });
    });

});