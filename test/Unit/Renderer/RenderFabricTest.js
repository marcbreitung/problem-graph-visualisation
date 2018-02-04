let assert = require('chai').assert;

import {RendererFactory} from './../../../lib/Renderer/RendererFactory';
import {NodesRenderer} from './../../../lib/Renderer/NodesRenderer';
import {NullRenderer} from './../../../lib/Renderer/NullRenderer';

suite('RenderFabric', function () {

    suite('#registerRenderer(type, Renderer)', function () {
        test('should add a new renderer', function () {
            let rendererFactory = new RendererFactory();
            rendererFactory.registerRenderer('node', NodesRenderer);
            assert.deepEqual(rendererFactory.types, {'node': NodesRenderer});
        });
        test('should not add a new renderer without renderLevel', function () {
            let rendererFactory = new RendererFactory();
            rendererFactory.registerRenderer('node', NodesRenderer);
            rendererFactory.registerRenderer('fabric', RendererFactory);
            assert.deepEqual(rendererFactory.types, {'node': NodesRenderer});
        });
    });

    suite('#getRenderer(type)', function () {
        test('should return a new renderer', function () {
            let nodesRenderer = new NodesRenderer();
            let rendererFactory = new RendererFactory();
            rendererFactory.registerRenderer('node', NodesRenderer);
            assert.deepEqual(rendererFactory.getRenderer('node'), nodesRenderer);
        });
        test('should return NullRenderer if renderer not exists', function () {
            let nullRenderer = new NullRenderer();
            let rendererFactory = new RendererFactory();
            rendererFactory.registerRenderer('node', NodesRenderer);
            assert.deepEqual(rendererFactory.getRenderer('text'), nullRenderer);
        });
    });

});