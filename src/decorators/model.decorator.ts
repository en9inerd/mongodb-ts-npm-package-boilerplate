/* eslint-disable @typescript-eslint/no-explicit-any */
import { DecoratorException } from '../exceptions.js';
import { ClassType } from '../keys.js';
import { container } from '../container.js';
import type { Constructor, ModelDecoratorParams } from '../types.js';
import { addS } from '../utils.js';

// biome-ignore lint/suspicious/noExplicitAny:
export function model<Class extends Constructor<any>>(params?: ModelDecoratorParams) {
  return function (
    target: Class,
    context: ClassDecoratorContext<Class>
  ) {
    if (context.kind !== 'class') {
      throw new DecoratorException(`'model' can only decorate classes not: ${context.kind}`);
    }

    const instance = new target();
    Object.defineProperty(instance, '$collectionName', {
      value: params?.collectionName || addS(target.name),
      writable: false,
      configurable: false,
    });
    Object.defineProperty(instance, '$jsonSchema', {
      value: params?.jsonSchema || {},
      writable: false,
      configurable: false,
    });

    container.register(target, instance, ClassType.Model);
  };
}
