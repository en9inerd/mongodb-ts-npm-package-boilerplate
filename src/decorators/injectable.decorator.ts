import { DecoratorException } from '../exceptions.js';
import { ClassType } from '../keys.js';
import { container } from '../container.js';
import type { Constructor } from '../types.js';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function injectable<Class extends Constructor<any>>(
  target: Class,
  context: ClassDecoratorContext<Class>
) {
  if (context.kind !== 'class') {
    throw new DecoratorException(`'injectable' can only decorate classes not: ${context.kind}`);
  }

  container.register(target, new target(), ClassType.Service);
}
