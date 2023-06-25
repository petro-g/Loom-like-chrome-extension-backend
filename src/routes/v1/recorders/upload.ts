import { NowRequestHandler } from 'fastify-now';
import S from 'fluent-json-schema';
import { AWS_CONFIG } from '../../../config';
import { awsS3Service } from '../../../lib/aws';

export const POST: NowRequestHandler = async function (req) {
  req.log.info('FILE UPLOADING STARTED');

  const uniqueId = Math.random().toString(32).slice(2);
  const data = await req.file();
  const uploadedData = await awsS3Service.uploadStreaming({
    Bucket: AWS_CONFIG.s3.recordingFilesBucket,
    Key: uniqueId,
    Body: data.file,
    ContentType: data.mimetype,
  });

  req.log.info('FILE UPLOADING COMPLETED');
  return {
    isError: false,
    message: 'File uploaded',
    data: {
      fileUrl: uploadedData.url,
    },
  };
};

POST.opts = {
  schema: {
    response: {
      200: S.object()
        .prop('isError', S.boolean().const(false).required())
        .prop('message', S.string().required())
        .prop('data', S.object().prop('fileUrl', S.string().required())),
    },
  },
};
