/// <reference path="jquery.observable.d.ts" />

interface ModificatorDescription {
    [modName: string]: (modName?: string, modVal?: string) => void;
    [modName: string]: {
        [modVal: string]: (modName?: string, modVal?: string) => void;
    };
}

interface BlockParams {
    [param: string]: any;
}

interface CommunicationChannel extends Observable {

}

interface BemEvent extends JQueryEventObject {
    data: {
        domElem: JQuery;
    };
}

interface FindBlockDescription {
    block: string;
    modName: string;
    modVal: string;
}

interface BlockDescription {
    onSetMod?: ModificatorDescription;
}

interface StaticBlockDescription {
    live? (): void;
}

interface BlockDeclaration {
    block?: string;
    name?: string;
    baseBlock?: string;
    modName?: string;
    modVal?: string;
}

interface BemStatic {
    blocks: BemBlock[];

    decl(blockName: string, props?: BlockDescription, staticProps?: StaticBlockDescription): BemBlock;
    decl(blockName: BlockDeclaration, props?: BlockDescription, staticProps?: StaticBlockDescription): BemBlock;

    create(block: string, params: BlockParams): BemBlock;
    create(block: BlockDeclaration, params: BlockParams): BemBlock;

    getName(): string;

    afterCurrentEvent(fn: (...params: any[]) => any, ctx?: any);

    changeThis(fn: (...params: any[]) => any, ctx?: any);

    del(obj?: any): BemBlock;

    channel(id?: string, drop?: bool): CommunicationChannel;

    DOM: BemDomStatic;
}

interface BemDomStatic {
    decl(blockName: string, props?: BlockDescription, staticProps?: StaticBlockDescription): DomBlock;
};

declare var BEM: BemStatic;

declare class BemBlock implements Observable {
    // observable
    buildEventName(e: string): string;
    on(event: string, data: any, fn: (e:JQueryEventObject) => void, ctx?: any): Observable;
    on(event: string, fn: (e:JQueryEventObject) => void, ctx?: any): Observable;
    onFirst(evnet: string, data?: any, fn?: (e: JQueryEventObject) => void , ctx?: any): Observable;
    un(event?: string, fn?: (e: JQueryEventObject) => void , ctx?: any): Observable;

    trigger(e: string, data?: any): Observable;

    // bem
    changeThis(fn: (...params: any[]) => any, ctx?: any);
    afterCurrentEvent(fn: (...params: any[]) => any, ctx?: any);

    trigger(event: string, data?: any): BemBlock;

    hasMod(modName: string, modVal?: string): bool;
    hasMod(elem: string, modName: string, modVal?: string): bool;
    hasMod(elem: JQuery, modName: string, modVal?: string): bool;

    getMod(elem: string, modName: string): string;
    getMod(elem: JQuery, modName: string): string;
    getMod(modName: string): string;

    getMods(): { [modName: string]: string; };
    getMods(elem: string): { [modName: string]: string; };
    getMods(elem: JQuery): { [modName: string]: string; };

    setMod(modName: string, modVal: string): BemBlock;
    setMod(elem: string, modName: string, modVal: string): BemBlock;
    setMod(elem: JQuery, modName: string, modVal: string): BemBlock;

    toggleMod(modName: string, modVal1: string, modVal2?: string, condition?: bool): BemBlock;
    toggleMod(elem: string, modName: string, modVal1: string, modVal2?: string, condition?: bool): BemBlock;
    toggleMod(elem: JQuery, modName: string, modVal1: string, modVal2?: string, condition?: bool): BemBlock;

    delMod(modName: string): BemBlock;
    delMod(elem: string, modName: string): BemBlock;
    delMod(elem: JQuery, modName: string): BemBlock;

    mod(modName: string, modVal?: string): BemBlock;
    mod(elem: string, modName: string, modVal?: string): BemBlock;
    mod(elem: JQuery, modName: string, modVal?: string): BemBlock;

    channel(id?: string, drop?: bool): CommunicationChannel;

    getDefaultParams(): BlockParams;

    del(obj?: any): BemBlock;
    
    onSetMod(): any;
    params: BlockParams;
};

