/// <reference path="jquery.d.ts" />

interface Observable {
    buildEventName(e: string): string;
    on(event: string, data: any, fn: (e:JQueryEventObject) => void, ctx?: any): Observable;
    on(event: string, fn: (e:JQueryEventObject) => void, ctx?: any): Observable;
    onFirst(evnet: string, data?: any, fn?: (e: JQueryEventObject) => void , ctx?: any): Observable;
    un(event?: string, fn?: (e: JQueryEventObject) => void , ctx?: any): Observable;

    trigger(e: string, data?: any): Observable;
}