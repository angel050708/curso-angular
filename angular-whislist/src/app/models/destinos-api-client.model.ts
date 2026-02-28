import { DestinoViaje } from './destino-viaje.model';
import { BehaviorSubject, Subject } from 'rxjs';

export class DestinosApiClient {
  destinos: DestinoViaje[];
  current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null!);

  constructor() {
    this.destinos = [];
    this.current = new BehaviorSubject<DestinoViaje>(null!);
  }

  add(d: DestinoViaje) {
    this.destinos.push(d);
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  getById(id: string): DestinoViaje {
    return this.destinos.filter(function(d) { return d.id.toString() == id; })[0];
  }

  elegir(d: DestinoViaje) {
    this.destinos.forEach(x => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  subscribeOnChange(fn: (d: DestinoViaje) => void) {
    this.current.subscribe(fn);
  }


}
