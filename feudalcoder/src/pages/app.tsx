import { useEffect } from 'react';
import { initCache } from '@/renderers/render-cache';
import World from './components/world/world';

initCache();

const RTSPage = () => {
    useEffect(() => {
        // Equivalente al script setup en Vue.js
        // Puedes realizar inicializaciones aquí si es necesario
    }, []);

    return (
        <div className="rts">
            <World />
        </div>
    );
};

export default RTSPage;
