import React from 'react';
import { sprite } from 'zcanvas';
import { TileDef, TileTypes, TILE_SIZE } from '@/definitions/world-tiles';
import CACHE from './render-cache';

const { TILES } = CACHE;

interface WorldRendererProps {
    terrain: TileDef[];
}

interface Position {
    x: number;
    y: number;
}

class WorldRenderer extends sprite {
    terrain: TileDef[];
    pos: Position;

    constructor(props: WorldRendererProps) {
        super();
        this.terrain = props.terrain;
        this.pos = { x: 0, y: 0 };
    }

    setTerrain(terrain: TileDef[]) {
        this.terrain = terrain;
        this.pos = { x: 0, y: 0 };
    }

    handleInteraction(x: number, y: number, event: any) {
        this.pos.x = x;
        this.pos.y = y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        const MARGIN = 5;
        for (let i = 0, l = this.terrain.length; i < l; ++i) {
            const { x, y, height, type } = this.terrain[i];
            let spriteX = 0;
            switch (type) {
                case TileTypes.WATER:
                    spriteX = 384;
                    break;
                case TileTypes.GROUND:
                    spriteX = 128;
                    break;
            }
            let hover = false;
            if (
                this.pos.x > x * TILE_SIZE &&
                this.pos.x < (x + 1) * TILE_SIZE &&
                this.pos.y > y * TILE_SIZE &&
                this.pos.y < (y + 1) * TILE_SIZE
            ) {
                hover = true;
            }
            ctx.globalAlpha = hover ? 0.5 : 1;
            ctx.drawImage(
                TILES,
                spriteX,
                0,
                128,
                127,
                x * TILE_SIZE + x * MARGIN,
                y * TILE_SIZE + y * MARGIN,
                TILE_SIZE,
                TILE_SIZE
            );
            // ctx.fillRect(x * TILE_SIZE + x * MARGIN, y * TILE_SIZE + y * MARGIN, TILE_SIZE, TILE_SIZE);
        }
    }
}

const MyComponent: React.FC<WorldRendererProps> = ({ terrain }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const renderer = new WorldRenderer({ terrain });
        renderer.draw(ctx);
    }, [terrain]);

    return <canvas ref={canvasRef} />;
};

export default MyComponent;
