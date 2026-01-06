import type { IProcessor } from '$infrastructure/model/pipeline.model';

export type ProcessorValue =
	| string
	| Array<string>
	| { key: string; value: string }[]
	| boolean
	| IProcessor[]
	| Record<string, string>;
export type ProcessorsNodeData = {
	/**
	 * Key of the processor node, e.g uppercase, set or append
	 */
	key: string;
	/**
	 * Description of the processor
	 */
	description: string;
	/**
	 * Type of the node processor, e.g nodeProcessorUppercase, nodeProcessorSet
	 */
	type: string;
	/**
	 * Label to display for the processor
	 */
	label: string;

	/**
	 * Group key to categorize the processor
	 */
	groupKey: string;

	fields: Array<{
		label: string;
		value: ProcessorValue;
		required: boolean;
		key: string;
		type: string;
		helperText?: { text: string; link: string };
		defaultValue?: string | Array<string>;
	}>;
};

export type ConditionalNodeData = {
	condition: string;
};
