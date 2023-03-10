#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MultiStackCdkStack } from '../lib/multi-stack-cdk-stack';

/*const app = new cdk.App({
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

*/
const app = new cdk.App();
const stackDev = new MultiStackCdkStack(app, 'MultiStackCdkStackDev', {
	stackName:'multistack-dev',
	env:{
              region: app.node.tryGetContext('dev')['region'],
              account:app.node.tryGetContext('dev')['account']
	}
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
