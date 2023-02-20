#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MultiStackCdkStack } from '../lib/multi-stack-cdk-stack';

const app = new cdk.App({
context:{
   prod: {
         account:'12321312',
	region:'us-east-1'
   },
   dev: {

       account:'123231',
       region:'us-east-2'
   }   
}		       
});
const stackDev = new MultiStackCdkStack(app, 'MultiStackCdkStackDev', {
	stackName:'multistack-dev',
	env:{
              region: app.node.tryGetContext('dev')['region'],
              account:app.node.tryGetContext('dev')['account']
	}
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
console.log('dev-account',stackDev.account);
const stackProd = new MultiStackCdkStack(app,'MultiStackCdkStackProd',{
  stackName:'multistack-prod',
  env:{
      region:app.node.tryGetContext('prod')['region'],
      account:app.node.tryGetContext('prod')['account']
  }
});
console.log('prod-account',stackProd.account);
