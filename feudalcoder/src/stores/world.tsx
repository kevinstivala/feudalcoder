import { defineStore } from "pinia";
import { TileDef, TileTypes } from "@/definitions/world-tiles";

interface State {
    terrain: TileDef[];
}

interface Getters {}

interface Actions {
    addObject: (obj: any) => void;
}

export const useWorldStore = defineStore({
    id: "world",
    state: (): State => ({
        terrain: [
            // 3 x 3 square of water
            { x: 0, y: 0, height: 1, type: TileTypes.WATER },
            { x: 1, y: 0, height: 1, type: TileTypes.WATER },
            { x: 2, y: 0, height: 1, type: TileTypes.WATER },
            { x: 0, y: 1, height: 1, type: TileTypes.WATER },
            { x: 1, y: 1, height: 1, type: TileTypes.WATER },
            { x: 2, y: 1, height: 1, type: TileTypes.WATER },
            { x: 0, y: 2, height: 1, type: TileTypes.WATER },
            { x: 1, y: 2, height: 1, type: TileTypes.WATER },
            { x: 2, y: 2, height: 1, type: TileTypes.WATER },

            // 1 x 3 strip of land
            { x: 0, y: 1, height: 1, type: TileTypes.GROUND },
            { x: 1, y: 1, height: 2, type: TileTypes.GROUND },
            { x: 2, y: 1, height: 1, type: TileTypes.GROUND },
        ]
    }),
    getters: {},
    actions: {
        addObject(obj: any): void {
            this.counter++;
        }
    }
});
