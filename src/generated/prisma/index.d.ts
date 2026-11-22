
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lab
 * 
 */
export type Lab = $Result.DefaultSelection<Prisma.$LabPayload>
/**
 * Model Provider
 * 
 */
export type Provider = $Result.DefaultSelection<Prisma.$ProviderPayload>
/**
 * Model Model
 * 
 */
export type Model = $Result.DefaultSelection<Prisma.$ModelPayload>
/**
 * Model ModelProviderEndpoint
 * 
 */
export type ModelProviderEndpoint = $Result.DefaultSelection<Prisma.$ModelProviderEndpointPayload>
/**
 * Model BenchmarkScore
 * 
 */
export type BenchmarkScore = $Result.DefaultSelection<Prisma.$BenchmarkScorePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProviderType: {
  FIRST_PARTY: 'FIRST_PARTY',
  INFERENCE_CLOUD: 'INFERENCE_CLOUD'
};

export type ProviderType = (typeof ProviderType)[keyof typeof ProviderType]


export const Modality: {
  TEXT: 'TEXT',
  MULTIMODAL: 'MULTIMODAL',
  IMAGE: 'IMAGE',
  EMBEDDING: 'EMBEDDING'
};

export type Modality = (typeof Modality)[keyof typeof Modality]


export const ModelType: {
  CHAT: 'CHAT',
  REASONING: 'REASONING',
  CODE: 'CODE'
};

export type ModelType = (typeof ModelType)[keyof typeof ModelType]


export const BenchmarkCategory: {
  REASONING: 'REASONING',
  CODING: 'CODING',
  GENERAL: 'GENERAL',
  AGENTIC: 'AGENTIC'
};

export type BenchmarkCategory = (typeof BenchmarkCategory)[keyof typeof BenchmarkCategory]

}

export type ProviderType = $Enums.ProviderType

export const ProviderType: typeof $Enums.ProviderType

export type Modality = $Enums.Modality

export const Modality: typeof $Enums.Modality

export type ModelType = $Enums.ModelType

export const ModelType: typeof $Enums.ModelType

export type BenchmarkCategory = $Enums.BenchmarkCategory

