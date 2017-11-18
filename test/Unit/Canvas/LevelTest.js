let assert = require('chai').assert;

import {Level} from './../../../lib/Canvas/Level';

suite('Level', function () {

    suite('#constructor(name, parameters)', function () {
        test('should set name and nodes, nodeColor and lineColor attributes', function () {
            let level = new Level('level 01', {
                'nodes': [],
                'nodeColor': '#e34f00',
                'lineColor': '#385171',
                'textColor': '#444444'
            });
            assert.propertyVal(level, 'name', 'level 01');
            assert.deepPropertyVal(level, 'nodes', []);
            assert.propertyVal(level, 'nodeColor', '#e34f00');
            assert.propertyVal(level, 'lineColor', '#385171');
            assert.propertyVal(level, 'textColor', '#444444');
        });
    });

});