declare class DomBlock extends BemBlock {
    trigger(event: string, data?: any): DomBlock;

    setMod(modName: string, modVal: string): DomBlock;
    setMod(elem: string, modName: string, modVal: string): DomBlock;
    setMod(elem: JQuery, modName: string, modVal: string): DomBlock;

    toggleMod(modName: string, modVal1: string, modVal2?: string, condition?: bool): DomBlock;
    toggleMod(elem: string, modName: string, modVal1: string, modVal2?: string, condition?: bool): DomBlock;
    toggleMod(elem: JQuery, modName: string, modVal1: string, modVal2?: string, condition?: bool): DomBlock;

    delMod(modName: string): DomBlock;
    delMod(elem: string, modName: string): DomBlock;
    delMod(elem: JQuery, modName: string): DomBlock;

    mod(modName: string, modVal?: string): DomBlock;
    mod(elem: string, modName: string, modVal?: string): DomBlock;
    mod(elem: JQuery, modName: string, modVal?: string): DomBlock;

    domElem: JQuery;

    findBlocksInside(block: string): DomBlock[];
    findBlocksInside(block: FindBlockDescription): DomBlock[];
    findBlocksInside(elem: string, block: string): DomBlock[];
    findBlocksInside(elem: JQuery, block: FindBlockDescription): DomBlock[];

    findBlockInside(block: string): DomBlock;
    findBlockInside(block: FindBlockDescription): DomBlock;
    findBlockInside(elem: string, block: string): DomBlock;
    findBlockInside(elem: JQuery, block: FindBlockDescription): DomBlock;

    findBlocksOutside(block: string): DomBlock[];
    findBlocksOutside(block: FindBlockDescription): DomBlock[];
    findBlocksOutside(elem: string, block: string): DomBlock[];
    findBlocksOutside(elem: JQuery, block: FindBlockDescription): DomBlock[];

    findBlockOutside(block: string): DomBlock;
    findBlockOutside(block: FindBlockDescription): DomBlock;
    findBlockOutside(elem: string, block: string): DomBlock;
    findBlockOutside(elem: JQuery, block: FindBlockDescription): DomBlock;

    findBlocksOn(block: string): DomBlock[];
    findBlocksOn(block: FindBlockDescription): DomBlock[];
    findBlocksOn(elem: string, block: string): DomBlock[];
    findBlocksOn(elem: JQuery, block: FindBlockDescription): DomBlock[];

    findBlockOn(block: string): DomBlock;
    findBlockOn(block: FindBlockDescription): DomBlock;
    findBlockOn(elem: string, block: string): DomBlock;
    findBlockOn(elem: JQuery, block: FindBlockDescription): DomBlock;

    bindToDomElem(domElem: JQuery, event: string, fn: (e: BemEvent) => any): DomBlock;
    bindToDomElem(domElem: JQuery, events: { [event: string]: (e: BemEvent) => any; }): DomBlock;

    bindToDoc(event: string, fn: (e: BemEvent) => any): DomBlock;
    bindToWin(event: string, fn: (e: BemEvent) => any): DomBlock;

    bindTo(elem: string, event: string, fn: (e: BemEvent) => any): DomBlock;
    bindTo(elem: JQuery, event: string, fn: (e: BemEvent) => any): DomBlock;

    unbindFromDomElem(domElem: JQuery, event: string): DomBlock;
    unbindFromDoc(event: string): DomBlock;
    unbindFromWin(event: string): DomBlock;

    unbindFrom(elem: string, event: string): DomBlock;
    unbindFrom(elem: JQuery, event: string): DomBlock;

    findElem(names: string, modName?: string, modVal?: string): JQuery;
    findElem(ctx: JQuery, names: string, modName?: string, modVal?: string): JQuery;

    elem(names: string, modName?: string, modVal?: string): JQuery;

    dropElemCache(names: string, modName?: string, modVal?: string): DomBlock;

    elemParams(elem: string): BlockParams;
    elemParams(elem: JQuery): BlockParams;

    containsDomElem(elem: JQuery): bool;

    buildSelector(elem?: string, modName?: string, modVal?: string): string;

    destruct(keepDom?: bool): void;
}