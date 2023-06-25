import { NowRequestHandler } from 'fastify-now';
import S from 'fluent-json-schema';
import { awsStsService } from '../../../lib/aws';

export const GET: NowRequestHandler = async function () {
  const credentialsRes = await awsStsService.getTempCredentials();
  const credentials = {
    accessKeyId: credentialsRes.Credentials.AccessKeyId,
    secretAccessKey: credentialsRes.Credentials.SecretAccessKey,
    sessionToken: credentialsRes.Credentials.SessionToken,
    expiration: credentialsRes.Credentials.Expiration,
  };
  return {
    isError: false,
    message: 'Temp Credentials',
    data: credentials,
  };
};

GET.opts = {
  schema: {
    response: {
      200: S.object()
        .prop('isError', S.boolean().const(false).required())
        .prop('message', S.string().required())
        .prop(
          'data',
          S.object()
            .required()
            .prop('accessKeyId', S.string())
            .prop('secretAccessKey', S.string())
            .prop('sessionToken', S.string())
            .prop('expiration', S.string()),
        ),
    },
  },
};
