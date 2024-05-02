import React, { useEffect } from 'react';
import { createPinia } from 'pinia';
import App from './App.vue';

export default function MyApp() {
    useEffect(() => {
        const pinia = createPinia();
        pinia.use(() => {
            // Here you can optionally install plugins or perform additional setup
        });

        // Ensure the pinia instance is available globally
        window.pinia = pinia;

        return () => {
            // Clean up any resources if needed
        };
    }, []);

    return <App />;
}
