import { StateException } from './exceptions.js';
import { ClassType } from './keys.js';
import type { Constructor, HydratedModel } from './types.js';

class Container {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private instances = new Map<ClassType, Map<Constructor<any>, any>>([
    [ClassType.Service, new Map()],
    [ClassType.Model, new Map()]
  ]);

  public register<T>(classIdentifier: Constructor<T>, instance: T, type: ClassType): void {
    const classMap = this.getClassMap(type);
    classMap.set(classIdentifier, instance);
  }

  public resolve<T>(classIdentifier: Constructor<T>, type: ClassType): T {
    const classMap = this.getClassMap(type);

    const instance = classMap.get(classIdentifier);
    if (!instance) {
      throw new StateException(`Class instance is not registered: ${classIdentifier.name}`);
    }
    return instance;
  }

  public resolveModel<T>(classIdentifier: Constructor<T>): HydratedModel<T> {
    return <HydratedModel<T>>this.resolve(classIdentifier, ClassType.Model);
  }

  resolveAll<T>(type: ClassType): T[] {
    const classMap = this.getClassMap(type);
    return [...classMap.values()];
  }

  private getClassMap(type: ClassType) {
    const classMap = this.instances.get(type);
    if (!classMap) {
      throw new StateException(`Invalid class type: ${type}`);
    }
    return classMap;
  }
}

export const container = new Container();
