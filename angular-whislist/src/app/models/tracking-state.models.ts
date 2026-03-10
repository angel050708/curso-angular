import { Action } from '@ngrx/store';

// ── ESTADO ──
export interface TrackingState {
  /** Mapa de tag → cantidad de clics */
  tags: { [tag: string]: number };
}

export const initializeTrackingState = (): TrackingState => ({
  tags: {}
});

// ── ACCIONES ──
export enum TrackingActionTypes {
  TRACK_CLICK = '[Tracking] Click'
}

export class TrackClickAction implements Action {
  readonly type = TrackingActionTypes.TRACK_CLICK;
  constructor(public tag: string) {}
}

export type TrackingActions = TrackClickAction;

// ── REDUCER ──
export function reducerTracking(
  state: TrackingState = initializeTrackingState(),
  action: Action
): TrackingState {
  switch (action.type) {
    case TrackingActionTypes.TRACK_CLICK: {
      const tag = (action as TrackClickAction).tag;
      return {
        ...state,
        tags: {
          ...state.tags,
          [tag]: (state.tags[tag] || 0) + 1
        }
      };
    }
  }
  return state;
}
