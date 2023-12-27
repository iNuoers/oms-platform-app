/*
 * @Author: Ben 550461173@qq.com
 * @Date: 2023-12-24 20:48:14
 * @LastEditors: Ben 550461173@qq.com
 * @LastEditTime: 2023-12-26 21:37:17
 * @FilePath: \oms-platform-app\src\utils\useDecorator.ts
 * @Description:
 */
/*
 * 给普通函数使用装饰器
 * @param func 需要装饰的函数
 * @param decoratorFunc 装饰器
 */
export function useDecorator(func: any, decoratorFunc: any) {
  const forkFunction = {
    value: func
  };
  decoratorFunc(func, func.name, forkFunction);
  func = forkFunction.value;
  return func;
}
/*
 * 给async函数使用装饰器
 * @param func 需要装饰的函数
 * @param decoratorFunc 装饰器
 */
export function useDecoratorAsync(asyncfunc: any, decoratorFunc: any) {
  const forkFunction = {
    value: asyncfunc
  };
  decoratorFunc(asyncfunc, asyncfunc.name, forkFunction);

  const newFunc = async (...args: any[]) => {
    // eslint-disable-next-line no-invalid-this
    return await forkFunction.value.apply(this, args);
  };
  asyncfunc = newFunc;
  return asyncfunc;
}
