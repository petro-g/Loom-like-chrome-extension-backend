/**
 * Provides configurations related AWS
 */
export const AWS_CONFIG = {
  region: process.env.AWS_REGION,
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  s3: {
    recordingFilesBucket: process.env.AWS_S3_RECORDING_BUCKET,
  },
};
