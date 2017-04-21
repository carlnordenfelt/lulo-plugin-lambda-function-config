# lulo Lambda Function Config

lulo Lambda Function Config allows you to call the UpdateFunctionConfiguration API on an existing Lambda function.

lulo Lambda Function Config is a [lulo](https://github.com/carlnordenfelt/lulo) plugin

# Installation
```
npm install lulo-plugin-lambda-function-config --save
```

## Usage
### Properties
* FunctionName: The name or arn of the lambda function you want to update. Required
* For configuration options, please see [the aws sdk](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#updateFunctionConfiguration-property)

**Note:**
Deleting this resource has no effect on the Lambda function.

### Return Values
None

### Required IAM Permissions
The Custom Resource Lambda requires the following permissions for this plugin to work:
```
{
   "Effect": "Allow",
   "Action": [
        "lambda:UpdateFunctionConfiguration"
   ],
   "Resource": "*"
}
```

## License
[The MIT License (MIT)](/LICENSE)

## Change Log
[Change Log](/CHANGELOG.md)
