import type { OpensearchSearchResponse } from '../types';
import type {
	MachineLearningConnectorOpensearch,
	MachineLearningModelGroupCreateResponse,
	MachineLearningModelGroupOpensearch
} from '../types/machine-learning.types';

export const MLConnectorsMockResponse: OpensearchSearchResponse<MachineLearningConnectorOpensearch> =
	{
		hits: {
			total: {
				value: 1
			},
			hits: [
				{
					_id: 'test-id',
					_source: {
						description: 'test-description',
						last_update_time: 1768167358221,
						name: 'test-name',
						protocol: 'http',
						version: 'v1.0',
						parameters: {
							model: 'test-model'
						}
					}
				}
			]
		}
	};

export const MLModelGroupsMockResponse: OpensearchSearchResponse<MachineLearningModelGroupOpensearch> =
	{
		hits: {
			total: {
				value: 1
			},
			hits: [
				{
					_id: 'test-id',
					_source: {
						access: 'public',
						latest_version: 1,
						name: 'test-name-group',
						description: 'test-description-group',
						created_time: 1768167358221,
						last_updated_time: 1768167358221
					}
				}
			]
		}
	};

export const MLCreateModelGroupMockResponse: MachineLearningModelGroupCreateResponse = {
	model_group_id: 'test-model-group-id',
	status: 'CREATED'
};
