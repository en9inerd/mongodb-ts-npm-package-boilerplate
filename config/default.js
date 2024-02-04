// https://nodejs.org/api/esm.html#import-attributes
import packageJson from '../package.json' with { type: 'json' };

const version = packageJson.version;

export default {
    dbConfig: {
        host: process.env.MONGO_DB_HOST || 'localhost',
        name: process.env.MONGO_INITDB_DATABASE,
        port: process.env.MONGO_DB_PORT || 27017,
        user: process.env.MONGO_DB_USERNAME,
        password: process.env.MONGO_DB_PASSWORD,
        maxPoolSize: process.env.MONGO_DB_MAX_POOL_SIZE || 10,
        collections: {
            handlers: process.env.HANDLERS_COLLECTION_NAME || 'handlers',
        }
    },
    version,
};
