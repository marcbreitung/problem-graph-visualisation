let assert = require('chai').assert;

import {RendererFabric} from './../../../lib/Renderer/RendererFabric';
import {NodesRenderer} from './../../../lib/Renderer/NodesRenderer';

suite('RenderFabric', function () {

    suite('#registerRenderer(type, Renderer)', function () {
        test('should add a new renderer', function () {
            let rendererFabric = new RendererFabric();
            rendererFabric.registerRenderer('node', NodesRenderer);
            assert.deepEqual(rendererFabric.types, {'node': NodesRenderer});
        });
        test('should not add a new renderer without renderLevel', function () {
            let rendererFabric = new RendererFabric();
            rendererFabric.registerRenderer('fabric', RendererFabric);
            assert.deepEqual(rendererFabric.types, {'node': NodesRenderer});
        });
    });

    suite('#getRenderer(type)', function () {
        test('should return a new renderer', function () {
            let nodesRenderer = new NodesRenderer();
            let rendererFabric = new RendererFabric();
            rendererFabric.registerRenderer('node', NodesRenderer);
            assert.deepEqual(rendererFabric.getRenderer('node'), nodesRenderer);
        });
        test('should return null if renderer not exists', function () {
            let nodesRenderer = new NodesRenderer();
            let rendererFabric = new RendererFabric();
            rendererFabric.registerRenderer('node', NodesRenderer);
            assert.equal(rendererFabric.getRenderer('text'), null);
        });
    });

});