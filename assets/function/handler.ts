import {
  Handler,
  Context,
} from 'aws-lambda';

const ENV_VALUE_SAMPLE = process.env.SOME_VALUE || 'other-value';

export const handler: Handler = async (event, context: Context) => {
  console.trace(event);

  return {
    statusCode: 200,
    body: 'ok'
  };
};
