import * as Y from 'yjs';
declare type Options = {
    transactionOrigin?: any;
};
export declare const bindProxyAndYMap: <T>(p: Record<string, T>, y: Y.Map<T>, opts?: Options) => void;
export declare const bindProxyAndYArray: <T>(p: T[], y: Y.Array<T>, opts?: Options) => void;
export {};
