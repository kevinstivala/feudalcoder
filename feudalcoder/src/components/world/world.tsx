import { useEffect, useRef } from 'react';
import { canvas } from 'zcanvas';
import { mapState } from 'pinia';
import { useWorldStore } from '../../stores/world';
import { TileDef } from '@/definitions/world-tiles';
import WorldRenderer from '@/renderers/world-renderer';

const MIN_AMOUNT_OF_TILES = 9; // minimum amount of tiles visible on the dominant axis of the screen
const renderer = new WorldRenderer();

export default function WorldCanvas() {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const { terrain } = useWorldStore(mapState(['terrain']));

    useEffect(() => {
        let zcanvas: any;

        const handleResize = () => {
            // Your resize logic here
        };

        const updateGame = () => {
            // Your game update logic here
        };

        const initCanvas = () => {
            zcanvas = new canvas({
                width: window.innerWidth,
                height: window.innerHeight,
                animate: true,
                smoothing: false,
                fps: 60,
                onUpdate: updateGame,
                backgroundColor: '#0000FF'
            });

            // Attach event handlers
            const resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
            window.addEventListener(resizeEvent, handleResize);

            zcanvas.insertInPage(canvasContainerRef.current);
            zcanvas.addChild(renderer);
        };

        const destroyCanvas = () => {
            const resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
            window.removeEventListener(resizeEvent, handleResize);

            zcanvas.dispose();
        };

        initCanvas();

        return () => {
            destroyCanvas();
        };
    }, []);

    useEffect(() => {
        renderer.setTerrain([...terrain]);
    }, [terrain]);

    return <div ref={canvasContainerRef} className="world-renderer" />;
}
