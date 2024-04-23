export type Dict<T = unknown> = Record<string, T>;

export type HydratedModel<T> = T & Required<ModelParams>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericModel = HydratedModel<any>;

export type ModelParams = {
  $collectionName?: string;
  $jsonSchema?: Dict;
};

export type ModelDecoratorParams = {
  collectionName?: string;
  jsonSchema?: Dict;
};

export type Handler = {
  name: string;
  command: string;
  type: string;
  event: {
    incoming?: boolean;
    outgoing?: boolean;
    chats?: string[];
    blacklistChats?: boolean;
    fromUsers?: string[];
    blacklistUsers?: string[];
    forwards?: boolean;
    pattern?: string | RegExp;
  };
};

