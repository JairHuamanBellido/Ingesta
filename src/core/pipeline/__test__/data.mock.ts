import type { Node } from '@xyflow/svelte';

export const CONDITIONAL_NODE: Node = {
	id: 'nodestart',
	type: 'nodeConditional',
	position: { x: -452.8276605451436, y: -30.439722993381444 },
	data: {
		condition: "ctx.log != 'error'"
	},
	measured: { width: 129, height: 42 },
	selected: false,
	dragging: false
};

export const MOCK_NODES = [
	{
		id: 'nodestart',
		type: 'nodeStart',
		position: { x: -452.8276605451436, y: -30.439722993381444 },
		data: {},
		measured: { width: 129, height: 42 },
		selected: false,
		dragging: false
	},
	{
		id: 'eb42c775-935b-495b-8a96-a2a5c458bc67',
		type: 'nodeProcessorAppend',
		position: { x: 75.49166492769572, y: -186.28624864518554 },
		data: {
			type: 'nodeProcessorAppend',
			groupKey: 'data-enrichment',
			key: 'append',
			label: 'Append',
			description: 'Add values to array fields',
			fields: [
				{
					type: 'string',
					key: 'field',
					label: 'Field',
					required: true,
					defaultValue: '',
					value: 'new_file'
				},
				{
					type: 'string',
					key: 'value',
					label: 'Value',
					required: true,
					defaultValue: '',
					value: 'error'
				},
				{
					type: 'boolean',
					key: 'allow_duplicates',
					label: 'Allow Duplicates',
					required: false,
					defaultValue: false
				},
				{
					type: 'string',
					key: 'description',
					label: 'Description',
					required: false,
					defaultValue: ''
				},
				{ type: 'string', key: 'tag', label: 'Tag', required: false, defaultValue: '' },
				{
					type: 'boolean',
					key: 'ignore_failure',
					label: 'Ignore Failure',
					required: false,
					defaultValue: false
				},
				{ type: 'node', key: 'if', label: 'Condition', required: false, defaultValue: '' },
				{ type: 'node', key: 'on_failure', label: 'On Failure', required: false, defaultValue: '' }
			]
		},
		measured: { width: 300, height: 508 },
		selected: true
	}
];
