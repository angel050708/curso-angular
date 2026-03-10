import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appEspiame]',
  standalone: true
})
export class Espiame implements OnInit, OnDestroy {

  static nextId = 0;

  log = (msg: string) => console.log(`Evento #${Espiame.nextId++} ${msg}`);

  ngOnInit() { this.log('######## onInit'); }

  ngOnDestroy() { this.log('######## onDestroy'); }

}
