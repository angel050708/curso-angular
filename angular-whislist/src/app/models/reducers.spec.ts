/**
 * Tests unitarios para los reducers de Redux (NgRx).
 * Los reducers son funciones puras: reciben (state, action) → retornan un nuevo estado.
 */
import {
  reducerDestinosViajes,
  initializeDestinosViajesState,
  DestinosViajesState,
  NuevoDestinoAction,
  ElegidoFavoritoAction,
  VoteUpAction,
  VoteDownAction,
  DestinosLoadedAction,
  InitDestinosFromDbAction
} from './destinos-viajes-state.models';
import {
  reducerTracking,
  initializeTrackingState,
  TrackingState,
  TrackClickAction
} from './tracking-state.models';
import { DestinoViaje } from './destino-viaje.model';

// ═══════════════════════════════════════════════════════
// TESTS PARA: reducerDestinosViajes
// ═══════════════════════════════════════════════════════
describe('reducerDestinosViajes', () => {
  let initialState: DestinosViajesState;

  beforeEach(() => {
    initialState = initializeDestinosViajesState();
  });

  it('debe retornar el estado inicial por defecto', () => {
    const state = reducerDestinosViajes(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initializeDestinosViajesState());
    expect(state.items).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.favorito).toBeNull();
  });

  it('debe agregar un nuevo destino con NuevoDestinoAction', () => {
    const destino = new DestinoViaje('Buenos Aires', 'img.jpg', 0);
    const action = new NuevoDestinoAction(destino);

    const newState = reducerDestinosViajes(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].nombre).toBe('Buenos Aires');
    // Verifica que NO muta el estado original
    expect(initialState.items.length).toBe(0);
  });

  it('debe marcar un destino como favorito con ElegidoFavoritoAction', () => {
    const destino = new DestinoViaje('Córdoba', 'img.jpg', 0);
    const stateConDestino = reducerDestinosViajes(initialState, new NuevoDestinoAction(destino));
    const action = new ElegidoFavoritoAction(destino);

    const newState = reducerDestinosViajes(stateConDestino, action);

    expect(newState.favorito).toBe(destino);
    expect(newState.favorito!.isSelected()).toBe(true);
  });

  it('debe incrementar votos con VoteUpAction', () => {
    const destino = new DestinoViaje('Mendoza', 'img.jpg', 5);
    const stateConDestino = reducerDestinosViajes(initialState, new NuevoDestinoAction(destino));
    const action = new VoteUpAction(destino);

    const newState = reducerDestinosViajes(stateConDestino, action);

    expect(newState.items[0].votes).toBe(6);
  });

  it('debe decrementar votos con VoteDownAction', () => {
    const destino = new DestinoViaje('Bariloche', 'img.jpg', 3);
    const stateConDestino = reducerDestinosViajes(initialState, new NuevoDestinoAction(destino));
    const action = new VoteDownAction(destino);

    const newState = reducerDestinosViajes(stateConDestino, action);

    expect(newState.items[0].votes).toBe(2);
  });

  it('debe cargar destinos con DestinosLoadedAction', () => {
    const destinos = [
      new DestinoViaje('Paris', 'p.jpg', 10),
      new DestinoViaje('Roma', 'r.jpg', 8)
    ];
    const action = new DestinosLoadedAction(destinos);

    const newState = reducerDestinosViajes(initialState, action);

    expect(newState.items.length).toBe(2);
    expect(newState.items[0].nombre).toBe('Paris');
    expect(newState.items[1].nombre).toBe('Roma');
    expect(newState.loading).toBe(false);
  });

  it('debe inicializar destinos desde DB con InitDestinosFromDbAction', () => {
    const destinos = [new DestinoViaje('Tokio', 't.jpg', 15)];
    const action = new InitDestinosFromDbAction(destinos);

    const newState = reducerDestinosViajes(initialState, action);

    expect(newState.items.length).toBe(1);
    expect(newState.items[0].nombre).toBe('Tokio');
    expect(newState.loading).toBe(false);
  });

  it('debe retornar el mismo estado para una acción desconocida', () => {
    const state = reducerDestinosViajes(initialState, { type: 'ACCION_INEXISTENTE' });
    expect(state).toBe(initialState);
  });
});

// ═══════════════════════════════════════════════════════
// TESTS PARA: reducerTracking
// ═══════════════════════════════════════════════════════
describe('reducerTracking', () => {
  let initialState: TrackingState;

  beforeEach(() => {
    initialState = initializeTrackingState();
  });

  it('debe retornar el estado inicial por defecto', () => {
    const state = reducerTracking(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual(initializeTrackingState());
    expect(state.tags).toEqual({});
  });

  it('debe registrar un primer clic para un tag nuevo', () => {
    const action = new TrackClickAction('boton-ir');

    const newState = reducerTracking(initialState, action);

    expect(newState.tags['boton-ir']).toBe(1);
    // No muta el estado original
    expect(initialState.tags['boton-ir']).toBeUndefined();
  });

  it('debe incrementar la cuenta de un tag existente', () => {
    const state1 = reducerTracking(initialState, new TrackClickAction('voto-positivo'));
    const state2 = reducerTracking(state1, new TrackClickAction('voto-positivo'));
    const state3 = reducerTracking(state2, new TrackClickAction('voto-positivo'));

    expect(state3.tags['voto-positivo']).toBe(3);
  });

  it('debe mantener tags independientes para distintos tags', () => {
    let state = reducerTracking(initialState, new TrackClickAction('nav-home'));
    state = reducerTracking(state, new TrackClickAction('nav-destino'));
    state = reducerTracking(state, new TrackClickAction('nav-home'));

    expect(state.tags['nav-home']).toBe(2);
    expect(state.tags['nav-destino']).toBe(1);
  });

  it('debe retornar el mismo estado para una acción desconocida', () => {
    const state = reducerTracking(initialState, { type: 'ACCION_INEXISTENTE' });
    expect(state).toBe(initialState);
  });

  it('no debe mutar el estado original al agregar un tag', () => {
    const original = { tags: { 'boton-ir': 5 } };
    const newState = reducerTracking(original, new TrackClickAction('boton-ir'));

    expect(newState.tags['boton-ir']).toBe(6);
    expect(original.tags['boton-ir']).toBe(5);
    expect(newState).not.toBe(original);
  });
});
