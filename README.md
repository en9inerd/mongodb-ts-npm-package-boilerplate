# NPM Package Boilerplate with TypeScript and MongoDB

This is a simple boilerplate for creating a Node.js package with TypeScript and MongoDB. It can be used as a starting point for creating a new express.js application, or CLI tool, or bot, or library, or any other Node.js package.
It's based on the official [MongoDB and TypeScript sample project](https://github.com/mongodb-developer/mongodb-typescript-example/tree/finish) and [TypeScript Integration With MongoDB Guide](https://www.mongodb.com/compatibility/using-typescript-with-mongodb-tutorial).

## Pre-requisites

- Node.js 20 or later

## Features

- Property Dependency Injection
- MongoDB Models Abstraction
- Configuration Based on JavaScript Modules
- GitHub Actions Workflow for Building and Publishing to npm
- ESM (ECMAScript Modules) Only
- ES2022 Target
- Preconfigured ESLint

## Usage

### Dependency Injection

> Be aware that wrong order of declaration of injectable classes can lead to runtime errors, so be careful with export statements order in index.ts files if you use them.

This boilerplate includes a simple Property Dependency Injection (PDI) based on TypeScript 5.0 decorators, specifically the Phase 3 decorator proposal. This feature enables seamless dependency management by allowing you to inject services directly into class properties using decorators.

The `inject` and `injectable` decorators play a key role in facilitating Property Dependency Injection.

#### `@inject<T>(serviceIdentifier: Constructor<T>)`

This decorator is used to inject a specific service into a class property. It takes a service identifier, which is the constructor of the service to be injected. For example:

```typescript
import { inject } from '../decorators/inject.decorator.js';

class MyClass {
  @inject(MyService)
  private myService!: MyService;
}
```

In this example, `MyService` is injected into the `myService` property of `MyClass`. The decorator also ensures that the injection only happens for class fields.

#### `@injectable<Class extends Constructor<any>>`

This decorator is used to mark a class as injectable, allowing it to be registered in the dependency injection container. It ensures that instances of the class can be resolved and injected into other classes.

```typescript
import { injectable } from '../decorators/injectable.decorator.js';

@injectable
class MyService {
  // ... class implementation
}
```

Here, `MyService` is marked as injectable, allowing instances of this class to be injected into other classes using the `@inject` decorator.

The dependency injection container, represented by the Container class, manages the registration and resolution of instances. It is an integral part of the Property Dependency Injection.

---

### Config Service

The `ConfigService` is a utility class designed to handle configuration loading and provide easy access to configuration values within your Node.js application. It allows you to organize and manage different configuration files based on the environment and provides a centralized way to access configuration properties that can be nested and deeply structured.

#### Configuration Files

The configuration files are organized in the `config` directory. The default configuration is stored in `default.js`, and environment-specific configurations can be added based on the `NODE_ENV` environment variable, such as `development.js`, `production.js`, etc.

Example: [config/default.js](./config/default.js)

#### Accessing Configuration Values

You can retrieve configuration values using the `get` method of the `ConfigService`. Specify the key as a dot-separated string to access nested properties.

```typescript
import { config } from '../config.js';

const databaseHost = config.get('dbConfig.host');
const handlersCollection = config.get('dbConfig.collections.handlers', 'defaultHandlers');
```

If the specified key is not found in the configuration, an optional default value can be provided. If no default value is provided and the key is not found, a `ConfigException` will be thrown.

---

### Database Service

The `DBService` class in this package provides a convenient way to interact with MongoDB, handling connection, initialization, and schema validation. Follow the steps below to effectively use the Database Service in your Node.js application.

#### Adding Models and Collections

The model decorator simplifies the process of defining MongoDB models with schema validation.

```typescript
import { model } from '../decorators/model.decorator.js';

@model({
  collectionName: 'handlers',
  jsonSchema: /* Your JSON schema for the model */,
})
export class Handler {
  /* Define your model properties here */
}
```

To add a collection that is associated with a model, update the `collections` and `initCollections` in the `DBService` class as follows:

```typescript
export const collections = {} as {
  handlers: Collection<Handler>;
  /* Add your collections here */
};

class DBService {
  /* ... */
  private initCollections() {
    collections.handlers = this.dbInstance.collection<Handler>(this.getCollName(Handler));
    /* Add your collections here */
  }
  /* ... */
}
```

> `handler.model.ts` and `handler.service.ts` that provided together with this boilerplate are examples of how to use the `model` decorator and `DBService` class.
