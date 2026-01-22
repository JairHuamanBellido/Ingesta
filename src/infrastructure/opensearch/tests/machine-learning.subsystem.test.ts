import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MachineLearningSubsystem } from '../subsystem/machine-learning.subsystem';
import type { OpenSearchErrorResponse } from '../types';
import {
	MLConnectorsMockResponse,
	MLCreateConnectorMockResponse,
	MLCreateModelGroupMockResponse,
	MLModelGroupsMockResponse
} from './data.mock';

const axiosMock = vi.mocked({
	get: vi.fn(),
	post: vi.fn(),
	isAxiosError: vi.fn()
});

vi.mock('axios', async (importActual) => {
	const actual = await importActual<typeof import('axios')>();

	const mockAxios = {
		default: {
			...actual.default,
			isAxiosError: (payload: any) => axiosMock.isAxiosError(payload),
			create: vi.fn(() => ({
				...actual.default.create(),
				get: axiosMock.get,
				post: axiosMock.post
			}))
		}
	};

	return mockAxios;
});

describe('Machine Learning Subsystem', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('should create a new instance', () => {
		const machineLearning = new MachineLearningSubsystem();
		expect(machineLearning).toBeDefined();
	});

	it('should successfully retrieve all ML connectors', async () => {
		// Arrange
		axiosMock.post.mockResolvedValue({
			data: MLConnectorsMockResponse,
			status: 200
		});

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const connectors = await machineLearning.getMLConnectors();

		// Assert
		expect(connectors.isSuccess).toBe(true);
		expect(connectors.data).toEqual(MLConnectorsMockResponse);
		expect(connectors.statusCode).toBe(200);
		expect(axiosMock.post).toHaveBeenCalledWith('/_plugins/_ml/connectors/_search', {
			query: {
				match_all: {}
			},
			from: 0,
			size: 10
		});
	});

	it('should handle error when retrieving ML connectors if connection is refused', async () => {
		// Arrange
		const axiosError = {
			name: 'AggregateError',
			toJSON: vi.fn().mockReturnValue({
				code: 'ECONNREFUSED',
				message: 'Connection refused',
				name: 'AggregateError'
			})
		};
		axiosMock.isAxiosError.mockReturnValue(true);
		axiosMock.post.mockRejectedValue(axiosError);

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const connectors = await machineLearning.getMLConnectors();

		// Assert
		expect(connectors.isSuccess).toBe(false);
		expect(connectors.statusCode).toBe(500);
		expect((connectors.data as OpenSearchErrorResponse)?.error?.code).toBe('ECONNREFUSED');
		expect((connectors.data as OpenSearchErrorResponse)?.error?.reason).toBe('Connection refused');
	});

	// unknown error
	it('should handle error when retrieving ML connectors if receive an unknown error', async () => {
		// Arrange
		const axiosError = new Error('Unknown error');
		axiosMock.isAxiosError.mockReturnValue(false);
		axiosMock.post.mockRejectedValue(axiosError);

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const connectors = await machineLearning.getMLConnectors();

		// Assert
		expect(connectors.isSuccess).toBe(false);
		expect(connectors.statusCode).toBe(500);
		expect((connectors.data as OpenSearchErrorResponse)?.error?.reason).toBe('Unknown error');
		expect((connectors.data as OpenSearchErrorResponse)?.error?.type).toBe('Internal Server Error');
	});

	it('should successfully retrieve all Model Groups', async () => {
		// Arrange
		axiosMock.post.mockResolvedValue({
			data: MLModelGroupsMockResponse,
			status: 200
		});

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const modelGroups = await machineLearning.getAllModelGroups();

		// Assert
		expect(modelGroups.isSuccess).toBe(true);
		expect(modelGroups.data).toEqual(MLModelGroupsMockResponse);
		expect(modelGroups.statusCode).toBe(200);
		expect(axiosMock.post).toHaveBeenCalledWith('/_plugins/_ml/model_groups/_search', {
			query: {
				match_all: {}
			},
			from: 0,
			size: 10
		});
	});

	it('should handle error when retrieving all Model Groups if connection is refused', async () => {
		// Arrange
		const axiosError = {
			name: 'AggregateError',
			toJSON: vi.fn().mockReturnValue({
				code: 'ECONNREFUSED',
				message: 'Connection refused',
				name: 'AggregateError'
			})
		};
		axiosMock.isAxiosError.mockReturnValue(true);
		axiosMock.post.mockRejectedValue(axiosError);

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const modelGroups = await machineLearning.getAllModelGroups();

		// Assert
		expect(modelGroups.isSuccess).toBe(false);
		expect(modelGroups.statusCode).toBe(500);
		expect((modelGroups.data as OpenSearchErrorResponse)?.error?.code).toBe('ECONNREFUSED');
		expect((modelGroups.data as OpenSearchErrorResponse)?.error?.reason).toBe('Connection refused');
	});

	// unknown error
	it('should handle error when retrieving all Model Groups if receive an unknown error', async () => {
		// Arrange
		const axiosError = new Error('Unknown error');
		axiosMock.isAxiosError.mockReturnValue(false);
		axiosMock.post.mockRejectedValue(axiosError);

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const modelGroups = await machineLearning.getAllModelGroups();

		// Assert
		expect(modelGroups.isSuccess).toBe(false);
		expect(modelGroups.statusCode).toBe(500);
		expect((modelGroups.data as OpenSearchErrorResponse)?.error?.reason).toBe('Unknown error');
		expect((modelGroups.data as OpenSearchErrorResponse)?.error?.type).toBe(
			'Internal Server Error'
		);
	});

	it('should successfully create a Model Group', async () => {
		// Arrange
		axiosMock.post.mockResolvedValue({
			data: MLCreateModelGroupMockResponse,
			status: 200
		});

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const modelGroup = await machineLearning.createModelGroup({
			name: 'test-model-group',
			description: 'test-model-group-description'
		});

		// Assert
		expect(modelGroup.isSuccess).toBe(true);
		expect(modelGroup.data).toEqual(MLCreateModelGroupMockResponse);
		expect(modelGroup.statusCode).toBe(200);
		expect(axiosMock.post).toHaveBeenCalledWith('/_plugins/_ml/model_groups/_register', {
			name: 'test-model-group',
			description: 'test-model-group-description'
		});
	});

	it('should successfully create a ml connector', async () => {
		// Arrange
		axiosMock.post.mockResolvedValue({
			data: MLCreateConnectorMockResponse,
			status: 200
		});

		// Act
		const machineLearning = new MachineLearningSubsystem();
		const connector = await machineLearning.createMlConnector({
			actions: [],
			credential: {},
			description: '',
			name: '',
			parameters: {},
			protocol: 'http',
			version: '1.1'
		});

		// Assert
		expect(connector.isSuccess).toBe(true);
		expect(connector.data).toEqual(MLCreateConnectorMockResponse);
		expect(connector.statusCode).toBe(200);
	});
});
