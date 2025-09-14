import json

def handler(event, context):
    """
    AWS Lambda handler function.
    """
    print(f"Received event: {json.dumps(event)}")
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }