import { TContext, TFlow, CallbackFunction, ActionPropertiesKeyword } from '../../types';
/**
 * @public
 * @param inCtx
 * @returns
 */
declare const _addAnswer: <P = any, B = any>(inCtx: TContext | TFlow<P, B>) => (answer: string | string[], options?: ActionPropertiesKeyword, cb?: CallbackFunction<P, B>, nested?: TFlow<P, any> | TFlow<P, any>[]) => TFlow<P, any>;
export { _addAnswer as addAnswer };
//# sourceMappingURL=addAnswer.d.ts.map