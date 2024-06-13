# CDK Template for AWS Lambda Function (Node.js)

This is a Lambda Function CDK template for Node.js using Typescript.
This is useful when you want to quickly deploy a Node.js Lambda function using cdk.

## Getting Started

### 1. Clone this project

```shell
git clone https://github.com/msysh/cdk-template-lambda-nodejs.git
```

If necessary, please change the name of the cloned directory as you like.

### 2. Package install

```shell
pnpm install   # or npm install
```

### 3. Edit Lambda function handler file

The Lambda handler file is in [assets/function/handler.ts](./assets/function/handler.ts).

Please edit the function as you like.

### 4. (Optional) Change CloudFormation Stack Name

If you want to specify a deployed stack name.
Please edit the stack name in [bin/cdk-lambda-nodejs.ts](./bin/cdk-lambda-nodejs.ts#L5) .

```typescript
new Stack(app, 'LambdaNodejsStack-Template', {});
```

### 5. Deploy

```shell
cdk deploy
```

## Clean Up

```shell
cdk destroy
```

## License

Apache 2.0