let assert = require('chai').assert;

import {NullRenderer} from './../../../../lib/Renderer/NullRenderer';

suite('NullRenderer', function () {

    suite('#renderLevel(context, level)', function () {
        test('should set context, level', function () {
            let nullRenderer = new NullRenderer();
            nullRenderer.renderLevel('context', 'level');
            assert.propertyVal(nullRenderer, 'context', 'context');
            assert.propertyVal(nullRenderer, 'level', 'level');
        });
    });

});