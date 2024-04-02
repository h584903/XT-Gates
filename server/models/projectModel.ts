class projectModel {

    ID: number; /*ProsjektID*/
    title: String; /*Tittel på prosjekt*/
    progress: number; /*Total progresjon på prosjektet, skrives som et desimal*/
    onTime: boolean; /*Boolean som styrer fargeknappen som indikerer prosjektets status*/
    PEM: String; /*Project Execution Manager for et prosjekt*/
    comment: String; /*Kommentar til prosjekt*/
    POdate: Date; /*Dag prosjektet er bestilt ferdig innen*/
    SFdate: Date; /*Dag prosjektet er planlagt ferdig*/


    constructor(ID:number, title:String, progress:number, onTime:boolean, PEM:String, comment:String, POdate:Date, SFdate:Date) {
        this.ID = ID;
        this.title = title;
        this.progress = progress;
        this.onTime = onTime;
        this.PEM = PEM;
        this.comment = comment;
        this.POdate = POdate;
        this.SFdate = SFdate;
    }

}