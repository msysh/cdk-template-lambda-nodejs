import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import {
  aws_iam as iam,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

type LambdaFunctionProps = {
  // someValue: string;
}

export class LambdaFunction extends Construct {

  public readonly role: cdk.aws_iam.IRole;
  public readonly function: cdk.aws_lambda.IFunction;

  constructor (scope: Construct, id: string, props?: LambdaFunctionProps){
    super(scope, id);

    // -----------------------------
    // IAM Policy
    // -----------------------------
    // const policyDocument = new cdk.aws_iam.PolicyDocument({
    //   statements:[
    //     new cdk.aws_iam.PolicyStatement({
    //       effect: cdk.aws_iam.Effect.ALLOW,
    //       actions: [
    //         'xray:PutTraceSegments',
    //         'xray:PutTelemetryRecords',
    //       ],
    //       resources: [ '*' ],
    //     }),
    //   ]
    // });

    // -----------------------------
    // IAM Role
    // -----------------------------
    const role = new cdk.aws_iam.Role(this, 'Role', {
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
      // inlinePolicies: {
      //   'policy': policyDocument
      // }
    });

    // -----------------------------
    // Lambda Function
    // -----------------------------
    const lambdaFunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Function', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_22_X,
      architecture: cdk.aws_lambda.Architecture.ARM_64,
      memorySize: 128,
      timeout: cdk.Duration.minutes(15),
      entry: path.join(__dirname, '../../assets/function/handler.ts'),
      handler: 'handler',
      role: role,
      bundling: {
        minify: true,
        tsconfig: path.join(__dirname, '../../assets/function/tsconfig.json'),
        format: cdk.aws_lambda_nodejs.OutputFormat.ESM,
      },
      environment: {
        SOME_VALUE: 'some-value',
      },
      // awsSdkConnectionReuse: true,
      loggingFormat: cdk.aws_lambda.LoggingFormat.JSON,
      logRetention: cdk.aws_logs.RetentionDays.ONE_MONTH,
      systemLogLevelV2: cdk.aws_lambda.SystemLogLevel.WARN,
      applicationLogLevelV2: cdk.aws_lambda.ApplicationLogLevel.DEBUG,
      // tracing: cdk.aws_lambda.Tracing.ACTIVE,
      currentVersionOptions: {
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      },
    });

    // const liveVersion = lambdaFunction.addAlias('live');

    this.role = role;
    this.function = lambdaFunction;

    // -----------------------------
    // Output
    // -----------------------------
    new cdk.CfnOutput(this, 'LambdaFunctionArn', {
      description: 'Lambda Function ARN',
      value: lambdaFunction.functionArn,
    });
  }
}