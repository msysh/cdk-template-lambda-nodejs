import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { LambdaFunction } from './constructs/lambda-function';

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new LambdaFunction(this, 'LambdaFunction');
  }
}
