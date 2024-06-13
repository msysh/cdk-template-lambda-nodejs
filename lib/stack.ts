import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // -----------------------------
    // Lambda
    // -----------------------------
    const policyDocument = new cdk.aws_iam.PolicyDocument({
      statements:[
        // new cdk.aws_iam.PolicyStatement({
        //   effect: cdk.aws_iam.Effect.ALLOW,
        //   actions: [
        //     'xray:PutTraceSegments',
        //     'xray:PutTelemetryRecords',
        //   ],
        //   resources: [ '*' ],
        // }),
      ]
    });

    const role = new cdk.aws_iam.Role(this, 'FunctionRole', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
      // inlinePolicies: {
      //   'policy': policyDocument
      // }
    });

    const lambdaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'LambdaFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      entry: 'assets/function/handler.ts',
      handler: 'handler',
      bundling: {
        minify: true,
        tsconfig: 'assets/function/tsconfig.json',
        format: cdk.aws_lambda_nodejs.OutputFormat.ESM,
      },
      environment: {
        SOME_VALUE: 'some-value',
      },
      architecture: cdk.aws_lambda.Architecture.ARM_64,
      // awsSdkConnectionReuse: true,
      role: role,
      timeout: cdk.Duration.minutes(15),
      loggingFormat: cdk.aws_lambda.LoggingFormat.JSON,
      logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK,
      applicationLogLevel: cdk.aws_lambda.ApplicationLogLevel.DEBUG,
      // tracing: cdk.aws_lambda.Tracing.ACTIVE,
    });

    new cdk.CfnOutput(this, 'OutputLambdaFunctionArn', {
      description: 'Lambda Function ARN',
      value: lambdaFunction.functionArn,
    });
  }
}
