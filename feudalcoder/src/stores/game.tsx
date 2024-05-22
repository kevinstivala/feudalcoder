import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import GameFactory, { type Game } from "@/model/factories/game-factory";
import { renderWorldMap } from "@/renderers/map-renderer";
import { coordinateToIndex } from "@/utils/terrain-util";

type WorldDef = EnvironmentDef;
type ActorArray = Actor[];

export enum GameStates {
    IDLE,
    ACTIVE,
    GAME_OVER
};

type GameState = {
  world: WorldDef;
  created: number;
  gameState: GameStates;
  lastRender: number;
  gameTime: number;
  actors: ActorArray;
  effects: Effect[];
};

type GameAction =
  | { type: "GAME_INIT" }
  | { type: "GAME_SET_STATE"; payload: GameStates }
  | { type: "GAME_SET_GAME_TIME"; payload: number }
  | { type: "GAME_ADVANCE_GAME_TIME"; payload: number }
  | { type: "GAME_SET_LAST_RENDER"; payload: number }
  | { type: "GAME_ADD_ACTOR"; payload: Actor }
  | { type: "GAME_REMOVE_ACTOR"; payload: Actor }
  | { type: "GAME_SET_ACTOR_AI_ACTION"; payload: { actor: Actor; action: AiActions } }
  | { type: "GAME_ADD_EFFECT"; payload: Effect }
  | { type: "GAME_REMOVE_EFFECT"; payload: Effect }
  | { type: "GAME_REMOVE_EFFECTS_BY_ACTION"; payload: string | string[] }
  | { type: "GAME_REMOVE_EFFECTS_BY_CALLBACK"; payload: string | string[] }
  | { type: "GAME_REMOVE_EFFECTS_BY_TARGET"; payload: any }
  | { type: "GAME_REMOVE_EFFECTS_BY_TARGET_AND_ACTION"; payload: { target: any; actions?: string[] } }
  | { type: "GAME_RENDER" }
  | { type: "GAME_UPDATE_TILE"; payload: { x: number; y: number; newType: TileTypes } };

const initialState: GameState = {
  world: {} as WorldDef,
  created: 0,
  gameState: GameStates.ACTIVE,
  lastRender: 0,
  gameTime: 0,
  actors: [],
  effects: [],
};

const gameReducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case "GAME_INIT": {
      const game = GameFactory.create();
      return {
       ...state,
        world: game.world,
        created: game.created,
        gameTime: game.gameTime,
        actors: game.actors,
        effects: game.effects,
      };
    }
    case "GAME_SET_STATE": {
      return {...state, gameState: action.payload };
    }
    case "GAME_SET_GAME_TIME": {
      return {...state, gameTime: action.payload };
    }
    case "GAME_ADVANCE_GAME_TIME": {
      return {...state, gameTime: state.gameTime + action.payload };
    }
    case "GAME_SET_LAST_RENDER": {
      return {...state, lastRender: action.payload };
    }
    case "GAME_ADD_ACTOR": {
      const newActors = [...state.actors, action.payload];
      if (action.payload.type === ActorType.UNIT) {
        handleAI(action.payload);
      }
      return {...state, actors: newActors };
    }
    case "GAME_REMOVE_ACTOR": {
      return {
       ...state,
        actors: state.actors.filter((actor) => actor!== action.payload),
      };
    }
    case "GAME_SET_ACTOR_AI_ACTION": {
      const updatedActors = state.actors.map((actor) => {
        if (actor === action.payload.actor) {
          return {...actor, aiAction: action.payload.action };
        }
        return actor;
      });
      return {...state, actors: updatedActors };
    }
    case "GAME_ADD_EFFECT": {
      if (!state.effects.includes(action.payload)) {
        return {...state, effects: [...state.effects, action.payload] };
      }
      return state;
    }
    case "GAME_REMOVE_EFFECT": {
      const updatedEffects = state.effects.filter(
        (effect) => effect!== action.payload
      );
      return {...state, effects: updatedEffects };
    }
    case "GAME_REMOVE_EFFECTS_BY_ACTION": {
      const filteredEffects = state.effects.filter(
        ({ action }) =>!action.includes(action.payload as string)
      );
      return {...state, effects: filteredEffects };
    }
    case "GAME_REMOVE_EFFECTS_BY_CALLBACK": {
      const filteredEffects = state.effects.filter(
        ({ callback }) =>!callback.includes(action.payload as string)
      );
      return {...state, effects: filteredEffects };
    }
    case "GAME_REMOVE_EFFECTS_BY_TARGET": {
      const filteredEffects = state.effects.filter(
        ({ target })=> target!== action.payload
      );
      return {...state, effects: filteredEffects };
    }
    case "GAME_REMOVE_EFFECTS_BY_TARGET_AND_ACTION": {
      const filteredEffects = state.effects.filter(
        ({ target, action }) =>
          target!== action.payload ||
          (action.payload.actions &&
            !action.payload.actions.includes(action as string))
      );
      return {...state, effects: filteredEffects };
    }
    case "GAME_RENDER": {
      if (state.actors.length > 0) {
        renderWorldMap(
          state.world,
          state.actors,
          coordinateToIndex(state.actors[0].tile),
          state.effects
        );
      }
      return {...state };
    }
    case "GAME_UPDATE_TILE": {
      const { x, y, newType } = action.payload;
      return {...state, world: {...state.world,  [x]: { [y]: newType } }};
    }
    default:
      return state;
  }
};

const store = configureStore({
    game: gameReducer,
    middleware: [ThunkMiddleware],
  });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;