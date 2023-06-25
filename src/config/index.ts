import 'dotenv/config';
import envSchema from 'env-schema';
import S from 'fluent-json-schema';

export default function loadConfig(): void {
  envSchema({
    data: process.env,
    schema: S.object()
      .prop('NODE_ENV', S.string().enum(['production', 'development', 'debug', 'test']).required())
      .prop('AWS_REGION', S.string().required())
      .prop('AWS_ACCESS_KEY', S.string().required())
      .prop('AWS_SECRET_KEY', S.string().required())
      .prop('AWS_S3_RECORDING_BUCKET', S.string().required()),
  });
}

export * from './app.config';
export * from './aws.config';
