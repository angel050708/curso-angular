export class DestinoViaje {
    private selected: boolean = false;
    servicios: string[];
    constructor(public nombre: string, public imagenUrl: string) { 
        this.servicios = [ 'pileta', 'desayuno', 'wifi']; 
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s : boolean) {
        this.selected = s;
    }
}
    
    