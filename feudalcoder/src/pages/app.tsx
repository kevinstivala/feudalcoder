import { useState, useEffect } from 'react';
import { useActionStore } from "@/stores/action";
import { useGameStore } from "@/stores/game";
import { useStorageStore } from "@/stores/storage";
import { useSystemStore } from "@/stores/system";
import { initCache } from "@/renderers/render-cache";
import { renderWorldMap } from "@/renderers/map-renderer";
import CommandWindow from "@/components/command-window/command-window";
import ConstructionWindow from "@/components/construction-window/construction-window";
import DialogWindow from "@/components/dialog-window/dialog-window";
import GameCanvas from "@/components/game-canvas/game-canvas";
import HeaderMenu from "@/components/header-menu/header-menu";
import Notifications from "@/components/notifications/notifications";
import WorldMap from "@/components/world-map/world-map";
import { ActorType, Building } from "@/definitions/actors";

export default function YourNextJSComponent() {
    const storageStore = useStorageStore();
    const { hasSavedGame } = storageStore;
    const { dialog } = useSystemStore();
    const { hasSelection, selectedActors } = useActionStore();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function onGameLoad() {
            await initCache();
            await renderWorldMap(useGameStore().world);
            setLoading(false);
        }

        if (hasSavedGame) {
            storageStore.loadGame().then(onGameLoad);
        } else {
            useGameStore().init().then(onGameLoad);
        }
    }, [hasSavedGame]);

    return (
        <div className="rts">
            <HeaderMenu />
            {loading && <div>Loading...</div>}
            {!loading && (
                <>
                    <GameCanvas />
                    <div className="game-ui">
                        {hasSelection && selectedActors.every(({ type }) => type === ActorType.UNIT) && (
                            <CommandWindow />
                        )}
                        {hasSelection &&
                            selectedActors.every(
                                ({ type, subClass }) => type === ActorType.BUILDING && subClass === Building.CONSTRUCTION_YARD
                            ) && <ConstructionWindow />}
                        <WorldMap />
                    </div>
                </>
            )}
            <Notifications />
            {dialog && (
                <DialogWindow
                    type={dialog.type}
                    title={dialog.title}
                    message={dialog.message}
                    confirmHandler={dialog.confirm}
                    cancelHandler={dialog.cancel}
                />
            )}
        </div>
    );
}