export const BenchmarkCategory: typeof $Enums.BenchmarkCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Labs
 * const labs = await prisma.lab.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Labs
   * const labs = await prisma.lab.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lab`: Exposes CRUD operations for the **Lab** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Labs
    * const labs = await prisma.lab.findMany()
    * ```
    */
  get lab(): Prisma.LabDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.provider.findMany()
    * ```
    */
  get provider(): Prisma.ProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.model`: Exposes CRUD operations for the **Model** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Models
    * const models = await prisma.model.findMany()
    * ```
    */
  get model(): Prisma.ModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.modelProviderEndpoint`: Exposes CRUD operations for the **ModelProviderEndpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModelProviderEndpoints
    * const modelProviderEndpoints = await prisma.modelProviderEndpoint.findMany()
    * ```
    */
  get modelProviderEndpoint(): Prisma.ModelProviderEndpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.benchmarkScore`: Exposes CRUD operations for the **BenchmarkScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BenchmarkScores
    * const benchmarkScores = await prisma.benchmarkScore.findMany()
    * ```
    */
  get benchmarkScore(): Prisma.BenchmarkScoreDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.1
   * Query Engine version: d1b3f377ca835d73fd50954a5e22128b9ebdd6b8
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lab: 'Lab',
    Provider: 'Provider',
    Model: 'Model',
    ModelProviderEndpoint: 'ModelProviderEndpoint',
    BenchmarkScore: 'BenchmarkScore'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lab" | "provider" | "model" | "modelProviderEndpoint" | "benchmarkScore"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lab: {
        payload: Prisma.$LabPayload<ExtArgs>
        fields: Prisma.LabFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LabFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LabFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          findFirst: {
            args: Prisma.LabFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LabFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          findMany: {
            args: Prisma.LabFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>[]
          }
          create: {
            args: Prisma.LabCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          createMany: {
            args: Prisma.LabCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LabCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>[]
          }
          delete: {
            args: Prisma.LabDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          update: {
            args: Prisma.LabUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          deleteMany: {
            args: Prisma.LabDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LabUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LabUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>[]
          }
          upsert: {
            args: Prisma.LabUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LabPayload>
          }
          aggregate: {
            args: Prisma.LabAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLab>
          }
          groupBy: {
            args: Prisma.LabGroupByArgs<ExtArgs>
            result: $Utils.Optional<LabGroupByOutputType>[]
          }
          count: {
            args: Prisma.LabCountArgs<ExtArgs>
            result: $Utils.Optional<LabCountAggregateOutputType> | number
          }
        }
      }
      Provider: {
        payload: Prisma.$ProviderPayload<ExtArgs>
        fields: Prisma.ProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findFirst: {
            args: Prisma.ProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findMany: {
            args: Prisma.ProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          create: {
            args: Prisma.ProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          createMany: {
            args: Prisma.ProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          delete: {
            args: Prisma.ProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          update: {
            args: Prisma.ProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          deleteMany: {
            args: Prisma.ProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProviderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          upsert: {
            args: Prisma.ProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          aggregate: {
            args: Prisma.ProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProvider>
          }
          groupBy: {
            args: Prisma.ProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderCountAggregateOutputType> | number
          }
        }
      }
      Model: {
        payload: Prisma.$ModelPayload<ExtArgs>
        fields: Prisma.ModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findFirst: {
            args: Prisma.ModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          findMany: {
            args: Prisma.ModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          create: {
            args: Prisma.ModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          createMany: {
            args: Prisma.ModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          delete: {
            args: Prisma.ModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          update: {
            args: Prisma.ModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          deleteMany: {
            args: Prisma.ModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>[]
          }
          upsert: {
            args: Prisma.ModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelPayload>
          }
          aggregate: {
            args: Prisma.ModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModel>
          }
          groupBy: {
            args: Prisma.ModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelCountArgs<ExtArgs>
            result: $Utils.Optional<ModelCountAggregateOutputType> | number
          }
        }
      }
      ModelProviderEndpoint: {
        payload: Prisma.$ModelProviderEndpointPayload<ExtArgs>
        fields: Prisma.ModelProviderEndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModelProviderEndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModelProviderEndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          findFirst: {
            args: Prisma.ModelProviderEndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModelProviderEndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          findMany: {
            args: Prisma.ModelProviderEndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>[]
          }
          create: {
            args: Prisma.ModelProviderEndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          createMany: {
            args: Prisma.ModelProviderEndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModelProviderEndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>[]
          }
          delete: {
            args: Prisma.ModelProviderEndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          update: {
            args: Prisma.ModelProviderEndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          deleteMany: {
            args: Prisma.ModelProviderEndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModelProviderEndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModelProviderEndpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>[]
          }
          upsert: {
            args: Prisma.ModelProviderEndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModelProviderEndpointPayload>
          }
          aggregate: {
            args: Prisma.ModelProviderEndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModelProviderEndpoint>
          }
          groupBy: {
            args: Prisma.ModelProviderEndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModelProviderEndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModelProviderEndpointCountArgs<ExtArgs>
            result: $Utils.Optional<ModelProviderEndpointCountAggregateOutputType> | number
          }
        }
      }
      BenchmarkScore: {
        payload: Prisma.$BenchmarkScorePayload<ExtArgs>
        fields: Prisma.BenchmarkScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BenchmarkScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BenchmarkScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          findFirst: {
            args: Prisma.BenchmarkScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BenchmarkScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          findMany: {
            args: Prisma.BenchmarkScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>[]
          }
          create: {
            args: Prisma.BenchmarkScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          createMany: {
            args: Prisma.BenchmarkScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BenchmarkScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>[]
          }
          delete: {
            args: Prisma.BenchmarkScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          update: {
            args: Prisma.BenchmarkScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          deleteMany: {
            args: Prisma.BenchmarkScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BenchmarkScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BenchmarkScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>[]
          }
          upsert: {
            args: Prisma.BenchmarkScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BenchmarkScorePayload>
          }
          aggregate: {
            args: Prisma.BenchmarkScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBenchmarkScore>
          }
          groupBy: {
            args: Prisma.BenchmarkScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<BenchmarkScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.BenchmarkScoreCountArgs<ExtArgs>
            result: $Utils.Optional<BenchmarkScoreCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    lab?: LabOmit
    provider?: ProviderOmit
    model?: ModelOmit
    modelProviderEndpoint?: ModelProviderEndpointOmit
    benchmarkScore?: BenchmarkScoreOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LabCountOutputType
   */

  export type LabCountOutputType = {
    models: number
  }

  export type LabCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | LabCountOutputTypeCountModelsArgs
  }

  // Custom InputTypes
  /**
   * LabCountOutputType without action
   */
  export type LabCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LabCountOutputType
     */
    select?: LabCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LabCountOutputType without action
   */
  export type LabCountOutputTypeCountModelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelWhereInput
  }


  /**
   * Count Type ProviderCountOutputType
   */

  export type ProviderCountOutputType = {
    endpoints: number
  }

  export type ProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoints?: boolean | ProviderCountOutputTypeCountEndpointsArgs
  }

  // Custom InputTypes
  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCountOutputType
     */
    select?: ProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeCountEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelProviderEndpointWhereInput
  }


  /**
   * Count Type ModelCountOutputType
   */

  export type ModelCountOutputType = {
    endpoints: number
    benchmarks: number
  }

  export type ModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoints?: boolean | ModelCountOutputTypeCountEndpointsArgs
    benchmarks?: boolean | ModelCountOutputTypeCountBenchmarksArgs
  }

  // Custom InputTypes
  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelCountOutputType
     */
    select?: ModelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeCountEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelProviderEndpointWhereInput
  }

  /**
   * ModelCountOutputType without action
   */
  export type ModelCountOutputTypeCountBenchmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenchmarkScoreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lab
   */

  export type AggregateLab = {
    _count: LabCountAggregateOutputType | null
    _avg: LabAvgAggregateOutputType | null
    _sum: LabSumAggregateOutputType | null
    _min: LabMinAggregateOutputType | null
    _max: LabMaxAggregateOutputType | null
  }

  export type LabAvgAggregateOutputType = {
    foundedYear: number | null
  }

  export type LabSumAggregateOutputType = {
    foundedYear: number | null
  }

  export type LabMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoSlug: string | null
    description: string | null
    website: string | null
    headquarters: string | null
    foundedYear: number | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoSlug: string | null
    description: string | null
    website: string | null
    headquarters: string | null
    foundedYear: number | null
    verified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LabCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    logoSlug: number
    description: number
    website: number
    headquarters: number
    foundedYear: number
    verified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LabAvgAggregateInputType = {
    foundedYear?: true
  }

  export type LabSumAggregateInputType = {
    foundedYear?: true
  }

  export type LabMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    description?: true
    website?: true
    headquarters?: true
    foundedYear?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    description?: true
    website?: true
    headquarters?: true
    foundedYear?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LabCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    description?: true
    website?: true
    headquarters?: true
    foundedYear?: true
    verified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LabAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lab to aggregate.
     */
    where?: LabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labs to fetch.
     */
    orderBy?: LabOrderByWithRelationInput | LabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Labs
    **/
    _count?: true | LabCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LabAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LabSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LabMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LabMaxAggregateInputType
  }

  export type GetLabAggregateType<T extends LabAggregateArgs> = {
        [P in keyof T & keyof AggregateLab]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLab[P]>
      : GetScalarType<T[P], AggregateLab[P]>
  }




  export type LabGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LabWhereInput
    orderBy?: LabOrderByWithAggregationInput | LabOrderByWithAggregationInput[]
    by: LabScalarFieldEnum[] | LabScalarFieldEnum
    having?: LabScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LabCountAggregateInputType | true
    _avg?: LabAvgAggregateInputType
    _sum?: LabSumAggregateInputType
    _min?: LabMinAggregateInputType
    _max?: LabMaxAggregateInputType
  }

  export type LabGroupByOutputType = {
    id: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified: boolean
    createdAt: Date
    updatedAt: Date
    _count: LabCountAggregateOutputType | null
    _avg: LabAvgAggregateOutputType | null
    _sum: LabSumAggregateOutputType | null
    _min: LabMinAggregateOutputType | null
    _max: LabMaxAggregateOutputType | null
  }

  type GetLabGroupByPayload<T extends LabGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LabGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LabGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LabGroupByOutputType[P]>
            : GetScalarType<T[P], LabGroupByOutputType[P]>
        }
      >
    >


  export type LabSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    description?: boolean
    website?: boolean
    headquarters?: boolean
    foundedYear?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    models?: boolean | Lab$modelsArgs<ExtArgs>
    _count?: boolean | LabCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lab"]>

  export type LabSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    description?: boolean
    website?: boolean
    headquarters?: boolean
    foundedYear?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lab"]>

  export type LabSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    description?: boolean
    website?: boolean
    headquarters?: boolean
    foundedYear?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lab"]>

  export type LabSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    description?: boolean
    website?: boolean
    headquarters?: boolean
    foundedYear?: boolean
    verified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LabOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "logoSlug" | "description" | "website" | "headquarters" | "foundedYear" | "verified" | "createdAt" | "updatedAt", ExtArgs["result"]["lab"]>
  export type LabInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    models?: boolean | Lab$modelsArgs<ExtArgs>
    _count?: boolean | LabCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LabIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LabIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LabPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lab"
    objects: {
      models: Prisma.$ModelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      logoSlug: string
      description: string
      website: string
      headquarters: string
      foundedYear: number
      verified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lab"]>
    composites: {}
  }

  type LabGetPayload<S extends boolean | null | undefined | LabDefaultArgs> = $Result.GetResult<Prisma.$LabPayload, S>

  type LabCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LabFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LabCountAggregateInputType | true
    }

  export interface LabDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lab'], meta: { name: 'Lab' } }
    /**
     * Find zero or one Lab that matches the filter.
     * @param {LabFindUniqueArgs} args - Arguments to find a Lab
     * @example
     * // Get one Lab
     * const lab = await prisma.lab.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LabFindUniqueArgs>(args: SelectSubset<T, LabFindUniqueArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lab that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LabFindUniqueOrThrowArgs} args - Arguments to find a Lab
     * @example
     * // Get one Lab
     * const lab = await prisma.lab.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LabFindUniqueOrThrowArgs>(args: SelectSubset<T, LabFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lab that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabFindFirstArgs} args - Arguments to find a Lab
     * @example
     * // Get one Lab
     * const lab = await prisma.lab.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LabFindFirstArgs>(args?: SelectSubset<T, LabFindFirstArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lab that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabFindFirstOrThrowArgs} args - Arguments to find a Lab
     * @example
     * // Get one Lab
     * const lab = await prisma.lab.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LabFindFirstOrThrowArgs>(args?: SelectSubset<T, LabFindFirstOrThrowArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Labs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Labs
     * const labs = await prisma.lab.findMany()
     * 
     * // Get first 10 Labs
     * const labs = await prisma.lab.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const labWithIdOnly = await prisma.lab.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LabFindManyArgs>(args?: SelectSubset<T, LabFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lab.
     * @param {LabCreateArgs} args - Arguments to create a Lab.
     * @example
     * // Create one Lab
     * const Lab = await prisma.lab.create({
     *   data: {
     *     // ... data to create a Lab
     *   }
     * })
     * 
     */
    create<T extends LabCreateArgs>(args: SelectSubset<T, LabCreateArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Labs.
     * @param {LabCreateManyArgs} args - Arguments to create many Labs.
     * @example
     * // Create many Labs
     * const lab = await prisma.lab.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LabCreateManyArgs>(args?: SelectSubset<T, LabCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Labs and returns the data saved in the database.
     * @param {LabCreateManyAndReturnArgs} args - Arguments to create many Labs.
     * @example
     * // Create many Labs
     * const lab = await prisma.lab.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Labs and only return the `id`
     * const labWithIdOnly = await prisma.lab.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LabCreateManyAndReturnArgs>(args?: SelectSubset<T, LabCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lab.
     * @param {LabDeleteArgs} args - Arguments to delete one Lab.
     * @example
     * // Delete one Lab
     * const Lab = await prisma.lab.delete({
     *   where: {
     *     // ... filter to delete one Lab
     *   }
     * })
     * 
     */
    delete<T extends LabDeleteArgs>(args: SelectSubset<T, LabDeleteArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lab.
     * @param {LabUpdateArgs} args - Arguments to update one Lab.
     * @example
     * // Update one Lab
     * const lab = await prisma.lab.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LabUpdateArgs>(args: SelectSubset<T, LabUpdateArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Labs.
     * @param {LabDeleteManyArgs} args - Arguments to filter Labs to delete.
     * @example
     * // Delete a few Labs
     * const { count } = await prisma.lab.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LabDeleteManyArgs>(args?: SelectSubset<T, LabDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Labs
     * const lab = await prisma.lab.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LabUpdateManyArgs>(args: SelectSubset<T, LabUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Labs and returns the data updated in the database.
     * @param {LabUpdateManyAndReturnArgs} args - Arguments to update many Labs.
     * @example
     * // Update many Labs
     * const lab = await prisma.lab.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Labs and only return the `id`
     * const labWithIdOnly = await prisma.lab.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LabUpdateManyAndReturnArgs>(args: SelectSubset<T, LabUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lab.
     * @param {LabUpsertArgs} args - Arguments to update or create a Lab.
     * @example
     * // Update or create a Lab
     * const lab = await prisma.lab.upsert({
     *   create: {
     *     // ... data to create a Lab
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lab we want to update
     *   }
     * })
     */
    upsert<T extends LabUpsertArgs>(args: SelectSubset<T, LabUpsertArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Labs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabCountArgs} args - Arguments to filter Labs to count.
     * @example
     * // Count the number of Labs
     * const count = await prisma.lab.count({
     *   where: {
     *     // ... the filter for the Labs we want to count
     *   }
     * })
    **/
    count<T extends LabCountArgs>(
      args?: Subset<T, LabCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LabCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LabAggregateArgs>(args: Subset<T, LabAggregateArgs>): Prisma.PrismaPromise<GetLabAggregateType<T>>

    /**
     * Group by Lab.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LabGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LabGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LabGroupByArgs['orderBy'] }
        : { orderBy?: LabGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LabGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLabGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lab model
   */
  readonly fields: LabFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lab.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LabClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    models<T extends Lab$modelsArgs<ExtArgs> = {}>(args?: Subset<T, Lab$modelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lab model
   */
  interface LabFieldRefs {
    readonly id: FieldRef<"Lab", 'String'>
    readonly name: FieldRef<"Lab", 'String'>
    readonly slug: FieldRef<"Lab", 'String'>
    readonly logoSlug: FieldRef<"Lab", 'String'>
    readonly description: FieldRef<"Lab", 'String'>
    readonly website: FieldRef<"Lab", 'String'>
    readonly headquarters: FieldRef<"Lab", 'String'>
    readonly foundedYear: FieldRef<"Lab", 'Int'>
    readonly verified: FieldRef<"Lab", 'Boolean'>
    readonly createdAt: FieldRef<"Lab", 'DateTime'>
    readonly updatedAt: FieldRef<"Lab", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lab findUnique
   */
  export type LabFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter, which Lab to fetch.
     */
    where: LabWhereUniqueInput
  }

  /**
   * Lab findUniqueOrThrow
   */
  export type LabFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter, which Lab to fetch.
     */
    where: LabWhereUniqueInput
  }

  /**
   * Lab findFirst
   */
  export type LabFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter, which Lab to fetch.
     */
    where?: LabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labs to fetch.
     */
    orderBy?: LabOrderByWithRelationInput | LabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labs.
     */
    cursor?: LabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labs.
     */
    distinct?: LabScalarFieldEnum | LabScalarFieldEnum[]
  }

  /**
   * Lab findFirstOrThrow
   */
  export type LabFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter, which Lab to fetch.
     */
    where?: LabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labs to fetch.
     */
    orderBy?: LabOrderByWithRelationInput | LabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Labs.
     */
    cursor?: LabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labs.
     */
    distinct?: LabScalarFieldEnum | LabScalarFieldEnum[]
  }

  /**
   * Lab findMany
   */
  export type LabFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter, which Labs to fetch.
     */
    where?: LabWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Labs to fetch.
     */
    orderBy?: LabOrderByWithRelationInput | LabOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Labs.
     */
    cursor?: LabWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Labs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Labs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Labs.
     */
    distinct?: LabScalarFieldEnum | LabScalarFieldEnum[]
  }

  /**
   * Lab create
   */
  export type LabCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * The data needed to create a Lab.
     */
    data: XOR<LabCreateInput, LabUncheckedCreateInput>
  }

  /**
   * Lab createMany
   */
  export type LabCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Labs.
     */
    data: LabCreateManyInput | LabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lab createManyAndReturn
   */
  export type LabCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * The data used to create many Labs.
     */
    data: LabCreateManyInput | LabCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lab update
   */
  export type LabUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * The data needed to update a Lab.
     */
    data: XOR<LabUpdateInput, LabUncheckedUpdateInput>
    /**
     * Choose, which Lab to update.
     */
    where: LabWhereUniqueInput
  }

  /**
   * Lab updateMany
   */
  export type LabUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Labs.
     */
    data: XOR<LabUpdateManyMutationInput, LabUncheckedUpdateManyInput>
    /**
     * Filter which Labs to update
     */
    where?: LabWhereInput
    /**
     * Limit how many Labs to update.
     */
    limit?: number
  }

  /**
   * Lab updateManyAndReturn
   */
  export type LabUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * The data used to update Labs.
     */
    data: XOR<LabUpdateManyMutationInput, LabUncheckedUpdateManyInput>
    /**
     * Filter which Labs to update
     */
    where?: LabWhereInput
    /**
     * Limit how many Labs to update.
     */
    limit?: number
  }

  /**
   * Lab upsert
   */
  export type LabUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * The filter to search for the Lab to update in case it exists.
     */
    where: LabWhereUniqueInput
    /**
     * In case the Lab found by the `where` argument doesn't exist, create a new Lab with this data.
     */
    create: XOR<LabCreateInput, LabUncheckedCreateInput>
    /**
     * In case the Lab was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LabUpdateInput, LabUncheckedUpdateInput>
  }

  /**
   * Lab delete
   */
  export type LabDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
    /**
     * Filter which Lab to delete.
     */
    where: LabWhereUniqueInput
  }

  /**
   * Lab deleteMany
   */
  export type LabDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Labs to delete
     */
    where?: LabWhereInput
    /**
     * Limit how many Labs to delete.
     */
    limit?: number
  }

  /**
   * Lab.models
   */
  export type Lab$modelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    where?: ModelWhereInput
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    cursor?: ModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Lab without action
   */
  export type LabDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lab
     */
    select?: LabSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lab
     */
    omit?: LabOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LabInclude<ExtArgs> | null
  }


  /**
   * Model Provider
   */

  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  export type ProviderAvgAggregateOutputType = {
    uptime30d: number | null
  }

  export type ProviderSumAggregateOutputType = {
    uptime30d: number | null
  }

  export type ProviderMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoSlug: string | null
    type: $Enums.ProviderType | null
    description: string | null
    website: string | null
    slaTier: string | null
    uptime30d: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    logoSlug: string | null
    type: $Enums.ProviderType | null
    description: string | null
    website: string | null
    slaTier: string | null
    uptime30d: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProviderCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    logoSlug: number
    type: number
    description: number
    website: number
    regions: number
    slaTier: number
    uptime30d: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProviderAvgAggregateInputType = {
    uptime30d?: true
  }

  export type ProviderSumAggregateInputType = {
    uptime30d?: true
  }

  export type ProviderMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    type?: true
    description?: true
    website?: true
    slaTier?: true
    uptime30d?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    type?: true
    description?: true
    website?: true
    slaTier?: true
    uptime30d?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProviderCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    logoSlug?: true
    type?: true
    description?: true
    website?: true
    regions?: true
    slaTier?: true
    uptime30d?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Providers
    **/
    _count?: true | ProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderMaxAggregateInputType
  }

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>
  }




  export type ProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderWhereInput
    orderBy?: ProviderOrderByWithAggregationInput | ProviderOrderByWithAggregationInput[]
    by: ProviderScalarFieldEnum[] | ProviderScalarFieldEnum
    having?: ProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCountAggregateInputType | true
    _avg?: ProviderAvgAggregateInputType
    _sum?: ProviderSumAggregateInputType
    _min?: ProviderMinAggregateInputType
    _max?: ProviderMaxAggregateInputType
  }

  export type ProviderGroupByOutputType = {
    id: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions: string[]
    slaTier: string
    uptime30d: number
    createdAt: Date
    updatedAt: Date
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>
        }
      >
    >


  export type ProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    regions?: boolean
    slaTier?: boolean
    uptime30d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    endpoints?: boolean | Provider$endpointsArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    regions?: boolean
    slaTier?: boolean
    uptime30d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    regions?: boolean
    slaTier?: boolean
    uptime30d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    logoSlug?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    regions?: boolean
    slaTier?: boolean
    uptime30d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "logoSlug" | "type" | "description" | "website" | "regions" | "slaTier" | "uptime30d" | "createdAt" | "updatedAt", ExtArgs["result"]["provider"]>
  export type ProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    endpoints?: boolean | Provider$endpointsArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProviderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Provider"
    objects: {
      endpoints: Prisma.$ModelProviderEndpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      logoSlug: string
      type: $Enums.ProviderType
      description: string
      website: string
      regions: string[]
      slaTier: string
      uptime30d: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["provider"]>
    composites: {}
  }

  type ProviderGetPayload<S extends boolean | null | undefined | ProviderDefaultArgs> = $Result.GetResult<Prisma.$ProviderPayload, S>

  type ProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProviderCountAggregateInputType | true
    }

  export interface ProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Provider'], meta: { name: 'Provider' } }
    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderFindUniqueArgs>(args: SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Provider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderFindFirstArgs>(args?: SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerWithIdOnly = await prisma.provider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderFindManyArgs>(args?: SelectSubset<T, ProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     * 
     */
    create<T extends ProviderCreateArgs>(args: SelectSubset<T, ProviderCreateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Providers.
     * @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderCreateManyArgs>(args?: SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Providers and returns the data saved in the database.
     * @param {ProviderCreateManyAndReturnArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     * 
     */
    delete<T extends ProviderDeleteArgs>(args: SelectSubset<T, ProviderDeleteArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderUpdateArgs>(args: SelectSubset<T, ProviderUpdateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderDeleteManyArgs>(args?: SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderUpdateManyArgs>(args: SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers and returns the data updated in the database.
     * @param {ProviderUpdateManyAndReturnArgs} args - Arguments to update many Providers.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProviderUpdateManyAndReturnArgs>(args: SelectSubset<T, ProviderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
     */
    upsert<T extends ProviderUpsertArgs>(args: SelectSubset<T, ProviderUpsertArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProviderAggregateArgs>(args: Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Provider model
   */
  readonly fields: ProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    endpoints<T extends Provider$endpointsArgs<ExtArgs> = {}>(args?: Subset<T, Provider$endpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Provider model
   */
  interface ProviderFieldRefs {
    readonly id: FieldRef<"Provider", 'String'>
    readonly name: FieldRef<"Provider", 'String'>
    readonly slug: FieldRef<"Provider", 'String'>
    readonly logoSlug: FieldRef<"Provider", 'String'>
    readonly type: FieldRef<"Provider", 'ProviderType'>
    readonly description: FieldRef<"Provider", 'String'>
    readonly website: FieldRef<"Provider", 'String'>
    readonly regions: FieldRef<"Provider", 'String[]'>
    readonly slaTier: FieldRef<"Provider", 'String'>
    readonly uptime30d: FieldRef<"Provider", 'Float'>
    readonly createdAt: FieldRef<"Provider", 'DateTime'>
    readonly updatedAt: FieldRef<"Provider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Provider findUnique
   */
  export type ProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findFirst
   */
  export type ProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider create
   */
  export type ProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
  }

  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider createManyAndReturn
   */
  export type ProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider update
   */
  export type ProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
    /**
     * Limit how many Providers to update.
     */
    limit?: number
  }

  /**
   * Provider updateManyAndReturn
   */
  export type ProviderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
    /**
     * Limit how many Providers to update.
     */
    limit?: number
  }

  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
  }

  /**
   * Provider delete
   */
  export type ProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput
    /**
     * Limit how many Providers to delete.
     */
    limit?: number
  }

  /**
   * Provider.endpoints
   */
  export type Provider$endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    where?: ModelProviderEndpointWhereInput
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    cursor?: ModelProviderEndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelProviderEndpointScalarFieldEnum | ModelProviderEndpointScalarFieldEnum[]
  }

  /**
   * Provider without action
   */
  export type ProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Provider
     */
    omit?: ProviderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
  }


  /**
   * Model Model
   */

  export type AggregateModel = {
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  export type ModelAvgAggregateOutputType = {
    contextWindow: number | null
    maxOutputTokens: number | null
    compositeScore: number | null
    rankCurrent: number | null
    rankPrevious: number | null
    usageDelta7d: number | null
    sparkline7d: number | null
  }

  export type ModelSumAggregateOutputType = {
    contextWindow: number | null
    maxOutputTokens: number | null
    compositeScore: number | null
    rankCurrent: number | null
    rankPrevious: number | null
    usageDelta7d: number | null
    sparkline7d: number[]
  }

  export type ModelMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    labId: string | null
    modality: $Enums.Modality | null
    modelType: $Enums.ModelType | null
    isOpenWeights: boolean | null
    license: string | null
    contextWindow: number | null
    maxOutputTokens: number | null
    trainingCutoff: string | null
    supportsCaching: boolean | null
    releaseDate: Date | null
    description: string | null
    compositeScore: number | null
    rankCurrent: number | null
    rankPrevious: number | null
    usageDelta7d: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModelMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    labId: string | null
    modality: $Enums.Modality | null
    modelType: $Enums.ModelType | null
    isOpenWeights: boolean | null
    license: string | null
    contextWindow: number | null
    maxOutputTokens: number | null
    trainingCutoff: string | null
    supportsCaching: boolean | null
    releaseDate: Date | null
    description: string | null
    compositeScore: number | null
    rankCurrent: number | null
    rankPrevious: number | null
    usageDelta7d: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModelCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    labId: number
    modality: number
    modelType: number
    isOpenWeights: number
    license: number
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: number
    capabilities: number
    supportsCaching: number
    releaseDate: number
    description: number
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModelAvgAggregateInputType = {
    contextWindow?: true
    maxOutputTokens?: true
    compositeScore?: true
    rankCurrent?: true
    rankPrevious?: true
    usageDelta7d?: true
    sparkline7d?: true
  }

  export type ModelSumAggregateInputType = {
    contextWindow?: true
    maxOutputTokens?: true
    compositeScore?: true
    rankCurrent?: true
    rankPrevious?: true
    usageDelta7d?: true
    sparkline7d?: true
  }

  export type ModelMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    labId?: true
    modality?: true
    modelType?: true
    isOpenWeights?: true
    license?: true
    contextWindow?: true
    maxOutputTokens?: true
    trainingCutoff?: true
    supportsCaching?: true
    releaseDate?: true
    description?: true
    compositeScore?: true
    rankCurrent?: true
    rankPrevious?: true
    usageDelta7d?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModelMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    labId?: true
    modality?: true
    modelType?: true
    isOpenWeights?: true
    license?: true
    contextWindow?: true
    maxOutputTokens?: true
    trainingCutoff?: true
    supportsCaching?: true
    releaseDate?: true
    description?: true
    compositeScore?: true
    rankCurrent?: true
    rankPrevious?: true
    usageDelta7d?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModelCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    labId?: true
    modality?: true
    modelType?: true
    isOpenWeights?: true
    license?: true
    contextWindow?: true
    maxOutputTokens?: true
    trainingCutoff?: true
    capabilities?: true
    supportsCaching?: true
    releaseDate?: true
    description?: true
    compositeScore?: true
    rankCurrent?: true
    rankPrevious?: true
    usageDelta7d?: true
    sparkline7d?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Model to aggregate.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Models
    **/
    _count?: true | ModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelMaxAggregateInputType
  }

  export type GetModelAggregateType<T extends ModelAggregateArgs> = {
        [P in keyof T & keyof AggregateModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModel[P]>
      : GetScalarType<T[P], AggregateModel[P]>
  }




  export type ModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelWhereInput
    orderBy?: ModelOrderByWithAggregationInput | ModelOrderByWithAggregationInput[]
    by: ModelScalarFieldEnum[] | ModelScalarFieldEnum
    having?: ModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelCountAggregateInputType | true
    _avg?: ModelAvgAggregateInputType
    _sum?: ModelSumAggregateInputType
    _min?: ModelMinAggregateInputType
    _max?: ModelMaxAggregateInputType
  }

  export type ModelGroupByOutputType = {
    id: string
    name: string
    slug: string
    labId: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities: string[]
    supportsCaching: boolean
    releaseDate: Date
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d: number[]
    createdAt: Date
    updatedAt: Date
    _count: ModelCountAggregateOutputType | null
    _avg: ModelAvgAggregateOutputType | null
    _sum: ModelSumAggregateOutputType | null
    _min: ModelMinAggregateOutputType | null
    _max: ModelMaxAggregateOutputType | null
  }

  type GetModelGroupByPayload<T extends ModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelGroupByOutputType[P]>
            : GetScalarType<T[P], ModelGroupByOutputType[P]>
        }
      >
    >


  export type ModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    labId?: boolean
    modality?: boolean
    modelType?: boolean
    isOpenWeights?: boolean
    license?: boolean
    contextWindow?: boolean
    maxOutputTokens?: boolean
    trainingCutoff?: boolean
    capabilities?: boolean
    supportsCaching?: boolean
    releaseDate?: boolean
    description?: boolean
    compositeScore?: boolean
    rankCurrent?: boolean
    rankPrevious?: boolean
    usageDelta7d?: boolean
    sparkline7d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lab?: boolean | LabDefaultArgs<ExtArgs>
    endpoints?: boolean | Model$endpointsArgs<ExtArgs>
    benchmarks?: boolean | Model$benchmarksArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    labId?: boolean
    modality?: boolean
    modelType?: boolean
    isOpenWeights?: boolean
    license?: boolean
    contextWindow?: boolean
    maxOutputTokens?: boolean
    trainingCutoff?: boolean
    capabilities?: boolean
    supportsCaching?: boolean
    releaseDate?: boolean
    description?: boolean
    compositeScore?: boolean
    rankCurrent?: boolean
    rankPrevious?: boolean
    usageDelta7d?: boolean
    sparkline7d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lab?: boolean | LabDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    labId?: boolean
    modality?: boolean
    modelType?: boolean
    isOpenWeights?: boolean
    license?: boolean
    contextWindow?: boolean
    maxOutputTokens?: boolean
    trainingCutoff?: boolean
    capabilities?: boolean
    supportsCaching?: boolean
    releaseDate?: boolean
    description?: boolean
    compositeScore?: boolean
    rankCurrent?: boolean
    rankPrevious?: boolean
    usageDelta7d?: boolean
    sparkline7d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lab?: boolean | LabDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["model"]>

  export type ModelSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    labId?: boolean
    modality?: boolean
    modelType?: boolean
    isOpenWeights?: boolean
    license?: boolean
    contextWindow?: boolean
    maxOutputTokens?: boolean
    trainingCutoff?: boolean
    capabilities?: boolean
    supportsCaching?: boolean
    releaseDate?: boolean
    description?: boolean
    compositeScore?: boolean
    rankCurrent?: boolean
    rankPrevious?: boolean
    usageDelta7d?: boolean
    sparkline7d?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "labId" | "modality" | "modelType" | "isOpenWeights" | "license" | "contextWindow" | "maxOutputTokens" | "trainingCutoff" | "capabilities" | "supportsCaching" | "releaseDate" | "description" | "compositeScore" | "rankCurrent" | "rankPrevious" | "usageDelta7d" | "sparkline7d" | "createdAt" | "updatedAt", ExtArgs["result"]["model"]>
  export type ModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lab?: boolean | LabDefaultArgs<ExtArgs>
    endpoints?: boolean | Model$endpointsArgs<ExtArgs>
    benchmarks?: boolean | Model$benchmarksArgs<ExtArgs>
    _count?: boolean | ModelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lab?: boolean | LabDefaultArgs<ExtArgs>
  }
  export type ModelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lab?: boolean | LabDefaultArgs<ExtArgs>
  }

  export type $ModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Model"
    objects: {
      lab: Prisma.$LabPayload<ExtArgs>
      endpoints: Prisma.$ModelProviderEndpointPayload<ExtArgs>[]
      benchmarks: Prisma.$BenchmarkScorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      labId: string
      modality: $Enums.Modality
      modelType: $Enums.ModelType
      isOpenWeights: boolean
      license: string
      contextWindow: number
      maxOutputTokens: number
      trainingCutoff: string
      capabilities: string[]
      supportsCaching: boolean
      releaseDate: Date
      description: string
      compositeScore: number
      rankCurrent: number
      rankPrevious: number
      usageDelta7d: number
      sparkline7d: number[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["model"]>
    composites: {}
  }

  type ModelGetPayload<S extends boolean | null | undefined | ModelDefaultArgs> = $Result.GetResult<Prisma.$ModelPayload, S>

  type ModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModelCountAggregateInputType | true
    }

  export interface ModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Model'], meta: { name: 'Model' } }
    /**
     * Find zero or one Model that matches the filter.
     * @param {ModelFindUniqueArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModelFindUniqueArgs>(args: SelectSubset<T, ModelFindUniqueArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Model that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModelFindUniqueOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModelFindUniqueOrThrowArgs>(args: SelectSubset<T, ModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Model that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModelFindFirstArgs>(args?: SelectSubset<T, ModelFindFirstArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Model that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindFirstOrThrowArgs} args - Arguments to find a Model
     * @example
     * // Get one Model
     * const model = await prisma.model.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModelFindFirstOrThrowArgs>(args?: SelectSubset<T, ModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Models that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Models
     * const models = await prisma.model.findMany()
     * 
     * // Get first 10 Models
     * const models = await prisma.model.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modelWithIdOnly = await prisma.model.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModelFindManyArgs>(args?: SelectSubset<T, ModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Model.
     * @param {ModelCreateArgs} args - Arguments to create a Model.
     * @example
     * // Create one Model
     * const Model = await prisma.model.create({
     *   data: {
     *     // ... data to create a Model
     *   }
     * })
     * 
     */
    create<T extends ModelCreateArgs>(args: SelectSubset<T, ModelCreateArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Models.
     * @param {ModelCreateManyArgs} args - Arguments to create many Models.
     * @example
     * // Create many Models
     * const model = await prisma.model.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModelCreateManyArgs>(args?: SelectSubset<T, ModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Models and returns the data saved in the database.
     * @param {ModelCreateManyAndReturnArgs} args - Arguments to create many Models.
     * @example
     * // Create many Models
     * const model = await prisma.model.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Models and only return the `id`
     * const modelWithIdOnly = await prisma.model.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModelCreateManyAndReturnArgs>(args?: SelectSubset<T, ModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Model.
     * @param {ModelDeleteArgs} args - Arguments to delete one Model.
     * @example
     * // Delete one Model
     * const Model = await prisma.model.delete({
     *   where: {
     *     // ... filter to delete one Model
     *   }
     * })
     * 
     */
    delete<T extends ModelDeleteArgs>(args: SelectSubset<T, ModelDeleteArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Model.
     * @param {ModelUpdateArgs} args - Arguments to update one Model.
     * @example
     * // Update one Model
     * const model = await prisma.model.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModelUpdateArgs>(args: SelectSubset<T, ModelUpdateArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Models.
     * @param {ModelDeleteManyArgs} args - Arguments to filter Models to delete.
     * @example
     * // Delete a few Models
     * const { count } = await prisma.model.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModelDeleteManyArgs>(args?: SelectSubset<T, ModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Models
     * const model = await prisma.model.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModelUpdateManyArgs>(args: SelectSubset<T, ModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Models and returns the data updated in the database.
     * @param {ModelUpdateManyAndReturnArgs} args - Arguments to update many Models.
     * @example
     * // Update many Models
     * const model = await prisma.model.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Models and only return the `id`
     * const modelWithIdOnly = await prisma.model.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModelUpdateManyAndReturnArgs>(args: SelectSubset<T, ModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Model.
     * @param {ModelUpsertArgs} args - Arguments to update or create a Model.
     * @example
     * // Update or create a Model
     * const model = await prisma.model.upsert({
     *   create: {
     *     // ... data to create a Model
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Model we want to update
     *   }
     * })
     */
    upsert<T extends ModelUpsertArgs>(args: SelectSubset<T, ModelUpsertArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Models.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelCountArgs} args - Arguments to filter Models to count.
     * @example
     * // Count the number of Models
     * const count = await prisma.model.count({
     *   where: {
     *     // ... the filter for the Models we want to count
     *   }
     * })
    **/
    count<T extends ModelCountArgs>(
      args?: Subset<T, ModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelAggregateArgs>(args: Subset<T, ModelAggregateArgs>): Prisma.PrismaPromise<GetModelAggregateType<T>>

    /**
     * Group by Model.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelGroupByArgs['orderBy'] }
        : { orderBy?: ModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Model model
   */
  readonly fields: ModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Model.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lab<T extends LabDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LabDefaultArgs<ExtArgs>>): Prisma__LabClient<$Result.GetResult<Prisma.$LabPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    endpoints<T extends Model$endpointsArgs<ExtArgs> = {}>(args?: Subset<T, Model$endpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    benchmarks<T extends Model$benchmarksArgs<ExtArgs> = {}>(args?: Subset<T, Model$benchmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Model model
   */
  interface ModelFieldRefs {
    readonly id: FieldRef<"Model", 'String'>
    readonly name: FieldRef<"Model", 'String'>
    readonly slug: FieldRef<"Model", 'String'>
    readonly labId: FieldRef<"Model", 'String'>
    readonly modality: FieldRef<"Model", 'Modality'>
    readonly modelType: FieldRef<"Model", 'ModelType'>
    readonly isOpenWeights: FieldRef<"Model", 'Boolean'>
    readonly license: FieldRef<"Model", 'String'>
    readonly contextWindow: FieldRef<"Model", 'Int'>
    readonly maxOutputTokens: FieldRef<"Model", 'Int'>
    readonly trainingCutoff: FieldRef<"Model", 'String'>
    readonly capabilities: FieldRef<"Model", 'String[]'>
    readonly supportsCaching: FieldRef<"Model", 'Boolean'>
    readonly releaseDate: FieldRef<"Model", 'DateTime'>
    readonly description: FieldRef<"Model", 'String'>
    readonly compositeScore: FieldRef<"Model", 'Float'>
    readonly rankCurrent: FieldRef<"Model", 'Int'>
    readonly rankPrevious: FieldRef<"Model", 'Int'>
    readonly usageDelta7d: FieldRef<"Model", 'Float'>
    readonly sparkline7d: FieldRef<"Model", 'Float[]'>
    readonly createdAt: FieldRef<"Model", 'DateTime'>
    readonly updatedAt: FieldRef<"Model", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Model findUnique
   */
  export type ModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model findUniqueOrThrow
   */
  export type ModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model findFirst
   */
  export type ModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model findFirstOrThrow
   */
  export type ModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Model to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model findMany
   */
  export type ModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter, which Models to fetch.
     */
    where?: ModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Models to fetch.
     */
    orderBy?: ModelOrderByWithRelationInput | ModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Models.
     */
    cursor?: ModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Models from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Models.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Models.
     */
    distinct?: ModelScalarFieldEnum | ModelScalarFieldEnum[]
  }

  /**
   * Model create
   */
  export type ModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to create a Model.
     */
    data: XOR<ModelCreateInput, ModelUncheckedCreateInput>
  }

  /**
   * Model createMany
   */
  export type ModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Models.
     */
    data: ModelCreateManyInput | ModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Model createManyAndReturn
   */
  export type ModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * The data used to create many Models.
     */
    data: ModelCreateManyInput | ModelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Model update
   */
  export type ModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The data needed to update a Model.
     */
    data: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
    /**
     * Choose, which Model to update.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model updateMany
   */
  export type ModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Models.
     */
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyInput>
    /**
     * Filter which Models to update
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to update.
     */
    limit?: number
  }

  /**
   * Model updateManyAndReturn
   */
  export type ModelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * The data used to update Models.
     */
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyInput>
    /**
     * Filter which Models to update
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Model upsert
   */
  export type ModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * The filter to search for the Model to update in case it exists.
     */
    where: ModelWhereUniqueInput
    /**
     * In case the Model found by the `where` argument doesn't exist, create a new Model with this data.
     */
    create: XOR<ModelCreateInput, ModelUncheckedCreateInput>
    /**
     * In case the Model was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelUpdateInput, ModelUncheckedUpdateInput>
  }

  /**
   * Model delete
   */
  export type ModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
    /**
     * Filter which Model to delete.
     */
    where: ModelWhereUniqueInput
  }

  /**
   * Model deleteMany
   */
  export type ModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Models to delete
     */
    where?: ModelWhereInput
    /**
     * Limit how many Models to delete.
     */
    limit?: number
  }

  /**
   * Model.endpoints
   */
  export type Model$endpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    where?: ModelProviderEndpointWhereInput
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    cursor?: ModelProviderEndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModelProviderEndpointScalarFieldEnum | ModelProviderEndpointScalarFieldEnum[]
  }

  /**
   * Model.benchmarks
   */
  export type Model$benchmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    where?: BenchmarkScoreWhereInput
    orderBy?: BenchmarkScoreOrderByWithRelationInput | BenchmarkScoreOrderByWithRelationInput[]
    cursor?: BenchmarkScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BenchmarkScoreScalarFieldEnum | BenchmarkScoreScalarFieldEnum[]
  }

  /**
   * Model without action
   */
  export type ModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Model
     */
    select?: ModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Model
     */
    omit?: ModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelInclude<ExtArgs> | null
  }


  /**
   * Model ModelProviderEndpoint
   */

  export type AggregateModelProviderEndpoint = {
    _count: ModelProviderEndpointCountAggregateOutputType | null
    _avg: ModelProviderEndpointAvgAggregateOutputType | null
    _sum: ModelProviderEndpointSumAggregateOutputType | null
    _min: ModelProviderEndpointMinAggregateOutputType | null
    _max: ModelProviderEndpointMaxAggregateOutputType | null
  }

  export type ModelProviderEndpointAvgAggregateOutputType = {
    inputPricePer1M: number | null
    outputPricePer1M: number | null
    cacheInputPricePer1M: number | null
    latencyMs: number | null
    throughputTps: number | null
    uptimePct: number | null
    contextLimit: number | null
  }

  export type ModelProviderEndpointSumAggregateOutputType = {
    inputPricePer1M: number | null
    outputPricePer1M: number | null
    cacheInputPricePer1M: number | null
    latencyMs: number | null
    throughputTps: number | null
    uptimePct: number | null
    contextLimit: number | null
  }

  export type ModelProviderEndpointMinAggregateOutputType = {
    id: string | null
    modelId: string | null
    providerId: string | null
    inputPricePer1M: number | null
    outputPricePer1M: number | null
    cacheInputPricePer1M: number | null
    latencyMs: number | null
    throughputTps: number | null
    uptimePct: number | null
    contextLimit: number | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModelProviderEndpointMaxAggregateOutputType = {
    id: string | null
    modelId: string | null
    providerId: string | null
    inputPricePer1M: number | null
    outputPricePer1M: number | null
    cacheInputPricePer1M: number | null
    latencyMs: number | null
    throughputTps: number | null
    uptimePct: number | null
    contextLimit: number | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ModelProviderEndpointCountAggregateOutputType = {
    id: number
    modelId: number
    providerId: number
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M: number
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ModelProviderEndpointAvgAggregateInputType = {
    inputPricePer1M?: true
    outputPricePer1M?: true
    cacheInputPricePer1M?: true
    latencyMs?: true
    throughputTps?: true
    uptimePct?: true
    contextLimit?: true
  }

  export type ModelProviderEndpointSumAggregateInputType = {
    inputPricePer1M?: true
    outputPricePer1M?: true
    cacheInputPricePer1M?: true
    latencyMs?: true
    throughputTps?: true
    uptimePct?: true
    contextLimit?: true
  }

  export type ModelProviderEndpointMinAggregateInputType = {
    id?: true
    modelId?: true
    providerId?: true
    inputPricePer1M?: true
    outputPricePer1M?: true
    cacheInputPricePer1M?: true
    latencyMs?: true
    throughputTps?: true
    uptimePct?: true
    contextLimit?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModelProviderEndpointMaxAggregateInputType = {
    id?: true
    modelId?: true
    providerId?: true
    inputPricePer1M?: true
    outputPricePer1M?: true
    cacheInputPricePer1M?: true
    latencyMs?: true
    throughputTps?: true
    uptimePct?: true
    contextLimit?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ModelProviderEndpointCountAggregateInputType = {
    id?: true
    modelId?: true
    providerId?: true
    inputPricePer1M?: true
    outputPricePer1M?: true
    cacheInputPricePer1M?: true
    latencyMs?: true
    throughputTps?: true
    uptimePct?: true
    contextLimit?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ModelProviderEndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelProviderEndpoint to aggregate.
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelProviderEndpoints to fetch.
     */
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModelProviderEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelProviderEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelProviderEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModelProviderEndpoints
    **/
    _count?: true | ModelProviderEndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModelProviderEndpointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModelProviderEndpointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModelProviderEndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModelProviderEndpointMaxAggregateInputType
  }

  export type GetModelProviderEndpointAggregateType<T extends ModelProviderEndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateModelProviderEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModelProviderEndpoint[P]>
      : GetScalarType<T[P], AggregateModelProviderEndpoint[P]>
  }




  export type ModelProviderEndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModelProviderEndpointWhereInput
    orderBy?: ModelProviderEndpointOrderByWithAggregationInput | ModelProviderEndpointOrderByWithAggregationInput[]
    by: ModelProviderEndpointScalarFieldEnum[] | ModelProviderEndpointScalarFieldEnum
    having?: ModelProviderEndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModelProviderEndpointCountAggregateInputType | true
    _avg?: ModelProviderEndpointAvgAggregateInputType
    _sum?: ModelProviderEndpointSumAggregateInputType
    _min?: ModelProviderEndpointMinAggregateInputType
    _max?: ModelProviderEndpointMaxAggregateInputType
  }

  export type ModelProviderEndpointGroupByOutputType = {
    id: string
    modelId: string
    providerId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: ModelProviderEndpointCountAggregateOutputType | null
    _avg: ModelProviderEndpointAvgAggregateOutputType | null
    _sum: ModelProviderEndpointSumAggregateOutputType | null
    _min: ModelProviderEndpointMinAggregateOutputType | null
    _max: ModelProviderEndpointMaxAggregateOutputType | null
  }

  type GetModelProviderEndpointGroupByPayload<T extends ModelProviderEndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModelProviderEndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModelProviderEndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModelProviderEndpointGroupByOutputType[P]>
            : GetScalarType<T[P], ModelProviderEndpointGroupByOutputType[P]>
        }
      >
    >


  export type ModelProviderEndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    providerId?: boolean
    inputPricePer1M?: boolean
    outputPricePer1M?: boolean
    cacheInputPricePer1M?: boolean
    latencyMs?: boolean
    throughputTps?: boolean
    uptimePct?: boolean
    contextLimit?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelProviderEndpoint"]>

  export type ModelProviderEndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    providerId?: boolean
    inputPricePer1M?: boolean
    outputPricePer1M?: boolean
    cacheInputPricePer1M?: boolean
    latencyMs?: boolean
    throughputTps?: boolean
    uptimePct?: boolean
    contextLimit?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelProviderEndpoint"]>

  export type ModelProviderEndpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    providerId?: boolean
    inputPricePer1M?: boolean
    outputPricePer1M?: boolean
    cacheInputPricePer1M?: boolean
    latencyMs?: boolean
    throughputTps?: boolean
    uptimePct?: boolean
    contextLimit?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["modelProviderEndpoint"]>

  export type ModelProviderEndpointSelectScalar = {
    id?: boolean
    modelId?: boolean
    providerId?: boolean
    inputPricePer1M?: boolean
    outputPricePer1M?: boolean
    cacheInputPricePer1M?: boolean
    latencyMs?: boolean
    throughputTps?: boolean
    uptimePct?: boolean
    contextLimit?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ModelProviderEndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "modelId" | "providerId" | "inputPricePer1M" | "outputPricePer1M" | "cacheInputPricePer1M" | "latencyMs" | "throughputTps" | "uptimePct" | "contextLimit" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["modelProviderEndpoint"]>
  export type ModelProviderEndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }
  export type ModelProviderEndpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }
  export type ModelProviderEndpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
  }

  export type $ModelProviderEndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModelProviderEndpoint"
    objects: {
      model: Prisma.$ModelPayload<ExtArgs>
      provider: Prisma.$ProviderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      modelId: string
      providerId: string
      inputPricePer1M: number
      outputPricePer1M: number
      cacheInputPricePer1M: number | null
      latencyMs: number
      throughputTps: number
      uptimePct: number
      contextLimit: number
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["modelProviderEndpoint"]>
    composites: {}
  }

  type ModelProviderEndpointGetPayload<S extends boolean | null | undefined | ModelProviderEndpointDefaultArgs> = $Result.GetResult<Prisma.$ModelProviderEndpointPayload, S>

  type ModelProviderEndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModelProviderEndpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModelProviderEndpointCountAggregateInputType | true
    }

  export interface ModelProviderEndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModelProviderEndpoint'], meta: { name: 'ModelProviderEndpoint' } }
    /**
     * Find zero or one ModelProviderEndpoint that matches the filter.
     * @param {ModelProviderEndpointFindUniqueArgs} args - Arguments to find a ModelProviderEndpoint
     * @example
     * // Get one ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModelProviderEndpointFindUniqueArgs>(args: SelectSubset<T, ModelProviderEndpointFindUniqueArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModelProviderEndpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModelProviderEndpointFindUniqueOrThrowArgs} args - Arguments to find a ModelProviderEndpoint
     * @example
     * // Get one ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModelProviderEndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, ModelProviderEndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModelProviderEndpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointFindFirstArgs} args - Arguments to find a ModelProviderEndpoint
     * @example
     * // Get one ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModelProviderEndpointFindFirstArgs>(args?: SelectSubset<T, ModelProviderEndpointFindFirstArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModelProviderEndpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointFindFirstOrThrowArgs} args - Arguments to find a ModelProviderEndpoint
     * @example
     * // Get one ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModelProviderEndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, ModelProviderEndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModelProviderEndpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModelProviderEndpoints
     * const modelProviderEndpoints = await prisma.modelProviderEndpoint.findMany()
     * 
     * // Get first 10 ModelProviderEndpoints
     * const modelProviderEndpoints = await prisma.modelProviderEndpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modelProviderEndpointWithIdOnly = await prisma.modelProviderEndpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModelProviderEndpointFindManyArgs>(args?: SelectSubset<T, ModelProviderEndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModelProviderEndpoint.
     * @param {ModelProviderEndpointCreateArgs} args - Arguments to create a ModelProviderEndpoint.
     * @example
     * // Create one ModelProviderEndpoint
     * const ModelProviderEndpoint = await prisma.modelProviderEndpoint.create({
     *   data: {
     *     // ... data to create a ModelProviderEndpoint
     *   }
     * })
     * 
     */
    create<T extends ModelProviderEndpointCreateArgs>(args: SelectSubset<T, ModelProviderEndpointCreateArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModelProviderEndpoints.
     * @param {ModelProviderEndpointCreateManyArgs} args - Arguments to create many ModelProviderEndpoints.
     * @example
     * // Create many ModelProviderEndpoints
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModelProviderEndpointCreateManyArgs>(args?: SelectSubset<T, ModelProviderEndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModelProviderEndpoints and returns the data saved in the database.
     * @param {ModelProviderEndpointCreateManyAndReturnArgs} args - Arguments to create many ModelProviderEndpoints.
     * @example
     * // Create many ModelProviderEndpoints
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModelProviderEndpoints and only return the `id`
     * const modelProviderEndpointWithIdOnly = await prisma.modelProviderEndpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModelProviderEndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, ModelProviderEndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModelProviderEndpoint.
     * @param {ModelProviderEndpointDeleteArgs} args - Arguments to delete one ModelProviderEndpoint.
     * @example
     * // Delete one ModelProviderEndpoint
     * const ModelProviderEndpoint = await prisma.modelProviderEndpoint.delete({
     *   where: {
     *     // ... filter to delete one ModelProviderEndpoint
     *   }
     * })
     * 
     */
    delete<T extends ModelProviderEndpointDeleteArgs>(args: SelectSubset<T, ModelProviderEndpointDeleteArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModelProviderEndpoint.
     * @param {ModelProviderEndpointUpdateArgs} args - Arguments to update one ModelProviderEndpoint.
     * @example
     * // Update one ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModelProviderEndpointUpdateArgs>(args: SelectSubset<T, ModelProviderEndpointUpdateArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModelProviderEndpoints.
     * @param {ModelProviderEndpointDeleteManyArgs} args - Arguments to filter ModelProviderEndpoints to delete.
     * @example
     * // Delete a few ModelProviderEndpoints
     * const { count } = await prisma.modelProviderEndpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModelProviderEndpointDeleteManyArgs>(args?: SelectSubset<T, ModelProviderEndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModelProviderEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModelProviderEndpoints
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModelProviderEndpointUpdateManyArgs>(args: SelectSubset<T, ModelProviderEndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModelProviderEndpoints and returns the data updated in the database.
     * @param {ModelProviderEndpointUpdateManyAndReturnArgs} args - Arguments to update many ModelProviderEndpoints.
     * @example
     * // Update many ModelProviderEndpoints
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModelProviderEndpoints and only return the `id`
     * const modelProviderEndpointWithIdOnly = await prisma.modelProviderEndpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModelProviderEndpointUpdateManyAndReturnArgs>(args: SelectSubset<T, ModelProviderEndpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModelProviderEndpoint.
     * @param {ModelProviderEndpointUpsertArgs} args - Arguments to update or create a ModelProviderEndpoint.
     * @example
     * // Update or create a ModelProviderEndpoint
     * const modelProviderEndpoint = await prisma.modelProviderEndpoint.upsert({
     *   create: {
     *     // ... data to create a ModelProviderEndpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModelProviderEndpoint we want to update
     *   }
     * })
     */
    upsert<T extends ModelProviderEndpointUpsertArgs>(args: SelectSubset<T, ModelProviderEndpointUpsertArgs<ExtArgs>>): Prisma__ModelProviderEndpointClient<$Result.GetResult<Prisma.$ModelProviderEndpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModelProviderEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointCountArgs} args - Arguments to filter ModelProviderEndpoints to count.
     * @example
     * // Count the number of ModelProviderEndpoints
     * const count = await prisma.modelProviderEndpoint.count({
     *   where: {
     *     // ... the filter for the ModelProviderEndpoints we want to count
     *   }
     * })
    **/
    count<T extends ModelProviderEndpointCountArgs>(
      args?: Subset<T, ModelProviderEndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModelProviderEndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModelProviderEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModelProviderEndpointAggregateArgs>(args: Subset<T, ModelProviderEndpointAggregateArgs>): Prisma.PrismaPromise<GetModelProviderEndpointAggregateType<T>>

    /**
     * Group by ModelProviderEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModelProviderEndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModelProviderEndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModelProviderEndpointGroupByArgs['orderBy'] }
        : { orderBy?: ModelProviderEndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModelProviderEndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelProviderEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModelProviderEndpoint model
   */
  readonly fields: ModelProviderEndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModelProviderEndpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModelProviderEndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends ModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModelDefaultArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    provider<T extends ProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProviderDefaultArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModelProviderEndpoint model
   */
  interface ModelProviderEndpointFieldRefs {
    readonly id: FieldRef<"ModelProviderEndpoint", 'String'>
    readonly modelId: FieldRef<"ModelProviderEndpoint", 'String'>
    readonly providerId: FieldRef<"ModelProviderEndpoint", 'String'>
    readonly inputPricePer1M: FieldRef<"ModelProviderEndpoint", 'Float'>
    readonly outputPricePer1M: FieldRef<"ModelProviderEndpoint", 'Float'>
    readonly cacheInputPricePer1M: FieldRef<"ModelProviderEndpoint", 'Float'>
    readonly latencyMs: FieldRef<"ModelProviderEndpoint", 'Int'>
    readonly throughputTps: FieldRef<"ModelProviderEndpoint", 'Int'>
    readonly uptimePct: FieldRef<"ModelProviderEndpoint", 'Float'>
    readonly contextLimit: FieldRef<"ModelProviderEndpoint", 'Int'>
    readonly isDefault: FieldRef<"ModelProviderEndpoint", 'Boolean'>
    readonly createdAt: FieldRef<"ModelProviderEndpoint", 'DateTime'>
    readonly updatedAt: FieldRef<"ModelProviderEndpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModelProviderEndpoint findUnique
   */
  export type ModelProviderEndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter, which ModelProviderEndpoint to fetch.
     */
    where: ModelProviderEndpointWhereUniqueInput
  }

  /**
   * ModelProviderEndpoint findUniqueOrThrow
   */
  export type ModelProviderEndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter, which ModelProviderEndpoint to fetch.
     */
    where: ModelProviderEndpointWhereUniqueInput
  }

  /**
   * ModelProviderEndpoint findFirst
   */
  export type ModelProviderEndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter, which ModelProviderEndpoint to fetch.
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelProviderEndpoints to fetch.
     */
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelProviderEndpoints.
     */
    cursor?: ModelProviderEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelProviderEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelProviderEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelProviderEndpoints.
     */
    distinct?: ModelProviderEndpointScalarFieldEnum | ModelProviderEndpointScalarFieldEnum[]
  }

  /**
   * ModelProviderEndpoint findFirstOrThrow
   */
  export type ModelProviderEndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter, which ModelProviderEndpoint to fetch.
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelProviderEndpoints to fetch.
     */
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModelProviderEndpoints.
     */
    cursor?: ModelProviderEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelProviderEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelProviderEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelProviderEndpoints.
     */
    distinct?: ModelProviderEndpointScalarFieldEnum | ModelProviderEndpointScalarFieldEnum[]
  }

  /**
   * ModelProviderEndpoint findMany
   */
  export type ModelProviderEndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter, which ModelProviderEndpoints to fetch.
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModelProviderEndpoints to fetch.
     */
    orderBy?: ModelProviderEndpointOrderByWithRelationInput | ModelProviderEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModelProviderEndpoints.
     */
    cursor?: ModelProviderEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModelProviderEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModelProviderEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModelProviderEndpoints.
     */
    distinct?: ModelProviderEndpointScalarFieldEnum | ModelProviderEndpointScalarFieldEnum[]
  }

  /**
   * ModelProviderEndpoint create
   */
  export type ModelProviderEndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * The data needed to create a ModelProviderEndpoint.
     */
    data: XOR<ModelProviderEndpointCreateInput, ModelProviderEndpointUncheckedCreateInput>
  }

  /**
   * ModelProviderEndpoint createMany
   */
  export type ModelProviderEndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModelProviderEndpoints.
     */
    data: ModelProviderEndpointCreateManyInput | ModelProviderEndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModelProviderEndpoint createManyAndReturn
   */
  export type ModelProviderEndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * The data used to create many ModelProviderEndpoints.
     */
    data: ModelProviderEndpointCreateManyInput | ModelProviderEndpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModelProviderEndpoint update
   */
  export type ModelProviderEndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * The data needed to update a ModelProviderEndpoint.
     */
    data: XOR<ModelProviderEndpointUpdateInput, ModelProviderEndpointUncheckedUpdateInput>
    /**
     * Choose, which ModelProviderEndpoint to update.
     */
    where: ModelProviderEndpointWhereUniqueInput
  }

  /**
   * ModelProviderEndpoint updateMany
   */
  export type ModelProviderEndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModelProviderEndpoints.
     */
    data: XOR<ModelProviderEndpointUpdateManyMutationInput, ModelProviderEndpointUncheckedUpdateManyInput>
    /**
     * Filter which ModelProviderEndpoints to update
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * Limit how many ModelProviderEndpoints to update.
     */
    limit?: number
  }

  /**
   * ModelProviderEndpoint updateManyAndReturn
   */
  export type ModelProviderEndpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * The data used to update ModelProviderEndpoints.
     */
    data: XOR<ModelProviderEndpointUpdateManyMutationInput, ModelProviderEndpointUncheckedUpdateManyInput>
    /**
     * Filter which ModelProviderEndpoints to update
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * Limit how many ModelProviderEndpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ModelProviderEndpoint upsert
   */
  export type ModelProviderEndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * The filter to search for the ModelProviderEndpoint to update in case it exists.
     */
    where: ModelProviderEndpointWhereUniqueInput
    /**
     * In case the ModelProviderEndpoint found by the `where` argument doesn't exist, create a new ModelProviderEndpoint with this data.
     */
    create: XOR<ModelProviderEndpointCreateInput, ModelProviderEndpointUncheckedCreateInput>
    /**
     * In case the ModelProviderEndpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModelProviderEndpointUpdateInput, ModelProviderEndpointUncheckedUpdateInput>
  }

  /**
   * ModelProviderEndpoint delete
   */
  export type ModelProviderEndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
    /**
     * Filter which ModelProviderEndpoint to delete.
     */
    where: ModelProviderEndpointWhereUniqueInput
  }

  /**
   * ModelProviderEndpoint deleteMany
   */
  export type ModelProviderEndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModelProviderEndpoints to delete
     */
    where?: ModelProviderEndpointWhereInput
    /**
     * Limit how many ModelProviderEndpoints to delete.
     */
    limit?: number
  }

  /**
   * ModelProviderEndpoint without action
   */
  export type ModelProviderEndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModelProviderEndpoint
     */
    select?: ModelProviderEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModelProviderEndpoint
     */
    omit?: ModelProviderEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ModelProviderEndpointInclude<ExtArgs> | null
  }


  /**
   * Model BenchmarkScore
   */

  export type AggregateBenchmarkScore = {
    _count: BenchmarkScoreCountAggregateOutputType | null
    _avg: BenchmarkScoreAvgAggregateOutputType | null
    _sum: BenchmarkScoreSumAggregateOutputType | null
    _min: BenchmarkScoreMinAggregateOutputType | null
    _max: BenchmarkScoreMaxAggregateOutputType | null
  }

  export type BenchmarkScoreAvgAggregateOutputType = {
    score: number | null
    maxScore: number | null
  }

  export type BenchmarkScoreSumAggregateOutputType = {
    score: number | null
    maxScore: number | null
  }

  export type BenchmarkScoreMinAggregateOutputType = {
    id: string | null
    modelId: string | null
    benchmarkName: string | null
    category: $Enums.BenchmarkCategory | null
    score: number | null
    maxScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BenchmarkScoreMaxAggregateOutputType = {
    id: string | null
    modelId: string | null
    benchmarkName: string | null
    category: $Enums.BenchmarkCategory | null
    score: number | null
    maxScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BenchmarkScoreCountAggregateOutputType = {
    id: number
    modelId: number
    benchmarkName: number
    category: number
    score: number
    maxScore: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BenchmarkScoreAvgAggregateInputType = {
    score?: true
    maxScore?: true
  }

  export type BenchmarkScoreSumAggregateInputType = {
    score?: true
    maxScore?: true
  }

  export type BenchmarkScoreMinAggregateInputType = {
    id?: true
    modelId?: true
    benchmarkName?: true
    category?: true
    score?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BenchmarkScoreMaxAggregateInputType = {
    id?: true
    modelId?: true
    benchmarkName?: true
    category?: true
    score?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BenchmarkScoreCountAggregateInputType = {
    id?: true
    modelId?: true
    benchmarkName?: true
    category?: true
    score?: true
    maxScore?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BenchmarkScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenchmarkScore to aggregate.
     */
    where?: BenchmarkScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenchmarkScores to fetch.
     */
    orderBy?: BenchmarkScoreOrderByWithRelationInput | BenchmarkScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BenchmarkScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenchmarkScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenchmarkScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BenchmarkScores
    **/
    _count?: true | BenchmarkScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BenchmarkScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BenchmarkScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BenchmarkScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BenchmarkScoreMaxAggregateInputType
  }

  export type GetBenchmarkScoreAggregateType<T extends BenchmarkScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateBenchmarkScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBenchmarkScore[P]>
      : GetScalarType<T[P], AggregateBenchmarkScore[P]>
  }




  export type BenchmarkScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BenchmarkScoreWhereInput
    orderBy?: BenchmarkScoreOrderByWithAggregationInput | BenchmarkScoreOrderByWithAggregationInput[]
    by: BenchmarkScoreScalarFieldEnum[] | BenchmarkScoreScalarFieldEnum
    having?: BenchmarkScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BenchmarkScoreCountAggregateInputType | true
    _avg?: BenchmarkScoreAvgAggregateInputType
    _sum?: BenchmarkScoreSumAggregateInputType
    _min?: BenchmarkScoreMinAggregateInputType
    _max?: BenchmarkScoreMaxAggregateInputType
  }

  export type BenchmarkScoreGroupByOutputType = {
    id: string
    modelId: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt: Date
    updatedAt: Date
    _count: BenchmarkScoreCountAggregateOutputType | null
    _avg: BenchmarkScoreAvgAggregateOutputType | null
    _sum: BenchmarkScoreSumAggregateOutputType | null
    _min: BenchmarkScoreMinAggregateOutputType | null
    _max: BenchmarkScoreMaxAggregateOutputType | null
  }

  type GetBenchmarkScoreGroupByPayload<T extends BenchmarkScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BenchmarkScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BenchmarkScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BenchmarkScoreGroupByOutputType[P]>
            : GetScalarType<T[P], BenchmarkScoreGroupByOutputType[P]>
        }
      >
    >


  export type BenchmarkScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    benchmarkName?: boolean
    category?: boolean
    score?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benchmarkScore"]>

  export type BenchmarkScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    benchmarkName?: boolean
    category?: boolean
    score?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benchmarkScore"]>

  export type BenchmarkScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    benchmarkName?: boolean
    category?: boolean
    score?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["benchmarkScore"]>

  export type BenchmarkScoreSelectScalar = {
    id?: boolean
    modelId?: boolean
    benchmarkName?: boolean
    category?: boolean
    score?: boolean
    maxScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BenchmarkScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "modelId" | "benchmarkName" | "category" | "score" | "maxScore" | "createdAt" | "updatedAt", ExtArgs["result"]["benchmarkScore"]>
  export type BenchmarkScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }
  export type BenchmarkScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }
  export type BenchmarkScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ModelDefaultArgs<ExtArgs>
  }

  export type $BenchmarkScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BenchmarkScore"
    objects: {
      model: Prisma.$ModelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      modelId: string
      benchmarkName: string
      category: $Enums.BenchmarkCategory
      score: number
      maxScore: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["benchmarkScore"]>
    composites: {}
  }

  type BenchmarkScoreGetPayload<S extends boolean | null | undefined | BenchmarkScoreDefaultArgs> = $Result.GetResult<Prisma.$BenchmarkScorePayload, S>

  type BenchmarkScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BenchmarkScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BenchmarkScoreCountAggregateInputType | true
    }

  export interface BenchmarkScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BenchmarkScore'], meta: { name: 'BenchmarkScore' } }
    /**
     * Find zero or one BenchmarkScore that matches the filter.
     * @param {BenchmarkScoreFindUniqueArgs} args - Arguments to find a BenchmarkScore
     * @example
     * // Get one BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BenchmarkScoreFindUniqueArgs>(args: SelectSubset<T, BenchmarkScoreFindUniqueArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BenchmarkScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BenchmarkScoreFindUniqueOrThrowArgs} args - Arguments to find a BenchmarkScore
     * @example
     * // Get one BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BenchmarkScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, BenchmarkScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenchmarkScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreFindFirstArgs} args - Arguments to find a BenchmarkScore
     * @example
     * // Get one BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BenchmarkScoreFindFirstArgs>(args?: SelectSubset<T, BenchmarkScoreFindFirstArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BenchmarkScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreFindFirstOrThrowArgs} args - Arguments to find a BenchmarkScore
     * @example
     * // Get one BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BenchmarkScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, BenchmarkScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BenchmarkScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BenchmarkScores
     * const benchmarkScores = await prisma.benchmarkScore.findMany()
     * 
     * // Get first 10 BenchmarkScores
     * const benchmarkScores = await prisma.benchmarkScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const benchmarkScoreWithIdOnly = await prisma.benchmarkScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BenchmarkScoreFindManyArgs>(args?: SelectSubset<T, BenchmarkScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BenchmarkScore.
     * @param {BenchmarkScoreCreateArgs} args - Arguments to create a BenchmarkScore.
     * @example
     * // Create one BenchmarkScore
     * const BenchmarkScore = await prisma.benchmarkScore.create({
     *   data: {
     *     // ... data to create a BenchmarkScore
     *   }
     * })
     * 
     */
    create<T extends BenchmarkScoreCreateArgs>(args: SelectSubset<T, BenchmarkScoreCreateArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BenchmarkScores.
     * @param {BenchmarkScoreCreateManyArgs} args - Arguments to create many BenchmarkScores.
     * @example
     * // Create many BenchmarkScores
     * const benchmarkScore = await prisma.benchmarkScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BenchmarkScoreCreateManyArgs>(args?: SelectSubset<T, BenchmarkScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BenchmarkScores and returns the data saved in the database.
     * @param {BenchmarkScoreCreateManyAndReturnArgs} args - Arguments to create many BenchmarkScores.
     * @example
     * // Create many BenchmarkScores
     * const benchmarkScore = await prisma.benchmarkScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BenchmarkScores and only return the `id`
     * const benchmarkScoreWithIdOnly = await prisma.benchmarkScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BenchmarkScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, BenchmarkScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BenchmarkScore.
     * @param {BenchmarkScoreDeleteArgs} args - Arguments to delete one BenchmarkScore.
     * @example
     * // Delete one BenchmarkScore
     * const BenchmarkScore = await prisma.benchmarkScore.delete({
     *   where: {
     *     // ... filter to delete one BenchmarkScore
     *   }
     * })
     * 
     */
    delete<T extends BenchmarkScoreDeleteArgs>(args: SelectSubset<T, BenchmarkScoreDeleteArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BenchmarkScore.
     * @param {BenchmarkScoreUpdateArgs} args - Arguments to update one BenchmarkScore.
     * @example
     * // Update one BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BenchmarkScoreUpdateArgs>(args: SelectSubset<T, BenchmarkScoreUpdateArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BenchmarkScores.
     * @param {BenchmarkScoreDeleteManyArgs} args - Arguments to filter BenchmarkScores to delete.
     * @example
     * // Delete a few BenchmarkScores
     * const { count } = await prisma.benchmarkScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BenchmarkScoreDeleteManyArgs>(args?: SelectSubset<T, BenchmarkScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenchmarkScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BenchmarkScores
     * const benchmarkScore = await prisma.benchmarkScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BenchmarkScoreUpdateManyArgs>(args: SelectSubset<T, BenchmarkScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BenchmarkScores and returns the data updated in the database.
     * @param {BenchmarkScoreUpdateManyAndReturnArgs} args - Arguments to update many BenchmarkScores.
     * @example
     * // Update many BenchmarkScores
     * const benchmarkScore = await prisma.benchmarkScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BenchmarkScores and only return the `id`
     * const benchmarkScoreWithIdOnly = await prisma.benchmarkScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BenchmarkScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, BenchmarkScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BenchmarkScore.
     * @param {BenchmarkScoreUpsertArgs} args - Arguments to update or create a BenchmarkScore.
     * @example
     * // Update or create a BenchmarkScore
     * const benchmarkScore = await prisma.benchmarkScore.upsert({
     *   create: {
     *     // ... data to create a BenchmarkScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BenchmarkScore we want to update
     *   }
     * })
     */
    upsert<T extends BenchmarkScoreUpsertArgs>(args: SelectSubset<T, BenchmarkScoreUpsertArgs<ExtArgs>>): Prisma__BenchmarkScoreClient<$Result.GetResult<Prisma.$BenchmarkScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BenchmarkScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreCountArgs} args - Arguments to filter BenchmarkScores to count.
     * @example
     * // Count the number of BenchmarkScores
     * const count = await prisma.benchmarkScore.count({
     *   where: {
     *     // ... the filter for the BenchmarkScores we want to count
     *   }
     * })
    **/
    count<T extends BenchmarkScoreCountArgs>(
      args?: Subset<T, BenchmarkScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BenchmarkScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BenchmarkScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BenchmarkScoreAggregateArgs>(args: Subset<T, BenchmarkScoreAggregateArgs>): Prisma.PrismaPromise<GetBenchmarkScoreAggregateType<T>>

    /**
     * Group by BenchmarkScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BenchmarkScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BenchmarkScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BenchmarkScoreGroupByArgs['orderBy'] }
        : { orderBy?: BenchmarkScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BenchmarkScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBenchmarkScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BenchmarkScore model
   */
  readonly fields: BenchmarkScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BenchmarkScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BenchmarkScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends ModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModelDefaultArgs<ExtArgs>>): Prisma__ModelClient<$Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BenchmarkScore model
   */
  interface BenchmarkScoreFieldRefs {
    readonly id: FieldRef<"BenchmarkScore", 'String'>
    readonly modelId: FieldRef<"BenchmarkScore", 'String'>
    readonly benchmarkName: FieldRef<"BenchmarkScore", 'String'>
    readonly category: FieldRef<"BenchmarkScore", 'BenchmarkCategory'>
    readonly score: FieldRef<"BenchmarkScore", 'Float'>
    readonly maxScore: FieldRef<"BenchmarkScore", 'Float'>
    readonly createdAt: FieldRef<"BenchmarkScore", 'DateTime'>
    readonly updatedAt: FieldRef<"BenchmarkScore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BenchmarkScore findUnique
   */
  export type BenchmarkScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter, which BenchmarkScore to fetch.
     */
    where: BenchmarkScoreWhereUniqueInput
  }

  /**
   * BenchmarkScore findUniqueOrThrow
   */
  export type BenchmarkScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter, which BenchmarkScore to fetch.
     */
    where: BenchmarkScoreWhereUniqueInput
  }

  /**
   * BenchmarkScore findFirst
   */
  export type BenchmarkScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter, which BenchmarkScore to fetch.
     */
    where?: BenchmarkScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenchmarkScores to fetch.
     */
    orderBy?: BenchmarkScoreOrderByWithRelationInput | BenchmarkScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenchmarkScores.
     */
    cursor?: BenchmarkScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenchmarkScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenchmarkScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenchmarkScores.
     */
    distinct?: BenchmarkScoreScalarFieldEnum | BenchmarkScoreScalarFieldEnum[]
  }

  /**
   * BenchmarkScore findFirstOrThrow
   */
  export type BenchmarkScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter, which BenchmarkScore to fetch.
     */
    where?: BenchmarkScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenchmarkScores to fetch.
     */
    orderBy?: BenchmarkScoreOrderByWithRelationInput | BenchmarkScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BenchmarkScores.
     */
    cursor?: BenchmarkScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenchmarkScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenchmarkScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenchmarkScores.
     */
    distinct?: BenchmarkScoreScalarFieldEnum | BenchmarkScoreScalarFieldEnum[]
  }

  /**
   * BenchmarkScore findMany
   */
  export type BenchmarkScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter, which BenchmarkScores to fetch.
     */
    where?: BenchmarkScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BenchmarkScores to fetch.
     */
    orderBy?: BenchmarkScoreOrderByWithRelationInput | BenchmarkScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BenchmarkScores.
     */
    cursor?: BenchmarkScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BenchmarkScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BenchmarkScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BenchmarkScores.
     */
    distinct?: BenchmarkScoreScalarFieldEnum | BenchmarkScoreScalarFieldEnum[]
  }

  /**
   * BenchmarkScore create
   */
  export type BenchmarkScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a BenchmarkScore.
     */
    data: XOR<BenchmarkScoreCreateInput, BenchmarkScoreUncheckedCreateInput>
  }

  /**
   * BenchmarkScore createMany
   */
  export type BenchmarkScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BenchmarkScores.
     */
    data: BenchmarkScoreCreateManyInput | BenchmarkScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BenchmarkScore createManyAndReturn
   */
  export type BenchmarkScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * The data used to create many BenchmarkScores.
     */
    data: BenchmarkScoreCreateManyInput | BenchmarkScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenchmarkScore update
   */
  export type BenchmarkScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a BenchmarkScore.
     */
    data: XOR<BenchmarkScoreUpdateInput, BenchmarkScoreUncheckedUpdateInput>
    /**
     * Choose, which BenchmarkScore to update.
     */
    where: BenchmarkScoreWhereUniqueInput
  }

  /**
   * BenchmarkScore updateMany
   */
  export type BenchmarkScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BenchmarkScores.
     */
    data: XOR<BenchmarkScoreUpdateManyMutationInput, BenchmarkScoreUncheckedUpdateManyInput>
    /**
     * Filter which BenchmarkScores to update
     */
    where?: BenchmarkScoreWhereInput
    /**
     * Limit how many BenchmarkScores to update.
     */
    limit?: number
  }

  /**
   * BenchmarkScore updateManyAndReturn
   */
  export type BenchmarkScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * The data used to update BenchmarkScores.
     */
    data: XOR<BenchmarkScoreUpdateManyMutationInput, BenchmarkScoreUncheckedUpdateManyInput>
    /**
     * Filter which BenchmarkScores to update
     */
    where?: BenchmarkScoreWhereInput
    /**
     * Limit how many BenchmarkScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BenchmarkScore upsert
   */
  export type BenchmarkScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the BenchmarkScore to update in case it exists.
     */
    where: BenchmarkScoreWhereUniqueInput
    /**
     * In case the BenchmarkScore found by the `where` argument doesn't exist, create a new BenchmarkScore with this data.
     */
    create: XOR<BenchmarkScoreCreateInput, BenchmarkScoreUncheckedCreateInput>
    /**
     * In case the BenchmarkScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BenchmarkScoreUpdateInput, BenchmarkScoreUncheckedUpdateInput>
  }

  /**
   * BenchmarkScore delete
   */
  export type BenchmarkScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
    /**
     * Filter which BenchmarkScore to delete.
     */
    where: BenchmarkScoreWhereUniqueInput
  }

  /**
   * BenchmarkScore deleteMany
   */
  export type BenchmarkScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BenchmarkScores to delete
     */
    where?: BenchmarkScoreWhereInput
    /**
     * Limit how many BenchmarkScores to delete.
     */
    limit?: number
  }

  /**
   * BenchmarkScore without action
   */
  export type BenchmarkScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BenchmarkScore
     */
    select?: BenchmarkScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BenchmarkScore
     */
    omit?: BenchmarkScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BenchmarkScoreInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LabScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    logoSlug: 'logoSlug',
    description: 'description',
    website: 'website',
    headquarters: 'headquarters',
    foundedYear: 'foundedYear',
    verified: 'verified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LabScalarFieldEnum = (typeof LabScalarFieldEnum)[keyof typeof LabScalarFieldEnum]


  export const ProviderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    logoSlug: 'logoSlug',
    type: 'type',
    description: 'description',
    website: 'website',
    regions: 'regions',
    slaTier: 'slaTier',
    uptime30d: 'uptime30d',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]


  export const ModelScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    labId: 'labId',
    modality: 'modality',
    modelType: 'modelType',
    isOpenWeights: 'isOpenWeights',
    license: 'license',
    contextWindow: 'contextWindow',
    maxOutputTokens: 'maxOutputTokens',
    trainingCutoff: 'trainingCutoff',
    capabilities: 'capabilities',
    supportsCaching: 'supportsCaching',
    releaseDate: 'releaseDate',
    description: 'description',
    compositeScore: 'compositeScore',
    rankCurrent: 'rankCurrent',
    rankPrevious: 'rankPrevious',
    usageDelta7d: 'usageDelta7d',
    sparkline7d: 'sparkline7d',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModelScalarFieldEnum = (typeof ModelScalarFieldEnum)[keyof typeof ModelScalarFieldEnum]


  export const ModelProviderEndpointScalarFieldEnum: {
    id: 'id',
    modelId: 'modelId',
    providerId: 'providerId',
    inputPricePer1M: 'inputPricePer1M',
    outputPricePer1M: 'outputPricePer1M',
    cacheInputPricePer1M: 'cacheInputPricePer1M',
    latencyMs: 'latencyMs',
    throughputTps: 'throughputTps',
    uptimePct: 'uptimePct',
    contextLimit: 'contextLimit',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ModelProviderEndpointScalarFieldEnum = (typeof ModelProviderEndpointScalarFieldEnum)[keyof typeof ModelProviderEndpointScalarFieldEnum]


  export const BenchmarkScoreScalarFieldEnum: {
    id: 'id',
    modelId: 'modelId',
    benchmarkName: 'benchmarkName',
    category: 'category',
    score: 'score',
    maxScore: 'maxScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BenchmarkScoreScalarFieldEnum = (typeof BenchmarkScoreScalarFieldEnum)[keyof typeof BenchmarkScoreScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ProviderType'
   */
  export type EnumProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProviderType'>
    


  /**
   * Reference to a field of type 'ProviderType[]'
   */
  export type ListEnumProviderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProviderType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Modality'
   */
  export type EnumModalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modality'>
    


  /**
   * Reference to a field of type 'Modality[]'
   */
  export type ListEnumModalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Modality[]'>
    


  /**
   * Reference to a field of type 'ModelType'
   */
  export type EnumModelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModelType'>
    


  /**
   * Reference to a field of type 'ModelType[]'
   */
  export type ListEnumModelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModelType[]'>
    


  /**
   * Reference to a field of type 'BenchmarkCategory'
   */
  export type EnumBenchmarkCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BenchmarkCategory'>
    


  /**
   * Reference to a field of type 'BenchmarkCategory[]'
   */
  export type ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BenchmarkCategory[]'>
    
  /**
   * Deep Input Types
   */


  export type LabWhereInput = {
    AND?: LabWhereInput | LabWhereInput[]
    OR?: LabWhereInput[]
    NOT?: LabWhereInput | LabWhereInput[]
    id?: StringFilter<"Lab"> | string
    name?: StringFilter<"Lab"> | string
    slug?: StringFilter<"Lab"> | string
    logoSlug?: StringFilter<"Lab"> | string
    description?: StringFilter<"Lab"> | string
    website?: StringFilter<"Lab"> | string
    headquarters?: StringFilter<"Lab"> | string
    foundedYear?: IntFilter<"Lab"> | number
    verified?: BoolFilter<"Lab"> | boolean
    createdAt?: DateTimeFilter<"Lab"> | Date | string
    updatedAt?: DateTimeFilter<"Lab"> | Date | string
    models?: ModelListRelationFilter
  }

  export type LabOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    description?: SortOrder
    website?: SortOrder
    headquarters?: SortOrder
    foundedYear?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    models?: ModelOrderByRelationAggregateInput
  }

  export type LabWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: LabWhereInput | LabWhereInput[]
    OR?: LabWhereInput[]
    NOT?: LabWhereInput | LabWhereInput[]
    name?: StringFilter<"Lab"> | string
    logoSlug?: StringFilter<"Lab"> | string
    description?: StringFilter<"Lab"> | string
    website?: StringFilter<"Lab"> | string
    headquarters?: StringFilter<"Lab"> | string
    foundedYear?: IntFilter<"Lab"> | number
    verified?: BoolFilter<"Lab"> | boolean
    createdAt?: DateTimeFilter<"Lab"> | Date | string
    updatedAt?: DateTimeFilter<"Lab"> | Date | string
    models?: ModelListRelationFilter
  }, "id" | "slug">

  export type LabOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    description?: SortOrder
    website?: SortOrder
    headquarters?: SortOrder
    foundedYear?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LabCountOrderByAggregateInput
    _avg?: LabAvgOrderByAggregateInput
    _max?: LabMaxOrderByAggregateInput
    _min?: LabMinOrderByAggregateInput
    _sum?: LabSumOrderByAggregateInput
  }

  export type LabScalarWhereWithAggregatesInput = {
    AND?: LabScalarWhereWithAggregatesInput | LabScalarWhereWithAggregatesInput[]
    OR?: LabScalarWhereWithAggregatesInput[]
    NOT?: LabScalarWhereWithAggregatesInput | LabScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lab"> | string
    name?: StringWithAggregatesFilter<"Lab"> | string
    slug?: StringWithAggregatesFilter<"Lab"> | string
    logoSlug?: StringWithAggregatesFilter<"Lab"> | string
    description?: StringWithAggregatesFilter<"Lab"> | string
    website?: StringWithAggregatesFilter<"Lab"> | string
    headquarters?: StringWithAggregatesFilter<"Lab"> | string
    foundedYear?: IntWithAggregatesFilter<"Lab"> | number
    verified?: BoolWithAggregatesFilter<"Lab"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Lab"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lab"> | Date | string
  }

  export type ProviderWhereInput = {
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    id?: StringFilter<"Provider"> | string
    name?: StringFilter<"Provider"> | string
    slug?: StringFilter<"Provider"> | string
    logoSlug?: StringFilter<"Provider"> | string
    type?: EnumProviderTypeFilter<"Provider"> | $Enums.ProviderType
    description?: StringFilter<"Provider"> | string
    website?: StringFilter<"Provider"> | string
    regions?: StringNullableListFilter<"Provider">
    slaTier?: StringFilter<"Provider"> | string
    uptime30d?: FloatFilter<"Provider"> | number
    createdAt?: DateTimeFilter<"Provider"> | Date | string
    updatedAt?: DateTimeFilter<"Provider"> | Date | string
    endpoints?: ModelProviderEndpointListRelationFilter
  }

  export type ProviderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    regions?: SortOrder
    slaTier?: SortOrder
    uptime30d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    endpoints?: ModelProviderEndpointOrderByRelationAggregateInput
  }

  export type ProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    name?: StringFilter<"Provider"> | string
    logoSlug?: StringFilter<"Provider"> | string
    type?: EnumProviderTypeFilter<"Provider"> | $Enums.ProviderType
    description?: StringFilter<"Provider"> | string
    website?: StringFilter<"Provider"> | string
    regions?: StringNullableListFilter<"Provider">
    slaTier?: StringFilter<"Provider"> | string
    uptime30d?: FloatFilter<"Provider"> | number
    createdAt?: DateTimeFilter<"Provider"> | Date | string
    updatedAt?: DateTimeFilter<"Provider"> | Date | string
    endpoints?: ModelProviderEndpointListRelationFilter
  }, "id" | "slug">

  export type ProviderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    regions?: SortOrder
    slaTier?: SortOrder
    uptime30d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProviderCountOrderByAggregateInput
    _avg?: ProviderAvgOrderByAggregateInput
    _max?: ProviderMaxOrderByAggregateInput
    _min?: ProviderMinOrderByAggregateInput
    _sum?: ProviderSumOrderByAggregateInput
  }

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    OR?: ProviderScalarWhereWithAggregatesInput[]
    NOT?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Provider"> | string
    name?: StringWithAggregatesFilter<"Provider"> | string
    slug?: StringWithAggregatesFilter<"Provider"> | string
    logoSlug?: StringWithAggregatesFilter<"Provider"> | string
    type?: EnumProviderTypeWithAggregatesFilter<"Provider"> | $Enums.ProviderType
    description?: StringWithAggregatesFilter<"Provider"> | string
    website?: StringWithAggregatesFilter<"Provider"> | string
    regions?: StringNullableListFilter<"Provider">
    slaTier?: StringWithAggregatesFilter<"Provider"> | string
    uptime30d?: FloatWithAggregatesFilter<"Provider"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Provider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Provider"> | Date | string
  }

  export type ModelWhereInput = {
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    id?: StringFilter<"Model"> | string
    name?: StringFilter<"Model"> | string
    slug?: StringFilter<"Model"> | string
    labId?: StringFilter<"Model"> | string
    modality?: EnumModalityFilter<"Model"> | $Enums.Modality
    modelType?: EnumModelTypeFilter<"Model"> | $Enums.ModelType
    isOpenWeights?: BoolFilter<"Model"> | boolean
    license?: StringFilter<"Model"> | string
    contextWindow?: IntFilter<"Model"> | number
    maxOutputTokens?: IntFilter<"Model"> | number
    trainingCutoff?: StringFilter<"Model"> | string
    capabilities?: StringNullableListFilter<"Model">
    supportsCaching?: BoolFilter<"Model"> | boolean
    releaseDate?: DateTimeFilter<"Model"> | Date | string
    description?: StringFilter<"Model"> | string
    compositeScore?: FloatFilter<"Model"> | number
    rankCurrent?: IntFilter<"Model"> | number
    rankPrevious?: IntFilter<"Model"> | number
    usageDelta7d?: FloatFilter<"Model"> | number
    sparkline7d?: FloatNullableListFilter<"Model">
    createdAt?: DateTimeFilter<"Model"> | Date | string
    updatedAt?: DateTimeFilter<"Model"> | Date | string
    lab?: XOR<LabScalarRelationFilter, LabWhereInput>
    endpoints?: ModelProviderEndpointListRelationFilter
    benchmarks?: BenchmarkScoreListRelationFilter
  }

  export type ModelOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    labId?: SortOrder
    modality?: SortOrder
    modelType?: SortOrder
    isOpenWeights?: SortOrder
    license?: SortOrder
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    trainingCutoff?: SortOrder
    capabilities?: SortOrder
    supportsCaching?: SortOrder
    releaseDate?: SortOrder
    description?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    sparkline7d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lab?: LabOrderByWithRelationInput
    endpoints?: ModelProviderEndpointOrderByRelationAggregateInput
    benchmarks?: BenchmarkScoreOrderByRelationAggregateInput
  }

  export type ModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ModelWhereInput | ModelWhereInput[]
    OR?: ModelWhereInput[]
    NOT?: ModelWhereInput | ModelWhereInput[]
    name?: StringFilter<"Model"> | string
    labId?: StringFilter<"Model"> | string
    modality?: EnumModalityFilter<"Model"> | $Enums.Modality
    modelType?: EnumModelTypeFilter<"Model"> | $Enums.ModelType
    isOpenWeights?: BoolFilter<"Model"> | boolean
    license?: StringFilter<"Model"> | string
    contextWindow?: IntFilter<"Model"> | number
    maxOutputTokens?: IntFilter<"Model"> | number
    trainingCutoff?: StringFilter<"Model"> | string
    capabilities?: StringNullableListFilter<"Model">
    supportsCaching?: BoolFilter<"Model"> | boolean
    releaseDate?: DateTimeFilter<"Model"> | Date | string
    description?: StringFilter<"Model"> | string
    compositeScore?: FloatFilter<"Model"> | number
    rankCurrent?: IntFilter<"Model"> | number
    rankPrevious?: IntFilter<"Model"> | number
    usageDelta7d?: FloatFilter<"Model"> | number
    sparkline7d?: FloatNullableListFilter<"Model">
    createdAt?: DateTimeFilter<"Model"> | Date | string
    updatedAt?: DateTimeFilter<"Model"> | Date | string
    lab?: XOR<LabScalarRelationFilter, LabWhereInput>
    endpoints?: ModelProviderEndpointListRelationFilter
    benchmarks?: BenchmarkScoreListRelationFilter
  }, "id" | "slug">

  export type ModelOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    labId?: SortOrder
    modality?: SortOrder
    modelType?: SortOrder
    isOpenWeights?: SortOrder
    license?: SortOrder
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    trainingCutoff?: SortOrder
    capabilities?: SortOrder
    supportsCaching?: SortOrder
    releaseDate?: SortOrder
    description?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    sparkline7d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModelCountOrderByAggregateInput
    _avg?: ModelAvgOrderByAggregateInput
    _max?: ModelMaxOrderByAggregateInput
    _min?: ModelMinOrderByAggregateInput
    _sum?: ModelSumOrderByAggregateInput
  }

  export type ModelScalarWhereWithAggregatesInput = {
    AND?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    OR?: ModelScalarWhereWithAggregatesInput[]
    NOT?: ModelScalarWhereWithAggregatesInput | ModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Model"> | string
    name?: StringWithAggregatesFilter<"Model"> | string
    slug?: StringWithAggregatesFilter<"Model"> | string
    labId?: StringWithAggregatesFilter<"Model"> | string
    modality?: EnumModalityWithAggregatesFilter<"Model"> | $Enums.Modality
    modelType?: EnumModelTypeWithAggregatesFilter<"Model"> | $Enums.ModelType
    isOpenWeights?: BoolWithAggregatesFilter<"Model"> | boolean
    license?: StringWithAggregatesFilter<"Model"> | string
    contextWindow?: IntWithAggregatesFilter<"Model"> | number
    maxOutputTokens?: IntWithAggregatesFilter<"Model"> | number
    trainingCutoff?: StringWithAggregatesFilter<"Model"> | string
    capabilities?: StringNullableListFilter<"Model">
    supportsCaching?: BoolWithAggregatesFilter<"Model"> | boolean
    releaseDate?: DateTimeWithAggregatesFilter<"Model"> | Date | string
    description?: StringWithAggregatesFilter<"Model"> | string
    compositeScore?: FloatWithAggregatesFilter<"Model"> | number
    rankCurrent?: IntWithAggregatesFilter<"Model"> | number
    rankPrevious?: IntWithAggregatesFilter<"Model"> | number
    usageDelta7d?: FloatWithAggregatesFilter<"Model"> | number
    sparkline7d?: FloatNullableListFilter<"Model">
    createdAt?: DateTimeWithAggregatesFilter<"Model"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Model"> | Date | string
  }

  export type ModelProviderEndpointWhereInput = {
    AND?: ModelProviderEndpointWhereInput | ModelProviderEndpointWhereInput[]
    OR?: ModelProviderEndpointWhereInput[]
    NOT?: ModelProviderEndpointWhereInput | ModelProviderEndpointWhereInput[]
    id?: StringFilter<"ModelProviderEndpoint"> | string
    modelId?: StringFilter<"ModelProviderEndpoint"> | string
    providerId?: StringFilter<"ModelProviderEndpoint"> | string
    inputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    outputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    cacheInputPricePer1M?: FloatNullableFilter<"ModelProviderEndpoint"> | number | null
    latencyMs?: IntFilter<"ModelProviderEndpoint"> | number
    throughputTps?: IntFilter<"ModelProviderEndpoint"> | number
    uptimePct?: FloatFilter<"ModelProviderEndpoint"> | number
    contextLimit?: IntFilter<"ModelProviderEndpoint"> | number
    isDefault?: BoolFilter<"ModelProviderEndpoint"> | boolean
    createdAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
    model?: XOR<ModelScalarRelationFilter, ModelWhereInput>
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
  }

  export type ModelProviderEndpointOrderByWithRelationInput = {
    id?: SortOrder
    modelId?: SortOrder
    providerId?: SortOrder
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrderInput | SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: ModelOrderByWithRelationInput
    provider?: ProviderOrderByWithRelationInput
  }

  export type ModelProviderEndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    modelId_providerId?: ModelProviderEndpointModelIdProviderIdCompoundUniqueInput
    AND?: ModelProviderEndpointWhereInput | ModelProviderEndpointWhereInput[]
    OR?: ModelProviderEndpointWhereInput[]
    NOT?: ModelProviderEndpointWhereInput | ModelProviderEndpointWhereInput[]
    modelId?: StringFilter<"ModelProviderEndpoint"> | string
    providerId?: StringFilter<"ModelProviderEndpoint"> | string
    inputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    outputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    cacheInputPricePer1M?: FloatNullableFilter<"ModelProviderEndpoint"> | number | null
    latencyMs?: IntFilter<"ModelProviderEndpoint"> | number
    throughputTps?: IntFilter<"ModelProviderEndpoint"> | number
    uptimePct?: FloatFilter<"ModelProviderEndpoint"> | number
    contextLimit?: IntFilter<"ModelProviderEndpoint"> | number
    isDefault?: BoolFilter<"ModelProviderEndpoint"> | boolean
    createdAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
    model?: XOR<ModelScalarRelationFilter, ModelWhereInput>
    provider?: XOR<ProviderScalarRelationFilter, ProviderWhereInput>
  }, "id" | "modelId_providerId">

  export type ModelProviderEndpointOrderByWithAggregationInput = {
    id?: SortOrder
    modelId?: SortOrder
    providerId?: SortOrder
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrderInput | SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ModelProviderEndpointCountOrderByAggregateInput
    _avg?: ModelProviderEndpointAvgOrderByAggregateInput
    _max?: ModelProviderEndpointMaxOrderByAggregateInput
    _min?: ModelProviderEndpointMinOrderByAggregateInput
    _sum?: ModelProviderEndpointSumOrderByAggregateInput
  }

  export type ModelProviderEndpointScalarWhereWithAggregatesInput = {
    AND?: ModelProviderEndpointScalarWhereWithAggregatesInput | ModelProviderEndpointScalarWhereWithAggregatesInput[]
    OR?: ModelProviderEndpointScalarWhereWithAggregatesInput[]
    NOT?: ModelProviderEndpointScalarWhereWithAggregatesInput | ModelProviderEndpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModelProviderEndpoint"> | string
    modelId?: StringWithAggregatesFilter<"ModelProviderEndpoint"> | string
    providerId?: StringWithAggregatesFilter<"ModelProviderEndpoint"> | string
    inputPricePer1M?: FloatWithAggregatesFilter<"ModelProviderEndpoint"> | number
    outputPricePer1M?: FloatWithAggregatesFilter<"ModelProviderEndpoint"> | number
    cacheInputPricePer1M?: FloatNullableWithAggregatesFilter<"ModelProviderEndpoint"> | number | null
    latencyMs?: IntWithAggregatesFilter<"ModelProviderEndpoint"> | number
    throughputTps?: IntWithAggregatesFilter<"ModelProviderEndpoint"> | number
    uptimePct?: FloatWithAggregatesFilter<"ModelProviderEndpoint"> | number
    contextLimit?: IntWithAggregatesFilter<"ModelProviderEndpoint"> | number
    isDefault?: BoolWithAggregatesFilter<"ModelProviderEndpoint"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ModelProviderEndpoint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ModelProviderEndpoint"> | Date | string
  }

  export type BenchmarkScoreWhereInput = {
    AND?: BenchmarkScoreWhereInput | BenchmarkScoreWhereInput[]
    OR?: BenchmarkScoreWhereInput[]
    NOT?: BenchmarkScoreWhereInput | BenchmarkScoreWhereInput[]
    id?: StringFilter<"BenchmarkScore"> | string
    modelId?: StringFilter<"BenchmarkScore"> | string
    benchmarkName?: StringFilter<"BenchmarkScore"> | string
    category?: EnumBenchmarkCategoryFilter<"BenchmarkScore"> | $Enums.BenchmarkCategory
    score?: FloatFilter<"BenchmarkScore"> | number
    maxScore?: FloatFilter<"BenchmarkScore"> | number
    createdAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
    updatedAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
    model?: XOR<ModelScalarRelationFilter, ModelWhereInput>
  }

  export type BenchmarkScoreOrderByWithRelationInput = {
    id?: SortOrder
    modelId?: SortOrder
    benchmarkName?: SortOrder
    category?: SortOrder
    score?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: ModelOrderByWithRelationInput
  }

  export type BenchmarkScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    modelId_benchmarkName?: BenchmarkScoreModelIdBenchmarkNameCompoundUniqueInput
    AND?: BenchmarkScoreWhereInput | BenchmarkScoreWhereInput[]
    OR?: BenchmarkScoreWhereInput[]
    NOT?: BenchmarkScoreWhereInput | BenchmarkScoreWhereInput[]
    modelId?: StringFilter<"BenchmarkScore"> | string
    benchmarkName?: StringFilter<"BenchmarkScore"> | string
    category?: EnumBenchmarkCategoryFilter<"BenchmarkScore"> | $Enums.BenchmarkCategory
    score?: FloatFilter<"BenchmarkScore"> | number
    maxScore?: FloatFilter<"BenchmarkScore"> | number
    createdAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
    updatedAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
    model?: XOR<ModelScalarRelationFilter, ModelWhereInput>
  }, "id" | "modelId_benchmarkName">

  export type BenchmarkScoreOrderByWithAggregationInput = {
    id?: SortOrder
    modelId?: SortOrder
    benchmarkName?: SortOrder
    category?: SortOrder
    score?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BenchmarkScoreCountOrderByAggregateInput
    _avg?: BenchmarkScoreAvgOrderByAggregateInput
    _max?: BenchmarkScoreMaxOrderByAggregateInput
    _min?: BenchmarkScoreMinOrderByAggregateInput
    _sum?: BenchmarkScoreSumOrderByAggregateInput
  }

  export type BenchmarkScoreScalarWhereWithAggregatesInput = {
    AND?: BenchmarkScoreScalarWhereWithAggregatesInput | BenchmarkScoreScalarWhereWithAggregatesInput[]
    OR?: BenchmarkScoreScalarWhereWithAggregatesInput[]
    NOT?: BenchmarkScoreScalarWhereWithAggregatesInput | BenchmarkScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BenchmarkScore"> | string
    modelId?: StringWithAggregatesFilter<"BenchmarkScore"> | string
    benchmarkName?: StringWithAggregatesFilter<"BenchmarkScore"> | string
    category?: EnumBenchmarkCategoryWithAggregatesFilter<"BenchmarkScore"> | $Enums.BenchmarkCategory
    score?: FloatWithAggregatesFilter<"BenchmarkScore"> | number
    maxScore?: FloatWithAggregatesFilter<"BenchmarkScore"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BenchmarkScore"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BenchmarkScore"> | Date | string
  }

  export type LabCreateInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    models?: ModelCreateNestedManyWithoutLabInput
  }

  export type LabUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    models?: ModelUncheckedCreateNestedManyWithoutLabInput
  }

  export type LabUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: ModelUpdateManyWithoutLabNestedInput
  }

  export type LabUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    models?: ModelUncheckedUpdateManyWithoutLabNestedInput
  }

  export type LabCreateManyInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCreateInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions?: ProviderCreateregionsInput | string[]
    slaTier: string
    uptime30d: number
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions?: ProviderCreateregionsInput | string[]
    slaTier: string
    uptime30d: number
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ProviderCreateManyInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions?: ProviderCreateregionsInput | string[]
    slaTier: string
    uptime30d: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelCreateInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lab: LabCreateNestedOneWithoutModelsInput
    endpoints?: ModelProviderEndpointCreateNestedManyWithoutModelInput
    benchmarks?: BenchmarkScoreCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    labId: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointUncheckedCreateNestedManyWithoutModelInput
    benchmarks?: BenchmarkScoreUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lab?: LabUpdateOneRequiredWithoutModelsNestedInput
    endpoints?: ModelProviderEndpointUpdateManyWithoutModelNestedInput
    benchmarks?: BenchmarkScoreUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    labId?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUncheckedUpdateManyWithoutModelNestedInput
    benchmarks?: BenchmarkScoreUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ModelCreateManyInput = {
    id?: string
    name: string
    slug: string
    labId: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    labId?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointCreateInput = {
    id?: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    model: ModelCreateNestedOneWithoutEndpointsInput
    provider: ProviderCreateNestedOneWithoutEndpointsInput
  }

  export type ModelProviderEndpointUncheckedCreateInput = {
    id?: string
    modelId: string
    providerId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneRequiredWithoutEndpointsNestedInput
    provider?: ProviderUpdateOneRequiredWithoutEndpointsNestedInput
  }

  export type ModelProviderEndpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointCreateManyInput = {
    id?: string
    modelId: string
    providerId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreCreateInput = {
    id?: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
    model: ModelCreateNestedOneWithoutBenchmarksInput
  }

  export type BenchmarkScoreUncheckedCreateInput = {
    id?: string
    modelId: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BenchmarkScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneRequiredWithoutBenchmarksNestedInput
  }

  export type BenchmarkScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreCreateManyInput = {
    id?: string
    modelId: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BenchmarkScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ModelListRelationFilter = {
    every?: ModelWhereInput
    some?: ModelWhereInput
    none?: ModelWhereInput
  }

  export type ModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LabCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    description?: SortOrder
    website?: SortOrder
    headquarters?: SortOrder
    foundedYear?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabAvgOrderByAggregateInput = {
    foundedYear?: SortOrder
  }

  export type LabMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    description?: SortOrder
    website?: SortOrder
    headquarters?: SortOrder
    foundedYear?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    description?: SortOrder
    website?: SortOrder
    headquarters?: SortOrder
    foundedYear?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LabSumOrderByAggregateInput = {
    foundedYear?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderTypeFilter<$PrismaModel> | $Enums.ProviderType
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ModelProviderEndpointListRelationFilter = {
    every?: ModelProviderEndpointWhereInput
    some?: ModelProviderEndpointWhereInput
    none?: ModelProviderEndpointWhereInput
  }

  export type ModelProviderEndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProviderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    regions?: SortOrder
    slaTier?: SortOrder
    uptime30d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderAvgOrderByAggregateInput = {
    uptime30d?: SortOrder
  }

  export type ProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    slaTier?: SortOrder
    uptime30d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    logoSlug?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    slaTier?: SortOrder
    uptime30d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProviderSumOrderByAggregateInput = {
    uptime30d?: SortOrder
  }

  export type EnumProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumProviderTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumModalityFilter<$PrismaModel = never> = {
    equals?: $Enums.Modality | EnumModalityFieldRefInput<$PrismaModel>
    in?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    not?: NestedEnumModalityFilter<$PrismaModel> | $Enums.Modality
  }

  export type EnumModelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModelType | EnumModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumModelTypeFilter<$PrismaModel> | $Enums.ModelType
  }

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type LabScalarRelationFilter = {
    is?: LabWhereInput
    isNot?: LabWhereInput
  }

  export type BenchmarkScoreListRelationFilter = {
    every?: BenchmarkScoreWhereInput
    some?: BenchmarkScoreWhereInput
    none?: BenchmarkScoreWhereInput
  }

  export type BenchmarkScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ModelCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    labId?: SortOrder
    modality?: SortOrder
    modelType?: SortOrder
    isOpenWeights?: SortOrder
    license?: SortOrder
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    trainingCutoff?: SortOrder
    capabilities?: SortOrder
    supportsCaching?: SortOrder
    releaseDate?: SortOrder
    description?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    sparkline7d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelAvgOrderByAggregateInput = {
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    sparkline7d?: SortOrder
  }

  export type ModelMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    labId?: SortOrder
    modality?: SortOrder
    modelType?: SortOrder
    isOpenWeights?: SortOrder
    license?: SortOrder
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    trainingCutoff?: SortOrder
    supportsCaching?: SortOrder
    releaseDate?: SortOrder
    description?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    labId?: SortOrder
    modality?: SortOrder
    modelType?: SortOrder
    isOpenWeights?: SortOrder
    license?: SortOrder
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    trainingCutoff?: SortOrder
    supportsCaching?: SortOrder
    releaseDate?: SortOrder
    description?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelSumOrderByAggregateInput = {
    contextWindow?: SortOrder
    maxOutputTokens?: SortOrder
    compositeScore?: SortOrder
    rankCurrent?: SortOrder
    rankPrevious?: SortOrder
    usageDelta7d?: SortOrder
    sparkline7d?: SortOrder
  }

  export type EnumModalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modality | EnumModalityFieldRefInput<$PrismaModel>
    in?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    not?: NestedEnumModalityWithAggregatesFilter<$PrismaModel> | $Enums.Modality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalityFilter<$PrismaModel>
    _max?: NestedEnumModalityFilter<$PrismaModel>
  }

  export type EnumModelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModelType | EnumModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumModelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModelTypeFilter<$PrismaModel>
    _max?: NestedEnumModelTypeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ModelScalarRelationFilter = {
    is?: ModelWhereInput
    isNot?: ModelWhereInput
  }

  export type ProviderScalarRelationFilter = {
    is?: ProviderWhereInput
    isNot?: ProviderWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ModelProviderEndpointModelIdProviderIdCompoundUniqueInput = {
    modelId: string
    providerId: string
  }

  export type ModelProviderEndpointCountOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    providerId?: SortOrder
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelProviderEndpointAvgOrderByAggregateInput = {
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
  }

  export type ModelProviderEndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    providerId?: SortOrder
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelProviderEndpointMinOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    providerId?: SortOrder
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ModelProviderEndpointSumOrderByAggregateInput = {
    inputPricePer1M?: SortOrder
    outputPricePer1M?: SortOrder
    cacheInputPricePer1M?: SortOrder
    latencyMs?: SortOrder
    throughputTps?: SortOrder
    uptimePct?: SortOrder
    contextLimit?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumBenchmarkCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BenchmarkCategory | EnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBenchmarkCategoryFilter<$PrismaModel> | $Enums.BenchmarkCategory
  }

  export type BenchmarkScoreModelIdBenchmarkNameCompoundUniqueInput = {
    modelId: string
    benchmarkName: string
  }

  export type BenchmarkScoreCountOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    benchmarkName?: SortOrder
    category?: SortOrder
    score?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BenchmarkScoreAvgOrderByAggregateInput = {
    score?: SortOrder
    maxScore?: SortOrder
  }

  export type BenchmarkScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    benchmarkName?: SortOrder
    category?: SortOrder
    score?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BenchmarkScoreMinOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    benchmarkName?: SortOrder
    category?: SortOrder
    score?: SortOrder
    maxScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BenchmarkScoreSumOrderByAggregateInput = {
    score?: SortOrder
    maxScore?: SortOrder
  }

  export type EnumBenchmarkCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BenchmarkCategory | EnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBenchmarkCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BenchmarkCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBenchmarkCategoryFilter<$PrismaModel>
    _max?: NestedEnumBenchmarkCategoryFilter<$PrismaModel>
  }

  export type ModelCreateNestedManyWithoutLabInput = {
    create?: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput> | ModelCreateWithoutLabInput[] | ModelUncheckedCreateWithoutLabInput[]
    connectOrCreate?: ModelCreateOrConnectWithoutLabInput | ModelCreateOrConnectWithoutLabInput[]
    createMany?: ModelCreateManyLabInputEnvelope
    connect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
  }

  export type ModelUncheckedCreateNestedManyWithoutLabInput = {
    create?: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput> | ModelCreateWithoutLabInput[] | ModelUncheckedCreateWithoutLabInput[]
    connectOrCreate?: ModelCreateOrConnectWithoutLabInput | ModelCreateOrConnectWithoutLabInput[]
    createMany?: ModelCreateManyLabInputEnvelope
    connect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ModelUpdateManyWithoutLabNestedInput = {
    create?: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput> | ModelCreateWithoutLabInput[] | ModelUncheckedCreateWithoutLabInput[]
    connectOrCreate?: ModelCreateOrConnectWithoutLabInput | ModelCreateOrConnectWithoutLabInput[]
    upsert?: ModelUpsertWithWhereUniqueWithoutLabInput | ModelUpsertWithWhereUniqueWithoutLabInput[]
    createMany?: ModelCreateManyLabInputEnvelope
    set?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    disconnect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    delete?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    connect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    update?: ModelUpdateWithWhereUniqueWithoutLabInput | ModelUpdateWithWhereUniqueWithoutLabInput[]
    updateMany?: ModelUpdateManyWithWhereWithoutLabInput | ModelUpdateManyWithWhereWithoutLabInput[]
    deleteMany?: ModelScalarWhereInput | ModelScalarWhereInput[]
  }

  export type ModelUncheckedUpdateManyWithoutLabNestedInput = {
    create?: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput> | ModelCreateWithoutLabInput[] | ModelUncheckedCreateWithoutLabInput[]
    connectOrCreate?: ModelCreateOrConnectWithoutLabInput | ModelCreateOrConnectWithoutLabInput[]
    upsert?: ModelUpsertWithWhereUniqueWithoutLabInput | ModelUpsertWithWhereUniqueWithoutLabInput[]
    createMany?: ModelCreateManyLabInputEnvelope
    set?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    disconnect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    delete?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    connect?: ModelWhereUniqueInput | ModelWhereUniqueInput[]
    update?: ModelUpdateWithWhereUniqueWithoutLabInput | ModelUpdateWithWhereUniqueWithoutLabInput[]
    updateMany?: ModelUpdateManyWithWhereWithoutLabInput | ModelUpdateManyWithWhereWithoutLabInput[]
    deleteMany?: ModelScalarWhereInput | ModelScalarWhereInput[]
  }

  export type ProviderCreateregionsInput = {
    set: string[]
  }

  export type ModelProviderEndpointCreateNestedManyWithoutProviderInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput> | ModelProviderEndpointCreateWithoutProviderInput[] | ModelProviderEndpointUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutProviderInput | ModelProviderEndpointCreateOrConnectWithoutProviderInput[]
    createMany?: ModelProviderEndpointCreateManyProviderInputEnvelope
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
  }

  export type ModelProviderEndpointUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput> | ModelProviderEndpointCreateWithoutProviderInput[] | ModelProviderEndpointUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutProviderInput | ModelProviderEndpointCreateOrConnectWithoutProviderInput[]
    createMany?: ModelProviderEndpointCreateManyProviderInputEnvelope
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
  }

  export type EnumProviderTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProviderType
  }

  export type ProviderUpdateregionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModelProviderEndpointUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput> | ModelProviderEndpointCreateWithoutProviderInput[] | ModelProviderEndpointUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutProviderInput | ModelProviderEndpointCreateOrConnectWithoutProviderInput[]
    upsert?: ModelProviderEndpointUpsertWithWhereUniqueWithoutProviderInput | ModelProviderEndpointUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ModelProviderEndpointCreateManyProviderInputEnvelope
    set?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    disconnect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    delete?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    update?: ModelProviderEndpointUpdateWithWhereUniqueWithoutProviderInput | ModelProviderEndpointUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ModelProviderEndpointUpdateManyWithWhereWithoutProviderInput | ModelProviderEndpointUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
  }

  export type ModelProviderEndpointUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput> | ModelProviderEndpointCreateWithoutProviderInput[] | ModelProviderEndpointUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutProviderInput | ModelProviderEndpointCreateOrConnectWithoutProviderInput[]
    upsert?: ModelProviderEndpointUpsertWithWhereUniqueWithoutProviderInput | ModelProviderEndpointUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ModelProviderEndpointCreateManyProviderInputEnvelope
    set?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    disconnect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    delete?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    update?: ModelProviderEndpointUpdateWithWhereUniqueWithoutProviderInput | ModelProviderEndpointUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ModelProviderEndpointUpdateManyWithWhereWithoutProviderInput | ModelProviderEndpointUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
  }

  export type ModelCreatecapabilitiesInput = {
    set: string[]
  }

  export type ModelCreatesparkline7dInput = {
    set: number[]
  }

  export type LabCreateNestedOneWithoutModelsInput = {
    create?: XOR<LabCreateWithoutModelsInput, LabUncheckedCreateWithoutModelsInput>
    connectOrCreate?: LabCreateOrConnectWithoutModelsInput
    connect?: LabWhereUniqueInput
  }

  export type ModelProviderEndpointCreateNestedManyWithoutModelInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput> | ModelProviderEndpointCreateWithoutModelInput[] | ModelProviderEndpointUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutModelInput | ModelProviderEndpointCreateOrConnectWithoutModelInput[]
    createMany?: ModelProviderEndpointCreateManyModelInputEnvelope
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
  }

  export type BenchmarkScoreCreateNestedManyWithoutModelInput = {
    create?: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput> | BenchmarkScoreCreateWithoutModelInput[] | BenchmarkScoreUncheckedCreateWithoutModelInput[]
    connectOrCreate?: BenchmarkScoreCreateOrConnectWithoutModelInput | BenchmarkScoreCreateOrConnectWithoutModelInput[]
    createMany?: BenchmarkScoreCreateManyModelInputEnvelope
    connect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
  }

  export type ModelProviderEndpointUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput> | ModelProviderEndpointCreateWithoutModelInput[] | ModelProviderEndpointUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutModelInput | ModelProviderEndpointCreateOrConnectWithoutModelInput[]
    createMany?: ModelProviderEndpointCreateManyModelInputEnvelope
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
  }

  export type BenchmarkScoreUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput> | BenchmarkScoreCreateWithoutModelInput[] | BenchmarkScoreUncheckedCreateWithoutModelInput[]
    connectOrCreate?: BenchmarkScoreCreateOrConnectWithoutModelInput | BenchmarkScoreCreateOrConnectWithoutModelInput[]
    createMany?: BenchmarkScoreCreateManyModelInputEnvelope
    connect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
  }

  export type EnumModalityFieldUpdateOperationsInput = {
    set?: $Enums.Modality
  }

  export type EnumModelTypeFieldUpdateOperationsInput = {
    set?: $Enums.ModelType
  }

  export type ModelUpdatecapabilitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ModelUpdatesparkline7dInput = {
    set?: number[]
    push?: number | number[]
  }

  export type LabUpdateOneRequiredWithoutModelsNestedInput = {
    create?: XOR<LabCreateWithoutModelsInput, LabUncheckedCreateWithoutModelsInput>
    connectOrCreate?: LabCreateOrConnectWithoutModelsInput
    upsert?: LabUpsertWithoutModelsInput
    connect?: LabWhereUniqueInput
    update?: XOR<XOR<LabUpdateToOneWithWhereWithoutModelsInput, LabUpdateWithoutModelsInput>, LabUncheckedUpdateWithoutModelsInput>
  }

  export type ModelProviderEndpointUpdateManyWithoutModelNestedInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput> | ModelProviderEndpointCreateWithoutModelInput[] | ModelProviderEndpointUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutModelInput | ModelProviderEndpointCreateOrConnectWithoutModelInput[]
    upsert?: ModelProviderEndpointUpsertWithWhereUniqueWithoutModelInput | ModelProviderEndpointUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ModelProviderEndpointCreateManyModelInputEnvelope
    set?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    disconnect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    delete?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    update?: ModelProviderEndpointUpdateWithWhereUniqueWithoutModelInput | ModelProviderEndpointUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ModelProviderEndpointUpdateManyWithWhereWithoutModelInput | ModelProviderEndpointUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
  }

  export type BenchmarkScoreUpdateManyWithoutModelNestedInput = {
    create?: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput> | BenchmarkScoreCreateWithoutModelInput[] | BenchmarkScoreUncheckedCreateWithoutModelInput[]
    connectOrCreate?: BenchmarkScoreCreateOrConnectWithoutModelInput | BenchmarkScoreCreateOrConnectWithoutModelInput[]
    upsert?: BenchmarkScoreUpsertWithWhereUniqueWithoutModelInput | BenchmarkScoreUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: BenchmarkScoreCreateManyModelInputEnvelope
    set?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    disconnect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    delete?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    connect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    update?: BenchmarkScoreUpdateWithWhereUniqueWithoutModelInput | BenchmarkScoreUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: BenchmarkScoreUpdateManyWithWhereWithoutModelInput | BenchmarkScoreUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: BenchmarkScoreScalarWhereInput | BenchmarkScoreScalarWhereInput[]
  }

  export type ModelProviderEndpointUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput> | ModelProviderEndpointCreateWithoutModelInput[] | ModelProviderEndpointUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ModelProviderEndpointCreateOrConnectWithoutModelInput | ModelProviderEndpointCreateOrConnectWithoutModelInput[]
    upsert?: ModelProviderEndpointUpsertWithWhereUniqueWithoutModelInput | ModelProviderEndpointUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ModelProviderEndpointCreateManyModelInputEnvelope
    set?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    disconnect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    delete?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    connect?: ModelProviderEndpointWhereUniqueInput | ModelProviderEndpointWhereUniqueInput[]
    update?: ModelProviderEndpointUpdateWithWhereUniqueWithoutModelInput | ModelProviderEndpointUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ModelProviderEndpointUpdateManyWithWhereWithoutModelInput | ModelProviderEndpointUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
  }

  export type BenchmarkScoreUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput> | BenchmarkScoreCreateWithoutModelInput[] | BenchmarkScoreUncheckedCreateWithoutModelInput[]
    connectOrCreate?: BenchmarkScoreCreateOrConnectWithoutModelInput | BenchmarkScoreCreateOrConnectWithoutModelInput[]
    upsert?: BenchmarkScoreUpsertWithWhereUniqueWithoutModelInput | BenchmarkScoreUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: BenchmarkScoreCreateManyModelInputEnvelope
    set?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    disconnect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    delete?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    connect?: BenchmarkScoreWhereUniqueInput | BenchmarkScoreWhereUniqueInput[]
    update?: BenchmarkScoreUpdateWithWhereUniqueWithoutModelInput | BenchmarkScoreUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: BenchmarkScoreUpdateManyWithWhereWithoutModelInput | BenchmarkScoreUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: BenchmarkScoreScalarWhereInput | BenchmarkScoreScalarWhereInput[]
  }

  export type ModelCreateNestedOneWithoutEndpointsInput = {
    create?: XOR<ModelCreateWithoutEndpointsInput, ModelUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutEndpointsInput
    connect?: ModelWhereUniqueInput
  }

  export type ProviderCreateNestedOneWithoutEndpointsInput = {
    create?: XOR<ProviderCreateWithoutEndpointsInput, ProviderUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutEndpointsInput
    connect?: ProviderWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ModelUpdateOneRequiredWithoutEndpointsNestedInput = {
    create?: XOR<ModelCreateWithoutEndpointsInput, ModelUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ModelCreateOrConnectWithoutEndpointsInput
    upsert?: ModelUpsertWithoutEndpointsInput
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutEndpointsInput, ModelUpdateWithoutEndpointsInput>, ModelUncheckedUpdateWithoutEndpointsInput>
  }

  export type ProviderUpdateOneRequiredWithoutEndpointsNestedInput = {
    create?: XOR<ProviderCreateWithoutEndpointsInput, ProviderUncheckedCreateWithoutEndpointsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutEndpointsInput
    upsert?: ProviderUpsertWithoutEndpointsInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutEndpointsInput, ProviderUpdateWithoutEndpointsInput>, ProviderUncheckedUpdateWithoutEndpointsInput>
  }

  export type ModelCreateNestedOneWithoutBenchmarksInput = {
    create?: XOR<ModelCreateWithoutBenchmarksInput, ModelUncheckedCreateWithoutBenchmarksInput>
    connectOrCreate?: ModelCreateOrConnectWithoutBenchmarksInput
    connect?: ModelWhereUniqueInput
  }

  export type EnumBenchmarkCategoryFieldUpdateOperationsInput = {
    set?: $Enums.BenchmarkCategory
  }

  export type ModelUpdateOneRequiredWithoutBenchmarksNestedInput = {
    create?: XOR<ModelCreateWithoutBenchmarksInput, ModelUncheckedCreateWithoutBenchmarksInput>
    connectOrCreate?: ModelCreateOrConnectWithoutBenchmarksInput
    upsert?: ModelUpsertWithoutBenchmarksInput
    connect?: ModelWhereUniqueInput
    update?: XOR<XOR<ModelUpdateToOneWithWhereWithoutBenchmarksInput, ModelUpdateWithoutBenchmarksInput>, ModelUncheckedUpdateWithoutBenchmarksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumProviderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderTypeFilter<$PrismaModel> | $Enums.ProviderType
  }

  export type NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProviderType | EnumProviderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProviderType[] | ListEnumProviderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProviderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderTypeFilter<$PrismaModel>
    _max?: NestedEnumProviderTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumModalityFilter<$PrismaModel = never> = {
    equals?: $Enums.Modality | EnumModalityFieldRefInput<$PrismaModel>
    in?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    not?: NestedEnumModalityFilter<$PrismaModel> | $Enums.Modality
  }

  export type NestedEnumModelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ModelType | EnumModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumModelTypeFilter<$PrismaModel> | $Enums.ModelType
  }

  export type NestedEnumModalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Modality | EnumModalityFieldRefInput<$PrismaModel>
    in?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Modality[] | ListEnumModalityFieldRefInput<$PrismaModel>
    not?: NestedEnumModalityWithAggregatesFilter<$PrismaModel> | $Enums.Modality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModalityFilter<$PrismaModel>
    _max?: NestedEnumModalityFilter<$PrismaModel>
  }

  export type NestedEnumModelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModelType | EnumModelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModelType[] | ListEnumModelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumModelTypeWithAggregatesFilter<$PrismaModel> | $Enums.ModelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModelTypeFilter<$PrismaModel>
    _max?: NestedEnumModelTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumBenchmarkCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BenchmarkCategory | EnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBenchmarkCategoryFilter<$PrismaModel> | $Enums.BenchmarkCategory
  }

  export type NestedEnumBenchmarkCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BenchmarkCategory | EnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BenchmarkCategory[] | ListEnumBenchmarkCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBenchmarkCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BenchmarkCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBenchmarkCategoryFilter<$PrismaModel>
    _max?: NestedEnumBenchmarkCategoryFilter<$PrismaModel>
  }

  export type ModelCreateWithoutLabInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointCreateNestedManyWithoutModelInput
    benchmarks?: BenchmarkScoreCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutLabInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointUncheckedCreateNestedManyWithoutModelInput
    benchmarks?: BenchmarkScoreUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelCreateOrConnectWithoutLabInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput>
  }

  export type ModelCreateManyLabInputEnvelope = {
    data: ModelCreateManyLabInput | ModelCreateManyLabInput[]
    skipDuplicates?: boolean
  }

  export type ModelUpsertWithWhereUniqueWithoutLabInput = {
    where: ModelWhereUniqueInput
    update: XOR<ModelUpdateWithoutLabInput, ModelUncheckedUpdateWithoutLabInput>
    create: XOR<ModelCreateWithoutLabInput, ModelUncheckedCreateWithoutLabInput>
  }

  export type ModelUpdateWithWhereUniqueWithoutLabInput = {
    where: ModelWhereUniqueInput
    data: XOR<ModelUpdateWithoutLabInput, ModelUncheckedUpdateWithoutLabInput>
  }

  export type ModelUpdateManyWithWhereWithoutLabInput = {
    where: ModelScalarWhereInput
    data: XOR<ModelUpdateManyMutationInput, ModelUncheckedUpdateManyWithoutLabInput>
  }

  export type ModelScalarWhereInput = {
    AND?: ModelScalarWhereInput | ModelScalarWhereInput[]
    OR?: ModelScalarWhereInput[]
    NOT?: ModelScalarWhereInput | ModelScalarWhereInput[]
    id?: StringFilter<"Model"> | string
    name?: StringFilter<"Model"> | string
    slug?: StringFilter<"Model"> | string
    labId?: StringFilter<"Model"> | string
    modality?: EnumModalityFilter<"Model"> | $Enums.Modality
    modelType?: EnumModelTypeFilter<"Model"> | $Enums.ModelType
    isOpenWeights?: BoolFilter<"Model"> | boolean
    license?: StringFilter<"Model"> | string
    contextWindow?: IntFilter<"Model"> | number
    maxOutputTokens?: IntFilter<"Model"> | number
    trainingCutoff?: StringFilter<"Model"> | string
    capabilities?: StringNullableListFilter<"Model">
    supportsCaching?: BoolFilter<"Model"> | boolean
    releaseDate?: DateTimeFilter<"Model"> | Date | string
    description?: StringFilter<"Model"> | string
    compositeScore?: FloatFilter<"Model"> | number
    rankCurrent?: IntFilter<"Model"> | number
    rankPrevious?: IntFilter<"Model"> | number
    usageDelta7d?: FloatFilter<"Model"> | number
    sparkline7d?: FloatNullableListFilter<"Model">
    createdAt?: DateTimeFilter<"Model"> | Date | string
    updatedAt?: DateTimeFilter<"Model"> | Date | string
  }

  export type ModelProviderEndpointCreateWithoutProviderInput = {
    id?: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    model: ModelCreateNestedOneWithoutEndpointsInput
  }

  export type ModelProviderEndpointUncheckedCreateWithoutProviderInput = {
    id?: string
    modelId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointCreateOrConnectWithoutProviderInput = {
    where: ModelProviderEndpointWhereUniqueInput
    create: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput>
  }

  export type ModelProviderEndpointCreateManyProviderInputEnvelope = {
    data: ModelProviderEndpointCreateManyProviderInput | ModelProviderEndpointCreateManyProviderInput[]
    skipDuplicates?: boolean
  }

  export type ModelProviderEndpointUpsertWithWhereUniqueWithoutProviderInput = {
    where: ModelProviderEndpointWhereUniqueInput
    update: XOR<ModelProviderEndpointUpdateWithoutProviderInput, ModelProviderEndpointUncheckedUpdateWithoutProviderInput>
    create: XOR<ModelProviderEndpointCreateWithoutProviderInput, ModelProviderEndpointUncheckedCreateWithoutProviderInput>
  }

  export type ModelProviderEndpointUpdateWithWhereUniqueWithoutProviderInput = {
    where: ModelProviderEndpointWhereUniqueInput
    data: XOR<ModelProviderEndpointUpdateWithoutProviderInput, ModelProviderEndpointUncheckedUpdateWithoutProviderInput>
  }

  export type ModelProviderEndpointUpdateManyWithWhereWithoutProviderInput = {
    where: ModelProviderEndpointScalarWhereInput
    data: XOR<ModelProviderEndpointUpdateManyMutationInput, ModelProviderEndpointUncheckedUpdateManyWithoutProviderInput>
  }

  export type ModelProviderEndpointScalarWhereInput = {
    AND?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
    OR?: ModelProviderEndpointScalarWhereInput[]
    NOT?: ModelProviderEndpointScalarWhereInput | ModelProviderEndpointScalarWhereInput[]
    id?: StringFilter<"ModelProviderEndpoint"> | string
    modelId?: StringFilter<"ModelProviderEndpoint"> | string
    providerId?: StringFilter<"ModelProviderEndpoint"> | string
    inputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    outputPricePer1M?: FloatFilter<"ModelProviderEndpoint"> | number
    cacheInputPricePer1M?: FloatNullableFilter<"ModelProviderEndpoint"> | number | null
    latencyMs?: IntFilter<"ModelProviderEndpoint"> | number
    throughputTps?: IntFilter<"ModelProviderEndpoint"> | number
    uptimePct?: FloatFilter<"ModelProviderEndpoint"> | number
    contextLimit?: IntFilter<"ModelProviderEndpoint"> | number
    isDefault?: BoolFilter<"ModelProviderEndpoint"> | boolean
    createdAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"ModelProviderEndpoint"> | Date | string
  }

  export type LabCreateWithoutModelsInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabUncheckedCreateWithoutModelsInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    description: string
    website: string
    headquarters: string
    foundedYear: number
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LabCreateOrConnectWithoutModelsInput = {
    where: LabWhereUniqueInput
    create: XOR<LabCreateWithoutModelsInput, LabUncheckedCreateWithoutModelsInput>
  }

  export type ModelProviderEndpointCreateWithoutModelInput = {
    id?: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    provider: ProviderCreateNestedOneWithoutEndpointsInput
  }

  export type ModelProviderEndpointUncheckedCreateWithoutModelInput = {
    id?: string
    providerId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointCreateOrConnectWithoutModelInput = {
    where: ModelProviderEndpointWhereUniqueInput
    create: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput>
  }

  export type ModelProviderEndpointCreateManyModelInputEnvelope = {
    data: ModelProviderEndpointCreateManyModelInput | ModelProviderEndpointCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type BenchmarkScoreCreateWithoutModelInput = {
    id?: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BenchmarkScoreUncheckedCreateWithoutModelInput = {
    id?: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BenchmarkScoreCreateOrConnectWithoutModelInput = {
    where: BenchmarkScoreWhereUniqueInput
    create: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput>
  }

  export type BenchmarkScoreCreateManyModelInputEnvelope = {
    data: BenchmarkScoreCreateManyModelInput | BenchmarkScoreCreateManyModelInput[]
    skipDuplicates?: boolean
  }

  export type LabUpsertWithoutModelsInput = {
    update: XOR<LabUpdateWithoutModelsInput, LabUncheckedUpdateWithoutModelsInput>
    create: XOR<LabCreateWithoutModelsInput, LabUncheckedCreateWithoutModelsInput>
    where?: LabWhereInput
  }

  export type LabUpdateToOneWithWhereWithoutModelsInput = {
    where?: LabWhereInput
    data: XOR<LabUpdateWithoutModelsInput, LabUncheckedUpdateWithoutModelsInput>
  }

  export type LabUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LabUncheckedUpdateWithoutModelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    headquarters?: StringFieldUpdateOperationsInput | string
    foundedYear?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointUpsertWithWhereUniqueWithoutModelInput = {
    where: ModelProviderEndpointWhereUniqueInput
    update: XOR<ModelProviderEndpointUpdateWithoutModelInput, ModelProviderEndpointUncheckedUpdateWithoutModelInput>
    create: XOR<ModelProviderEndpointCreateWithoutModelInput, ModelProviderEndpointUncheckedCreateWithoutModelInput>
  }

  export type ModelProviderEndpointUpdateWithWhereUniqueWithoutModelInput = {
    where: ModelProviderEndpointWhereUniqueInput
    data: XOR<ModelProviderEndpointUpdateWithoutModelInput, ModelProviderEndpointUncheckedUpdateWithoutModelInput>
  }

  export type ModelProviderEndpointUpdateManyWithWhereWithoutModelInput = {
    where: ModelProviderEndpointScalarWhereInput
    data: XOR<ModelProviderEndpointUpdateManyMutationInput, ModelProviderEndpointUncheckedUpdateManyWithoutModelInput>
  }

  export type BenchmarkScoreUpsertWithWhereUniqueWithoutModelInput = {
    where: BenchmarkScoreWhereUniqueInput
    update: XOR<BenchmarkScoreUpdateWithoutModelInput, BenchmarkScoreUncheckedUpdateWithoutModelInput>
    create: XOR<BenchmarkScoreCreateWithoutModelInput, BenchmarkScoreUncheckedCreateWithoutModelInput>
  }

  export type BenchmarkScoreUpdateWithWhereUniqueWithoutModelInput = {
    where: BenchmarkScoreWhereUniqueInput
    data: XOR<BenchmarkScoreUpdateWithoutModelInput, BenchmarkScoreUncheckedUpdateWithoutModelInput>
  }

  export type BenchmarkScoreUpdateManyWithWhereWithoutModelInput = {
    where: BenchmarkScoreScalarWhereInput
    data: XOR<BenchmarkScoreUpdateManyMutationInput, BenchmarkScoreUncheckedUpdateManyWithoutModelInput>
  }

  export type BenchmarkScoreScalarWhereInput = {
    AND?: BenchmarkScoreScalarWhereInput | BenchmarkScoreScalarWhereInput[]
    OR?: BenchmarkScoreScalarWhereInput[]
    NOT?: BenchmarkScoreScalarWhereInput | BenchmarkScoreScalarWhereInput[]
    id?: StringFilter<"BenchmarkScore"> | string
    modelId?: StringFilter<"BenchmarkScore"> | string
    benchmarkName?: StringFilter<"BenchmarkScore"> | string
    category?: EnumBenchmarkCategoryFilter<"BenchmarkScore"> | $Enums.BenchmarkCategory
    score?: FloatFilter<"BenchmarkScore"> | number
    maxScore?: FloatFilter<"BenchmarkScore"> | number
    createdAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
    updatedAt?: DateTimeFilter<"BenchmarkScore"> | Date | string
  }

  export type ModelCreateWithoutEndpointsInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lab: LabCreateNestedOneWithoutModelsInput
    benchmarks?: BenchmarkScoreCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutEndpointsInput = {
    id?: string
    name: string
    slug: string
    labId: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    benchmarks?: BenchmarkScoreUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelCreateOrConnectWithoutEndpointsInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutEndpointsInput, ModelUncheckedCreateWithoutEndpointsInput>
  }

  export type ProviderCreateWithoutEndpointsInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions?: ProviderCreateregionsInput | string[]
    slaTier: string
    uptime30d: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderUncheckedCreateWithoutEndpointsInput = {
    id?: string
    name: string
    slug: string
    logoSlug: string
    type: $Enums.ProviderType
    description: string
    website: string
    regions?: ProviderCreateregionsInput | string[]
    slaTier: string
    uptime30d: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProviderCreateOrConnectWithoutEndpointsInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutEndpointsInput, ProviderUncheckedCreateWithoutEndpointsInput>
  }

  export type ModelUpsertWithoutEndpointsInput = {
    update: XOR<ModelUpdateWithoutEndpointsInput, ModelUncheckedUpdateWithoutEndpointsInput>
    create: XOR<ModelCreateWithoutEndpointsInput, ModelUncheckedCreateWithoutEndpointsInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutEndpointsInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutEndpointsInput, ModelUncheckedUpdateWithoutEndpointsInput>
  }

  export type ModelUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lab?: LabUpdateOneRequiredWithoutModelsNestedInput
    benchmarks?: BenchmarkScoreUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    labId?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    benchmarks?: BenchmarkScoreUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ProviderUpsertWithoutEndpointsInput = {
    update: XOR<ProviderUpdateWithoutEndpointsInput, ProviderUncheckedUpdateWithoutEndpointsInput>
    create: XOR<ProviderCreateWithoutEndpointsInput, ProviderUncheckedCreateWithoutEndpointsInput>
    where?: ProviderWhereInput
  }

  export type ProviderUpdateToOneWithWhereWithoutEndpointsInput = {
    where?: ProviderWhereInput
    data: XOR<ProviderUpdateWithoutEndpointsInput, ProviderUncheckedUpdateWithoutEndpointsInput>
  }

  export type ProviderUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateWithoutEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    logoSlug?: StringFieldUpdateOperationsInput | string
    type?: EnumProviderTypeFieldUpdateOperationsInput | $Enums.ProviderType
    description?: StringFieldUpdateOperationsInput | string
    website?: StringFieldUpdateOperationsInput | string
    regions?: ProviderUpdateregionsInput | string[]
    slaTier?: StringFieldUpdateOperationsInput | string
    uptime30d?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelCreateWithoutBenchmarksInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lab: LabCreateNestedOneWithoutModelsInput
    endpoints?: ModelProviderEndpointCreateNestedManyWithoutModelInput
  }

  export type ModelUncheckedCreateWithoutBenchmarksInput = {
    id?: string
    name: string
    slug: string
    labId: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
    endpoints?: ModelProviderEndpointUncheckedCreateNestedManyWithoutModelInput
  }

  export type ModelCreateOrConnectWithoutBenchmarksInput = {
    where: ModelWhereUniqueInput
    create: XOR<ModelCreateWithoutBenchmarksInput, ModelUncheckedCreateWithoutBenchmarksInput>
  }

  export type ModelUpsertWithoutBenchmarksInput = {
    update: XOR<ModelUpdateWithoutBenchmarksInput, ModelUncheckedUpdateWithoutBenchmarksInput>
    create: XOR<ModelCreateWithoutBenchmarksInput, ModelUncheckedCreateWithoutBenchmarksInput>
    where?: ModelWhereInput
  }

  export type ModelUpdateToOneWithWhereWithoutBenchmarksInput = {
    where?: ModelWhereInput
    data: XOR<ModelUpdateWithoutBenchmarksInput, ModelUncheckedUpdateWithoutBenchmarksInput>
  }

  export type ModelUpdateWithoutBenchmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lab?: LabUpdateOneRequiredWithoutModelsNestedInput
    endpoints?: ModelProviderEndpointUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutBenchmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    labId?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ModelCreateManyLabInput = {
    id?: string
    name: string
    slug: string
    modality: $Enums.Modality
    modelType: $Enums.ModelType
    isOpenWeights: boolean
    license: string
    contextWindow: number
    maxOutputTokens: number
    trainingCutoff: string
    capabilities?: ModelCreatecapabilitiesInput | string[]
    supportsCaching: boolean
    releaseDate: Date | string
    description: string
    compositeScore: number
    rankCurrent: number
    rankPrevious: number
    usageDelta7d: number
    sparkline7d?: ModelCreatesparkline7dInput | number[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelUpdateWithoutLabInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUpdateManyWithoutModelNestedInput
    benchmarks?: BenchmarkScoreUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateWithoutLabInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endpoints?: ModelProviderEndpointUncheckedUpdateManyWithoutModelNestedInput
    benchmarks?: BenchmarkScoreUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ModelUncheckedUpdateManyWithoutLabInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    modality?: EnumModalityFieldUpdateOperationsInput | $Enums.Modality
    modelType?: EnumModelTypeFieldUpdateOperationsInput | $Enums.ModelType
    isOpenWeights?: BoolFieldUpdateOperationsInput | boolean
    license?: StringFieldUpdateOperationsInput | string
    contextWindow?: IntFieldUpdateOperationsInput | number
    maxOutputTokens?: IntFieldUpdateOperationsInput | number
    trainingCutoff?: StringFieldUpdateOperationsInput | string
    capabilities?: ModelUpdatecapabilitiesInput | string[]
    supportsCaching?: BoolFieldUpdateOperationsInput | boolean
    releaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: StringFieldUpdateOperationsInput | string
    compositeScore?: FloatFieldUpdateOperationsInput | number
    rankCurrent?: IntFieldUpdateOperationsInput | number
    rankPrevious?: IntFieldUpdateOperationsInput | number
    usageDelta7d?: FloatFieldUpdateOperationsInput | number
    sparkline7d?: ModelUpdatesparkline7dInput | number[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointCreateManyProviderInput = {
    id?: string
    modelId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ModelUpdateOneRequiredWithoutEndpointsNestedInput
  }

  export type ModelProviderEndpointUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointCreateManyModelInput = {
    id?: string
    providerId: string
    inputPricePer1M: number
    outputPricePer1M: number
    cacheInputPricePer1M?: number | null
    latencyMs: number
    throughputTps: number
    uptimePct: number
    contextLimit: number
    isDefault: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BenchmarkScoreCreateManyModelInput = {
    id?: string
    benchmarkName: string
    category: $Enums.BenchmarkCategory
    score: number
    maxScore: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ModelProviderEndpointUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: ProviderUpdateOneRequiredWithoutEndpointsNestedInput
  }

  export type ModelProviderEndpointUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModelProviderEndpointUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    inputPricePer1M?: FloatFieldUpdateOperationsInput | number
    outputPricePer1M?: FloatFieldUpdateOperationsInput | number
    cacheInputPricePer1M?: NullableFloatFieldUpdateOperationsInput | number | null
    latencyMs?: IntFieldUpdateOperationsInput | number
    throughputTps?: IntFieldUpdateOperationsInput | number
    uptimePct?: FloatFieldUpdateOperationsInput | number
    contextLimit?: IntFieldUpdateOperationsInput | number
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BenchmarkScoreUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    benchmarkName?: StringFieldUpdateOperationsInput | string
    category?: EnumBenchmarkCategoryFieldUpdateOperationsInput | $Enums.BenchmarkCategory
    score?: FloatFieldUpdateOperationsInput | number
    maxScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}