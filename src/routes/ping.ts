import { NowRequestHandler } from 'fastify-now';
import S from 'fluent-json-schema';

export const GET: NowRequestHandler = async function () {
  return {
    isError: false,
    message: 'PONG',
  };
};

GET.opts = {
  schema: {
    response: {
      200: S.object().prop('isError', S.boolean().const(false).required()).prop('message', S.string().required()),
    },
  },
};
