import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CONDITIONAL_NODE, MOCK_NODES } from './data.mock';

vi.mock('@xyflow/svelte', () => {
	return {
		getOutgoers: vi.fn().mockReturnValue([MOCK_NODES[1]])
	};
});
import { PipelineBuilder } from '../pipeline-builder';
import { getOutgoers, type Node } from '@xyflow/svelte';
import type { ProcessorsNodeData } from '$core/processors/node.type';

const mockOutgoersFn = getOutgoers as ReturnType<typeof vi.fn>;
describe('PipelineBuilder', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
		mockOutgoersFn.mockClear();
	});

	it('should build a pipeline', () => {
		// Arrange
		mockOutgoersFn.mockReturnValueOnce([MOCK_NODES[1]]).mockReturnValueOnce([]);

		// Act
		const pipelineBuilder = new PipelineBuilder('', MOCK_NODES, []);

		// Assert
		expect(pipelineBuilder.build()).toEqual([{ append: { field: 'new_file', value: 'error' } }]);
	});

	it('should set ignore_failure to a processor', () => {
		// Arrange
		const modifiedNode = structuredClone(MOCK_NODES[1]) as Node<ProcessorsNodeData>;

		modifiedNode.data.fields.find((f) => f.key === 'ignore_failure')!.value = true;
		mockOutgoersFn.mockReturnValueOnce([modifiedNode]).mockReturnValueOnce([]);

		// Act
		const pipelineBuilder = new PipelineBuilder('', MOCK_NODES, []);

		// Assert
		expect(pipelineBuilder.build()).toEqual([
			{ append: { field: 'new_file', value: 'error', ignore_failure: true } }
		]);
	});
	it('should set description to a processor', () => {
		// Arrange
		const modifiedNode = structuredClone(MOCK_NODES[1]) as Node<ProcessorsNodeData>;

		modifiedNode.data.fields.find((f) => f.key === 'description')!.value = 'test description';
		mockOutgoersFn.mockReturnValueOnce([modifiedNode]).mockReturnValueOnce([]);

		// Act
		const pipelineBuilder = new PipelineBuilder('', MOCK_NODES, []);

		// Assert
		expect(pipelineBuilder.build()).toEqual([
			{ append: { field: 'new_file', value: 'error', description: 'test description' } }
		]);
	});

	it('should set condition to a processor', () => {
		// Arrange
		const copyNode = structuredClone(MOCK_NODES[1]) as Node<ProcessorsNodeData>;

		mockOutgoersFn.mockReturnValueOnce([copyNode]).mockReturnValueOnce([CONDITIONAL_NODE]);

		// Act
		const pipelineBuilder = new PipelineBuilder('', MOCK_NODES, []);

		// Assert
		expect(pipelineBuilder.build()).toEqual([
			{ append: { field: 'new_file', value: 'error', if: "ctx.log != 'error'" } }
		]);
	});

	it('should set on_failure to a processor', () => {
		// Arrange
		const copyNode = structuredClone(MOCK_NODES[1]) as Node<ProcessorsNodeData>;
		const onFailureNode = structuredClone(MOCK_NODES[1]) as Node<ProcessorsNodeData>;

		mockOutgoersFn
			.mockReturnValueOnce([copyNode])
			.mockReturnValueOnce([onFailureNode])
			.mockReturnValueOnce([]);

		// Act
		const pipelineBuilder = new PipelineBuilder('', MOCK_NODES, []);

		// Assert
		expect(pipelineBuilder.build()).toEqual([
			{
				append: {
					field: 'new_file',
					value: 'error',
					on_failure: [{ append: { field: 'new_file', value: 'error' } }]
				}
			}
		]);
	});
});
