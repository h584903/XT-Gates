class taskModel {


    ID: number; /*ID til task*/
    prosjektID: number; /*ID på prosjekt en task tilhører*/
    gateID: number; /*NR på gate en task tilhører*/
    step: number; /*Tall brukt for å sortere internt i en gate. 3.1, 3.2 osv..*/
    title: String; /*Navn på task..*/
    responsiblePerson: String; /*Person som utfører en endring på tasken*/
    onTime: boolean; /*Må regnes ut hver gang*/
    progress: number; /*Desimal som representerer prosentandel (0.25,0.5 osv...)*/
    duration: number; /*Antall dager*/
    
    constructor(ID:number, prosjektID:number, gateID:number, step:number, title:String, responsiblePerson:String, onTime:boolean, progress:number, duration:number) {
        this.ID = ID;
        this.prosjektID = prosjektID;
        this.gateID = gateID;
        this.step = step;
        this.title = title;
        this.responsiblePerson = responsiblePerson;
        this.onTime = onTime;
        this.progress = progress;
        this.duration = duration;
    }
}
