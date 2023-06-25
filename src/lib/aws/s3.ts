import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

import { AWS_CONFIG } from '../../config';

/**
 * This class talks with Aws s3 service.
 * @class S3Service
 */
class S3Service {
  private s3Client: S3Client;

  /**
   * Creates an instance of S3Service.
   * Instantiate required services
   */
  constructor() {
    this.s3Client = new S3Client({
      region: AWS_CONFIG.region,
      credentials: {
        accessKeyId: AWS_CONFIG.accessKey,
        secretAccessKey: AWS_CONFIG.secretAccessKey,
      },
    });
  }

  /**
   * To put object to S3
   * @param {PutObjectCommandInput} putDataParams
   */
  putObject(putDataParams: PutObjectCommandInput) {
    const command = new PutObjectCommand(putDataParams);
    return this.s3Client.send(command);
  }

  async uploadStreaming(target: PutObjectCommandInput) {
    const parallelUploads3 = new Upload({
      client: this.s3Client,
      params: target,
    });

    const data = await parallelUploads3.done();
    return { uploadData: data, url: await this.getUrl(target) };
  }

  async getUrl(target: { Bucket: string; Key: string }): Promise<string> {
    return `https://s3.${await this.s3Client.config.region()}.amazonaws.com/${target.Bucket}/${target.Key}`;
  }
}
export default new S3Service();
