class gateModel {

    ID: number; /*ID til gaten*/
    prosjektID: number; /*ID på prosjekt en gate tilhører*/
    gateID: number; /*NR på gaten*/
    gateTitle: String; /*tittel på gaten*/



    constructor(ID:number, prosjektID:number, gateID:number, gateTitle:String) {
        this.ID = ID;
        this.prosjektID = prosjektID;
        this.gateID = gateID;
        this.gateTitle = gateTitle;
    }


}
