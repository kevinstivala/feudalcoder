import { loader } from 'zcanvas';

const ASSET_FOLDER: string = './assets/sprites/';
const ASSETS: Record<string, string> = {
    TILES: 'tiles.png'
};

const CACHE: Record<string, HTMLImageElement> = {
    TILES: new Image()
};

export default CACHE;

export const initCache = async (): Promise<void> => {
    const entries = Object.entries(ASSETS);
    for (let i = 0; i < entries.length; ++i) {
        const [key, path] = entries[i];
        try {
            await loader.loadImage(`${ASSET_FOLDER}${path}`, CACHE[key]);
        } catch (e) {
            console.error(`Error loading image ${path}`, e);
        }
    }
};
