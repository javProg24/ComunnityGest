import { Observable } from "rxjs";

export interface I_Metodos{
    get<T>(url:string):Observable<T[]>;
    add<T>(url:string,Entidad:any):Observable<T>;
    delete<T>(url:string, Entidad:any,id:number):Observable<T>;
    update<T>(url:string,Entidad:any,id:number):Observable<T>;
}