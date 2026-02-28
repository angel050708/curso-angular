export class DestinoViaje {
    private selected: boolean = false;
    servicios: string[];
    id: string;

    constructor(public nombre: string, public imagenUrl: string) { 
        this.servicios = [ 'pileta', 'desayuno', 'wifi'];
        this.id = (new Date().getTime()).toString();
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s : boolean) {
        this.selected = s;
    }
}
    
    