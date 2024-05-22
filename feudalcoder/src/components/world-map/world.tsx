import { useEffect, useRef } from 'react';
import { Canvas } from 'zcanvas';
import { useWorldStore } from '../../stores/world';
import WorldRenderer from '../../renderers/world-render';
import { TileDef } from '@/definitions/world-tiles';

const MIN_AMOUNT_OF_TILES = 9; // minimum amount of tiles visible on the dominant axis of the screen
const renderer = new WorldRenderer();
let zcanvas: any, terrain: TileDef[];

const WorldPage = () => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const terrain = useWorldStore((state) => state.terrain);

    useEffect(() => {
        zcanvas = new Canvas({
            width: window.innerWidth,
            height: window.innerHeight,
            animate: true,
            smoothing: false,
            fps: 60,
            backgroundColor: '#0000FF',
            onUpdate: updateGame
        });

        const resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        const handleResize = () => {
            const tileWidth = 20;
            const tileHeight = 20;
            const { clientWidth, clientHeight } = document.documentElement;
            let tilesInWidth, tilesInHeight;
            if (clientWidth > clientHeight) {
                tilesInHeight = tileHeight * MIN_AMOUNT_OF_TILES;
                tilesInWidth = Math.round((clientWidth / clientHeight) * tilesInHeight);
            } else {
                tilesInWidth = tileWidth * MIN_AMOUNT_OF_TILES;
                tilesInHeight = Math.round((clientHeight / clientWidth) * tilesInWidth);
            }
            zcanvas.setDimensions(tilesInWidth, tilesInHeight);
            zcanvas.scale(clientWidth / tilesInWidth, clientHeight / tilesInHeight);
        };

        window.addEventListener(resizeEvent, handleResize);
        zcanvas.insertInPage(canvasContainerRef.current);
        zcanvas.addChild(renderer);

        return () => {
            window.removeEventListener(resizeEvent, handleResize);
            zcanvas.dispose();
        };
    }, []);

    useEffect(() => {
        renderer.setTerrain([...terrain]);
    }, [terrain]);

    const updateGame = () => {
        // Any game logic or update routines can be added here
    };

    return (
        <div ref={canvasContainerRef} className="world-renderer"></div>
    );
};

export default WorldPage;
