import { type Collection, type Db, MongoClient, type MongoServerError } from 'mongodb';
import { Handler } from '../models/handler.model.js';
import { injectable } from '../decorators/index.js';
import { container } from '../container.js';
import { ClassType } from '../keys.js';
import type { GenericModel } from '../types.js';
import { config } from '../config.js';

export const collections = {} as {
  handlers: Collection<Handler>;
};

@injectable
export class DBService {
  private readonly connectString: string;
  public dbInstance!: Db;

  constructor() {
    const host = config.get('dbConfig.host'),
      port = config.get('dbConfig.port'),
      name = config.get('dbConfig.name'),
      user = config.get('dbConfig.user'),
      password = config.get('dbConfig.password'),
      maxPoolSize = config.get('dbConfig.maxPoolSize');

    this.connectString = `mongodb://${user}:${password}@${host}:${port}/${name}?maxPoolSize=${maxPoolSize}&authSource=${name}`;
  }

  public async init() {
    // Connect to the database
    const client = new MongoClient(this.connectString);
    await client.connect();

    // Initialize the database instance
    this.dbInstance = client.db();

    // Apply schema validation
    await this.applySchemaValidations();

    // Initialize collections
    this.initCollections();
  }

  private initCollections() {
    collections.handlers = this.dbInstance.collection<Handler>(this.getCollName(Handler));
  }

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  private async applySchemaValidations() {
    const modelInstances = container.resolveAll<GenericModel>(ClassType.Model);

    for (const modelInstance of modelInstances) {
      if (!modelInstance.$jsonSchema) continue;

      await this.dbInstance.command({
        collMod: modelInstance.$collectionName,
        validator: modelInstance.$jsonSchema
      }).catch(async (error: MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
          await this.dbInstance.createCollection(modelInstance.$collectionName, { validator: modelInstance.$jsonSchema });
        } else {
          throw error;
        }
      });
    }
  }

  protected getCollName(model: GenericModel): string {
    return container.resolveModel<GenericModel>(model).$collectionName;
  }
}
