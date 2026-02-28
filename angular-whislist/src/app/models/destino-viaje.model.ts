export class DestinoViaje {
    private selected: boolean = false;
    servicios: string[];
    id: string;

    constructor(public nombre: string, public imagenUrl: string, public votes: number) { 
        this.servicios = [ 'pileta', 'desayuno', 'wifi'];
        this.id = (new Date().getTime()).toString();
    }
    isSelected(): boolean {
        return this.selected;
    }
    setSelected(s : boolean) {
        this.selected = s;
    }


    voteup(){
        this.votes++;
    }
    votedown(){
        this.votes--;
    }
}
    
    