let assert = require('chai').assert;

import {NullRenderer} from './../../../../lib/Renderer/NullRenderer';

suite('NullRenderer', function () {

    suite('#renderLevel(context, layer)', function () {
        test('should set context, layer', function () {
            let nullRenderer = new NullRenderer();
            nullRenderer.renderLayer('context', 'layer');
            assert.propertyVal(nullRenderer, 'context', 'context');
            assert.propertyVal(nullRenderer, 'layer', 'layer');
        });
    });

});