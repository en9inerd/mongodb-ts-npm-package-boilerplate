import { DecoratorException } from '../exceptions.js';
import { ClassType } from '../keys.js';
import { container } from '../container.js';
import { Constructor } from '../types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function injectable<Class extends Constructor<any>>(
  target: Class,
  context: ClassDecoratorContext<Class>
) {
  if (context.kind !== 'class') {
    throw new DecoratorException(`'injectable' can only decorate classes not: ${context.kind}`);
  }

  container.register(target, new target(), ClassType.Service);
}
