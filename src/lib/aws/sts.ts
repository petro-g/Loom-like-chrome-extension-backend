import { STSClient, GetSessionTokenCommand } from '@aws-sdk/client-sts';

import { AWS_CONFIG } from '../../config';

/**
 * This class talks with Aws STS service.
 * @class StsService
 */
class StsService {
  private stsClient: STSClient;

  /**
   * Creates an instance of StsService.
   * Instantiate required services
   */
  constructor() {
    this.stsClient = new STSClient({
      region: AWS_CONFIG.region,
      credentials: {
        accessKeyId: AWS_CONFIG.accessKey,
        secretAccessKey: AWS_CONFIG.secretAccessKey,
      },
    });
  }

  /**
   * To get temporary credentials of current user
   */
  getTempCredentials() {
    const command = new GetSessionTokenCommand({
      DurationSeconds: 900,
    });
    return this.stsClient.send(command);
  }
}
export default new StsService();
