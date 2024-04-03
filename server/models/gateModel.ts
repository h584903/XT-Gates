class gateModel {

    ID: number; /*ID til gaten*/
    prosjektID: number; /*ID på prosjekt en gate tilhører*/
    gateNR: number; /*NR på gaten*/
    gateTitle: String; /*tittel på gaten*/



    constructor(ID:number, prosjektID:number, gateNR:number, gateTitle:String) {
        this.ID = ID;
        this.prosjektID = prosjektID;
        this.gateNR = gateNR;
        this.gateTitle = gateTitle;
    }


}