import { Injectable } from "@angular/core";

@Injectable()
export class MenuService{
    public menu='';

    setMenu(pMenu){
        this.menu = pMenu;
    }
}