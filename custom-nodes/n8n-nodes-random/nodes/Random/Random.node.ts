import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
} from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    icon: 'file:random.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Generate random numbers using Random.org API',
    defaults: {
      name: 'Random',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Random Number Generator',
            value: 'generateRandomNumber',
            description: 'Generate a random number using Random.org',
            action: 'Generate a random number',
          },
        ],
        default: 'generateRandomNumber',
      },
      {
        displayName: 'Min Value',
        name: 'min',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['generateRandomNumber'],
          },
        },
        default: 1,
        description: 'The min value for the random number',
        required: true,
      },
      {
        displayName: 'Max Value',
        name: 'max',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['generateRandomNumber'],
          },
        },
        default: 100,
        description: 'The max value for the random number',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const operation = this.getNodeParameter('operation', 0);

    for (let i = 0; i < items.length; i++) {
      if (operation === 'generateRandomNumber') {
        const min = this.getNodeParameter('min', i) as number;
        const max = this.getNodeParameter('max', i) as number;

        if (min > max) {
          throw new NodeApiError(this.getNode(), {
            message: 'Min value cant be greater than max value',
            description: 'Please keep the min value is less than or equal to the max value',
          });
        }

        if (!Number.isInteger(min) || !Number.isInteger(max)) {
          throw new NodeApiError(this.getNode(), {
            message: 'Min and max values must be integers',
            description: 'Please provide integer values for both min and max parameters',
          });
        }

        try {
          const randomOrgUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

          const response = await this.helpers.request({
            method: 'GET',
            uri: randomOrgUrl,
            headers: {
              'User-Agent': 'n8n-custom-random-node/1.0.0',
            },
          });

          const randomNumber = parseInt(response.trim(), 10);

          if (isNaN(randomNumber)) {
            throw new NodeApiError(this.getNode(), {
              message: 'Failed to parse random number from Random.org response',
              description: 'The API response was not a valid number',
            });
          }

          returnData.push({
            json: {
              randomNumber,
              min,
              max,
              source: 'random.org',
              timestamp: new Date().toISOString(),
            },
            pairedItem: {
              item: i,
            },
          });

        } catch (error) {
          if (error instanceof NodeApiError) {
            throw error;
          }

          const errorMessage = error instanceof Error ? error.message : String(error);

          throw new NodeApiError(this.getNode(), {
            message: 'Failed to generate random number',
            description: `Error calling Random.org API: ${errorMessage}`,
          });
        }
      }
    }

    return [returnData];
  }
}
