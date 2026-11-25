#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/42474917344ef20948b51be34850d9cd7a37d12f76ee16bdae2c3ef96141294e/contract';
import endContract from '../../snapshots/42474917344ef20948b51be34850d9cd7a37d12f76ee16bdae2c3ef96141294e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'BenchmarkCategory',
        members: ['REASONING', 'CODING', 'GENERAL', 'AGENTIC'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'Modality',
        members: ['TEXT', 'MULTIMODAL', 'IMAGE', 'EMBEDDING'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'ModelType',
        members: ['CHAT', 'REASONING', 'CODE'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'ProviderType',
        members: ['FIRST_PARTY', 'INFERENCE_CLOUD'],
      }),
      this.createTable({
        schema: 'public',
        table: 'BenchmarkScore',
        columns: [
          col('benchmarkName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('category', '"BenchmarkCategory"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'BenchmarkCategory' } },
          }),
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('maxScore', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('modelId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('score', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Lab',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('foundedYear', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('headquarters', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('logoSlug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('verified', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('website', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Model',
        columns: [
          col('capabilities', 'text[]', { codecRef: { codecId: 'pg/text@1', many: true } }),
          col('compositeScore', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('contextWindow', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isOpenWeights', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('labId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('license', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('maxOutputTokens', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('modality', '"Modality"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'Modality' } },
          }),
          col('modelType', '"ModelType"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'ModelType' } },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('rankCurrent', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('rankPrevious', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('releaseDate', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sparkline7d', 'float8[]', { codecRef: { codecId: 'pg/float8@1', many: true } }),
          col('supportsCaching', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('trainingCutoff', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('usageDelta7d', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        columns: [
          col('cacheInputPricePer1M', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('contextLimit', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('inputPricePer1M', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('isDefault', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('latencyMs', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('modelId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('outputPricePer1M', 'float8', {
            notNull: true,
            codecRef: { codecId: 'pg/float8@1' },
          }),
          col('providerId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('throughputTps', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('uptimePct', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Provider',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('logoSlug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('regions', 'text[]', { codecRef: { codecId: 'pg/text@1', many: true } }),
          col('slaTier', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', '"ProviderType"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'ProviderType' } },
          }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('uptime30d', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('website', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BenchmarkScore',
        index: 'BenchmarkScore_category_idx',
        columns: ['category'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'BenchmarkScore',
        index: 'BenchmarkScore_modelId_benchmarkName_key',
        columns: ['modelId', 'benchmarkName'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'BenchmarkScore',
        index: 'BenchmarkScore_modelId_idx',
        columns: ['modelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Lab',
        index: 'Lab_name_idx',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Lab',
        index: 'Lab_slug_key',
        columns: ['slug'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_compositeScore_idx',
        columns: ['compositeScore'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_labId_idx',
        columns: ['labId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_modality_idx',
        columns: ['modality'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_modelType_idx',
        columns: ['modelType'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_rankCurrent_idx',
        columns: ['rankCurrent'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Model',
        index: 'Model_slug_key',
        columns: ['slug'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        index: 'ModelProviderEndpoint_inputPricePer1M_idx',
        columns: ['inputPricePer1M'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        index: 'ModelProviderEndpoint_latencyMs_idx',
        columns: ['latencyMs'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        index: 'ModelProviderEndpoint_modelId_idx',
        columns: ['modelId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        index: 'ModelProviderEndpoint_modelId_providerId_key',
        columns: ['modelId', 'providerId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        index: 'ModelProviderEndpoint_providerId_idx',
        columns: ['providerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Provider',
        index: 'Provider_slug_key',
        columns: ['slug'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Provider',
        index: 'Provider_type_idx',
        columns: ['type'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'BenchmarkScore',
        foreignKey: {
          name: 'BenchmarkScore_modelId_fkey',
          columns: ['modelId'],
          references: { schema: 'public', table: 'Model', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Model',
        foreignKey: {
          name: 'Model_labId_fkey',
          columns: ['labId'],
          references: { schema: 'public', table: 'Lab', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        foreignKey: {
          name: 'ModelProviderEndpoint_modelId_fkey',
          columns: ['modelId'],
          references: { schema: 'public', table: 'Model', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ModelProviderEndpoint',
        foreignKey: {
          name: 'ModelProviderEndpoint_providerId_fkey',
          columns: ['providerId'],
          references: { schema: 'public', table: 'Provider', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
