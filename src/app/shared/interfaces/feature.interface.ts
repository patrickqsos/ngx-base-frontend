import { Observable } from "rxjs";

/**
 * Interface para los servicios creados por cada feature.
 * 
 * @export
 * @interface IFeature
 */
export interface IFeature{

    /**
     * Url base del feature
     * 
     * @type {string}
     * @memberof IFeatureService
     */
    urlFeature: string;

    /**
     * Método para crear un feature.
     * 
     * @returns {Observable<any>} 
     * @memberof IFeatureService
     */
    create(pEntidad: any): Observable<any>;
   
    /**
     * Método para actualizar un feature.
     * 
     * @returns {Observable<any>} 
     * @memberof IFeatureService
     */
    update(pEntidad: any): Observable<any>;
    
    /**
     * Método para eliminar un feature.
     * 
     * @returns {Observable<any>} 
     * @memberof IFeatureService
     */
    delete(pIdentificadores: Array<any>): Observable<any>;

    /**
     * Método para obtener un feature por su(s) identificador(es).
     * 
     * @returns {Observable<any>} 
     * @memberof IFeatureService
     */
    get(pIdentificadores: Array<any>): Observable<any>;

    /**
     * Método para obtener un listado de features.
     * 
     * @returns {Observable<any>} 
     * @memberof IFeatureService
     */
    getList(): Observable<any>;
}