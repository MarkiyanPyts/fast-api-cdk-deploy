import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pythonLambda from '@aws-cdk/aws-lambda-python-alpha';
import { aws_lambda, aws_apigateway } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FastApiCdkDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fastApiLambda = new pythonLambda.PythonFunction(this, 'FastApiFunction', {
      entry: 'lib/functions/fast_api',
      runtime: aws_lambda.Runtime.PYTHON_3_12,
      handler: 'index.handler',
    });

    const api = new aws_apigateway.LambdaRestApi(this, 'myapi', {
      handler: fastApiLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS
      },
      binaryMediaTypes: ['*/*']
    });



    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'FastApiCdkDeployQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
