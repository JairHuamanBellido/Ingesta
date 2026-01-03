import type { IPipeline } from '$infrastructure/model/pipeline.model';
import { basic_template } from '@/components/simulation-sheet/simulation-list';

interface IPipelineTemplate {
	key: string;
	name: string;
	pipeline: Omit<IPipeline, 'tests' | 'key' | 'description' | 'name'>;
}

const BLANK_PIPELINE: Omit<IPipeline, 'tests' | 'key' | 'description' | 'name'> = {
	edges: [],
	nodes: [
		{
			id: `nodestart`,
			type: 'nodeStart',
			position: { x: 0, y: 0 },
			data: {}
		}
	],
	processors: [],
	simulation_input_payload: basic_template
};
const CSV_DATA_PARSER_PIPELINE: Omit<IPipeline, 'tests' | 'key' | 'description' | 'name'> = {
	simulation_input_payload: basic_template,
	edges: [
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: 'd9dc96c4-ee4b-47e6-a275-02a281428c25',
			targetHandle: 'node-processor-d9dc96c4-ee4b-47e6-a275-02a281428c25-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-d9dc96c4-ee4b-47e6-a275-02a281428c25node-processor-d9dc96c4-ee4b-47e6-a275-02a281428c25-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: 'e8104a41-fe19-4a6e-9645-602177540e2d',
			targetHandle: 'node-processor-e8104a41-fe19-4a6e-9645-602177540e2d-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-e8104a41-fe19-4a6e-9645-602177540e2dnode-processor-e8104a41-fe19-4a6e-9645-602177540e2d-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: 'd5ec6789-a80a-497c-b167-c53fbc1faf43',
			targetHandle: 'node-processor-d5ec6789-a80a-497c-b167-c53fbc1faf43-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-d5ec6789-a80a-497c-b167-c53fbc1faf43node-processor-d5ec6789-a80a-497c-b167-c53fbc1faf43-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: 'a7709411-24ff-48ee-bd84-51963fe9bee5',
			targetHandle: 'node-processor-a7709411-24ff-48ee-bd84-51963fe9bee5-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-a7709411-24ff-48ee-bd84-51963fe9bee5node-processor-a7709411-24ff-48ee-bd84-51963fe9bee5-target-handle'
		}
	],
	nodes: [
		{
			id: 'nodestart',
			type: 'nodeStart',
			position: { x: -1829.9041919759009, y: -94.7519923280548 },
			data: {},
			measured: { width: 129, height: 42 },
			selected: false,
			dragging: false
		},
		{
			id: 'd9dc96c4-ee4b-47e6-a275-02a281428c25',
			type: 'nodeProcessorCsv',
			position: { x: -1113.7838141048142, y: -590.9456266003058 },
			data: {
				type: 'nodeProcessorCsv',
				groupKey: 'parsing-and-extraction',
				key: 'csv',
				label: 'CSV',
				description: 'Parse CSV data into fields',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: '',
						value: 'message'
					},
					{
						type: 'string',
						key: 'target_fields',
						label: 'Target Fields',
						required: true,
						defaultValue: [],
						value: ['name', 'age', 'email', 'signup_date', 'revenue']
					},
					{
						type: 'string',
						key: 'separator',
						label: 'Separator',
						required: false,
						defaultValue: ','
					},
					{
						type: 'string',
						key: 'empty_value',
						label: 'Empty Value',
						required: false,
						defaultValue: ''
					},
					{ type: 'boolean', key: 'trim', label: 'Trim', required: false, defaultValue: false },
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 686 },
			selected: false,
			dragging: false
		},
		{
			id: 'e8104a41-fe19-4a6e-9645-602177540e2d',
			type: 'nodeProcessorConvert',
			position: { x: -1117.9757049874866, y: 117.49648557966233 },
			data: {
				type: 'nodeProcessorConvert',
				groupKey: 'data-transformation',
				key: 'convert',
				label: 'Convert',
				description: 'Convert field to a different type',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: '',
						value: 'age'
					},
					{
						type: 'select',
						key: 'type',
						label: 'Type',
						required: true,
						defaultValue: 'string',
						options: ['integer', 'long', 'float', 'double', 'string', 'boolean', 'auto'],
						value: 'integer'
					},
					{
						type: 'string',
						key: 'target_field',
						label: 'Target Field',
						required: false,
						defaultValue: ''
					},
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 580 },
			selected: false,
			dragging: false
		},
		{
			id: 'd5ec6789-a80a-497c-b167-c53fbc1faf43',
			type: 'nodeProcessorDate',
			position: { x: -783.5893918867396, y: 115.73668082806626 },
			data: {
				type: 'nodeProcessorDate',
				groupKey: 'parsing-and-extraction',
				key: 'date',
				label: 'Date',
				description: 'Parse dates from fields',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: '',
						value: 'signup_date'
					},
					{
						type: 'array',
						key: 'formats',
						label: 'Formats',
						required: true,
						defaultValue: [],
						helperText: {
							text: 'Learn more about supported date formats.',
							link: 'https://docs.opensearch.org/latest/mappings/supported-field-types/date'
						},
						value: ['yyyy-MM-dd']
					},
					{
						type: 'string',
						key: 'target_field',
						label: 'Target Field',
						required: false,
						defaultValue: '',
						value: 'signup_timestamp'
					},
					{
						type: 'string',
						key: 'timezone',
						label: 'Timezone',
						required: false,
						defaultValue: ''
					},
					{ type: 'string', key: 'locale', label: 'Locale', required: false, defaultValue: '' },
					{
						type: 'string',
						key: 'output_format',
						label: 'Output Format',
						required: false,
						defaultValue: '',
						helperText: {
							text: 'Learn more about supported date formats.',
							link: 'https://docs.opensearch.org/latest/mappings/supported-field-types/date'
						}
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 841 },
			selected: false,
			dragging: false
		},
		{
			id: 'a7709411-24ff-48ee-bd84-51963fe9bee5',
			type: 'nodeProcessorRemove',
			position: { x: -1494.405606017094, y: 226.18750904362378 },
			data: {
				type: 'nodeProcessorRemove',
				groupKey: 'filtering-and-cleanup',
				key: 'remove',
				label: 'Remove',
				description: 'Remove fields from documents',
				fields: [
					{
						type: 'array',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: [],
						value: ['message', 'signup_date']
					},
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 504 },
			selected: true,
			dragging: false
		}
	],
	processors: [
		{
			csv: {
				field: 'message',
				target_fields: ['name', 'age', 'email', 'signup_date', 'revenue']
			}
		},
		{ convert: { field: 'age', type: 'integer' } },
		{
			date: { field: 'signup_date', formats: ['yyyy-MM-dd'], target_field: 'signup_timestamp' }
		},
		{ remove: { field: ['message', 'signup_date'] } }
	]
};

const SECURITY_FIREWALL_LOGS_PIPELINE: Omit<IPipeline, 'tests' | 'key' | 'description' | 'name'> = {
	simulation_input_payload: basic_template,
	edges: [
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: '74f78902-30e2-42d3-b0f0-45011372dc27',
			targetHandle: 'node-processor-74f78902-30e2-42d3-b0f0-45011372dc27-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-74f78902-30e2-42d3-b0f0-45011372dc27node-processor-74f78902-30e2-42d3-b0f0-45011372dc27-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: '4096c5de-e22a-41f8-ade2-bd70cf6c1c30',
			targetHandle: 'node-processor-4096c5de-e22a-41f8-ade2-bd70cf6c1c30-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-4096c5de-e22a-41f8-ade2-bd70cf6c1c30node-processor-4096c5de-e22a-41f8-ade2-bd70cf6c1c30-target-handle'
		},
		{
			source: '4096c5de-e22a-41f8-ade2-bd70cf6c1c30',
			sourceHandle: 'node-processor-4096c5de-e22a-41f8-ade2-bd70cf6c1c30-conditional-source',
			target: '385e46ab-e591-447d-bcb5-ef47c81406a5',
			targetHandle: 'node-conditional-target-handle',
			id: 'xy-edge__4096c5de-e22a-41f8-ade2-bd70cf6c1c30node-processor-4096c5de-e22a-41f8-ade2-bd70cf6c1c30-conditional-source-385e46ab-e591-447d-bcb5-ef47c81406a5node-conditional-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: 'cb3cf7fb-438c-4f43-a7f9-596fb5753236',
			targetHandle: 'node-processor-cb3cf7fb-438c-4f43-a7f9-596fb5753236-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-cb3cf7fb-438c-4f43-a7f9-596fb5753236node-processor-cb3cf7fb-438c-4f43-a7f9-596fb5753236-target-handle'
		},
		{
			source: 'cb3cf7fb-438c-4f43-a7f9-596fb5753236',
			sourceHandle: 'node-processor-cb3cf7fb-438c-4f43-a7f9-596fb5753236-conditional-source',
			target: '5160e74e-5520-48de-b226-6c531740bafe',
			targetHandle: 'node-conditional-target-handle',
			id: 'xy-edge__cb3cf7fb-438c-4f43-a7f9-596fb5753236node-processor-cb3cf7fb-438c-4f43-a7f9-596fb5753236-conditional-source-5160e74e-5520-48de-b226-6c531740bafenode-conditional-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: '3c0eec61-1368-4463-91aa-b1df0d924c53',
			targetHandle: 'node-processor-3c0eec61-1368-4463-91aa-b1df0d924c53-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-3c0eec61-1368-4463-91aa-b1df0d924c53node-processor-3c0eec61-1368-4463-91aa-b1df0d924c53-target-handle'
		},
		{
			source: 'nodestart',
			sourceHandle: 'node-start-source-handle',
			target: '7dba0496-375b-42de-855b-0bbf1bf153ad',
			targetHandle: 'node-processor-7dba0496-375b-42de-855b-0bbf1bf153ad-target-handle',
			id: 'xy-edge__nodestartnode-start-source-handle-7dba0496-375b-42de-855b-0bbf1bf153adnode-processor-7dba0496-375b-42de-855b-0bbf1bf153ad-target-handle'
		}
	],
	nodes: [
		{
			id: 'nodestart',
			type: 'nodeStart',
			position: { x: -2241.263412326596, y: 311.07275631456474 },
			data: {},
			measured: { width: 129, height: 42 },
			selected: false,
			dragging: false
		},
		{
			id: '74f78902-30e2-42d3-b0f0-45011372dc27',
			type: 'nodeProcessorGrok',
			position: { x: -1642.2102989644866, y: -348.9043113670099 },
			data: {
				type: 'nodeProcessorGrok',
				groupKey: 'parsing-and-extraction',
				key: 'grok',
				label: 'Grok',
				description: 'Parse unstructured data using grok patterns',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: '',
						value: 'message'
					},
					{
						type: 'array',
						key: 'patterns',
						label: 'Patterns',
						required: true,
						defaultValue: [''],
						value: [
							'%{WORD:action} %{WORD:protocol} %{IP:src_ip}:%{NUMBER:src_port} -> %{IP:dest_ip}:%{NUMBER:dest_port}'
						]
					},
					{
						type: 'object',
						key: 'pattern_definitions',
						label: 'Pattern Definitions',
						required: false,
						defaultValue: {}
					},
					{
						type: 'boolean',
						key: 'trace_match',
						label: 'Trace Match',
						required: false,
						defaultValue: false
					},
					{
						type: 'boolean',
						key: 'capture_all_matches',
						label: 'Capture All Matches',
						required: false,
						defaultValue: false
					},
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 645 },
			selected: false,
			dragging: false
		},
		{
			id: '4096c5de-e22a-41f8-ade2-bd70cf6c1c30',
			type: 'nodeProcessorSet',
			position: { x: -1640.455746643493, y: 310.443938641365 },
			data: {
				type: 'nodeProcessorSet',
				groupKey: 'data-enrichment',
				key: 'set',
				label: 'Set',
				description: 'Set or overwrite field values',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field Name',
						required: true,
						defaultValue: '',
						value: 'threat_level'
					},
					{
						type: 'string',
						key: 'value',
						label: 'Value',
						required: true,
						defaultValue: '',
						value: 'low'
					},
					{
						type: 'boolean',
						key: 'override',
						label: 'Override',
						required: false,
						defaultValue: false
					},
					{
						type: 'boolean',
						key: 'ignore_empty_value',
						label: 'Ignore Empty Value',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 542 },
			selected: false,
			dragging: false
		},
		{
			id: '385e46ab-e591-447d-bcb5-ef47c81406a5',
			type: 'nodeConditional',
			position: { x: -1229.9316308968664, y: 569.9839650789876 },
			data: {
				type: 'nodeConditional',
				groupKey: 'advanced',
				key: 'conditional',
				label: 'Conditional',
				description: 'Conditional Group',
				condition: "ctx.action == 'ALLOW'"
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 159 },
			selected: false,
			dragging: false
		},
		{
			id: 'cb3cf7fb-438c-4f43-a7f9-596fb5753236',
			type: 'nodeProcessorSet',
			position: { x: -1649.7296046442436, y: 878.4327076138998 },
			data: {
				type: 'nodeProcessorSet',
				groupKey: 'data-enrichment',
				key: 'set',
				label: 'Set',
				description: 'Set or overwrite field values',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field Name',
						required: true,
						defaultValue: '',
						value: 'threat_level'
					},
					{
						type: 'string',
						key: 'value',
						label: 'Value',
						required: true,
						defaultValue: '',
						value: 'high'
					},
					{
						type: 'boolean',
						key: 'override',
						label: 'Override',
						required: false,
						defaultValue: false
					},
					{
						type: 'boolean',
						key: 'ignore_empty_value',
						label: 'Ignore Empty Value',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 542 },
			selected: false,
			dragging: false
		},
		{
			id: '5160e74e-5520-48de-b226-6c531740bafe',
			type: 'nodeConditional',
			position: { x: -1240.7816002886682, y: 1182.017480140607 },
			data: {
				type: 'nodeConditional',
				groupKey: 'advanced',
				key: 'conditional',
				label: 'Conditional',
				description: 'Conditional Group',
				condition: "ctx.action == 'DENY'"
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 159 },
			selected: false,
			dragging: false
		},
		{
			id: '3c0eec61-1368-4463-91aa-b1df0d924c53',
			type: 'nodeProcessorConvert',
			position: { x: -1654.9285125989445, y: 1451.508860786967 },
			data: {
				type: 'nodeProcessorConvert',
				groupKey: 'data-transformation',
				key: 'convert',
				label: 'Convert',
				description: 'Convert field to a different type',
				fields: [
					{
						type: 'string',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: '',
						value: 'dest_port'
					},
					{
						type: 'select',
						key: 'type',
						label: 'Type',
						required: true,
						defaultValue: 'string',
						options: ['integer', 'long', 'float', 'double', 'string', 'boolean', 'auto'],
						value: 'integer'
					},
					{
						type: 'string',
						key: 'target_field',
						label: 'Target Field',
						required: false,
						defaultValue: ''
					},
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 580 },
			selected: false,
			dragging: false
		},
		{
			id: '7dba0496-375b-42de-855b-0bbf1bf153ad',
			type: 'nodeProcessorRemove',
			position: { x: -2096.0794506688953, y: 1102.1630055453995 },
			data: {
				type: 'nodeProcessorRemove',
				groupKey: 'filtering-and-cleanup',
				key: 'remove',
				label: 'Remove',
				description: 'Remove fields from documents',
				fields: [
					{
						type: 'array',
						key: 'field',
						label: 'Field',
						required: true,
						defaultValue: [],
						value: ['message']
					},
					{
						type: 'boolean',
						key: 'ignore_missing',
						label: 'Ignore Missing',
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
					{
						type: 'node',
						key: 'on_failure',
						label: 'On Failure',
						required: false,
						defaultValue: ''
					}
				]
			},
			origin: [0.5, 0],
			measured: { width: 300, height: 452 },
			selected: true,
			dragging: false
		}
	],
	processors: [
		{
			grok: {
				field: 'message',
				patterns: [
					'%{WORD:action} %{WORD:protocol} %{IP:src_ip}:%{NUMBER:src_port} -> %{IP:dest_ip}:%{NUMBER:dest_port}'
				]
			}
		},
		{ set: { field: 'threat_level', value: 'low', if: "ctx.action == 'ALLOW'" } },
		{ set: { field: 'threat_level', value: 'high', if: "ctx.action == 'DENY'" } },
		{ convert: { field: 'dest_port', type: 'integer' } },
		{ remove: { field: ['message'] } }
	]
};

const ECOMMERCE_EVENT_TRACKING_PIPELINE: Omit<IPipeline, 'tests' | 'key' | 'description' | 'name'> =
	{
		simulation_input_payload: basic_template,
		edges: [
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: '9f4cf125-bfc6-46e4-9db3-71004bac5a7c',
				targetHandle: 'node-processor-9f4cf125-bfc6-46e4-9db3-71004bac5a7c-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-9f4cf125-bfc6-46e4-9db3-71004bac5a7cnode-processor-9f4cf125-bfc6-46e4-9db3-71004bac5a7c-target-handle'
			},
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: '43d94565-cbec-4690-8511-8865964a1243',
				targetHandle: 'node-processor-43d94565-cbec-4690-8511-8865964a1243-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-43d94565-cbec-4690-8511-8865964a1243node-processor-43d94565-cbec-4690-8511-8865964a1243-target-handle'
			},
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: '40711aab-36e8-4b03-af23-dd6b1dd31031',
				targetHandle: 'node-processor-40711aab-36e8-4b03-af23-dd6b1dd31031-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-40711aab-36e8-4b03-af23-dd6b1dd31031node-processor-40711aab-36e8-4b03-af23-dd6b1dd31031-target-handle'
			},
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: 'c6f29683-7513-4c4d-b75f-df60f8f857e6',
				targetHandle: 'node-processor-c6f29683-7513-4c4d-b75f-df60f8f857e6-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-c6f29683-7513-4c4d-b75f-df60f8f857e6node-processor-c6f29683-7513-4c4d-b75f-df60f8f857e6-target-handle'
			},
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: '0e7878cd-838e-4bf5-8fd1-64cd3103f939',
				targetHandle: 'node-processor-0e7878cd-838e-4bf5-8fd1-64cd3103f939-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-0e7878cd-838e-4bf5-8fd1-64cd3103f939node-processor-0e7878cd-838e-4bf5-8fd1-64cd3103f939-target-handle'
			},
			{
				source: 'nodestart',
				sourceHandle: 'node-start-source-handle',
				target: 'b975ac4e-af80-4083-8bf5-a3cf623d3506',
				targetHandle: 'node-processor-b975ac4e-af80-4083-8bf5-a3cf623d3506-target-handle',
				id: 'xy-edge__nodestartnode-start-source-handle-b975ac4e-af80-4083-8bf5-a3cf623d3506node-processor-b975ac4e-af80-4083-8bf5-a3cf623d3506-target-handle'
			}
		],
		nodes: [
			{
				id: 'nodestart',
				type: 'nodeStart',
				position: { x: -2331.59994681514, y: 286.6287528647235 },
				data: {},
				measured: { width: 129, height: 42 },
				selected: false,
				dragging: false
			},
			{
				id: '9f4cf125-bfc6-46e4-9db3-71004bac5a7c',
				type: 'nodeProcessorJson',
				position: { x: -1952.388583885955, y: 18.901012852550778 },
				data: {
					type: 'nodeProcessorJson',
					groupKey: 'parsing-and-extraction',
					key: 'json',
					label: 'JSON',
					description: 'Parse JSON strings into structured objects',
					fields: [
						{
							type: 'string',
							key: 'field',
							label: 'Field',
							required: true,
							defaultValue: '',
							value: 'event_data'
						},
						{
							type: 'string',
							key: 'target_field',
							label: 'Target Field',
							required: false,
							defaultValue: '',
							value: 'event'
						},
						{
							type: 'boolean',
							key: 'add_to_root',
							label: 'Add to Root',
							required: false,
							defaultValue: false
						},
						{
							type: 'boolean',
							key: 'ignore_missing',
							label: 'Ignore Missing',
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 542 },
				selected: false,
				dragging: false
			},
			{
				id: '43d94565-cbec-4690-8511-8865964a1243',
				type: 'nodeProcessorFingerprint',
				position: { x: -1951.8820164353924, y: 594.8574794533132 },
				data: {
					type: 'nodeProcessorFingerprint',
					groupKey: 'advanced',
					key: 'fingerprint',
					label: 'Fingerprint',
					description: 'Generate a hash of document fields',
					fields: [
						{
							type: 'array',
							key: 'fields',
							label: 'Fields',
							required: true,
							defaultValue: [''],
							value: ['event.user_id', 'event.session_start']
						},
						{
							type: 'array',
							key: 'exclude_fields',
							label: 'Exclude fields',
							required: false,
							defaultValue: ['']
						},
						{
							type: 'select',
							key: 'hash_method',
							label: 'Hash Method',
							required: false,
							defaultValue: 'SHA-1@2.16.0',
							options: ['MD5@2.16.0', 'SHA-1@2.16.0', 'SHA-256@2.16.0', 'SHA3-256@2.16.0'],
							value: 'SHA-256@2.16.0'
						},
						{
							type: 'string',
							key: 'target_field',
							label: 'Target Field',
							required: false,
							defaultValue: 'fingerprint',
							value: 'session_id'
						},
						{
							type: 'boolean',
							key: 'ignore_missing',
							label: 'Ignore Missing',
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 736 },
				selected: false,
				dragging: false
			},
			{
				id: '40711aab-36e8-4b03-af23-dd6b1dd31031',
				type: 'nodeProcessorDate',
				position: { x: -2293.6369549349997, y: 626.0556604519899 },
				data: {
					type: 'nodeProcessorDate',
					groupKey: 'parsing-and-extraction',
					key: 'date',
					label: 'Date',
					description: 'Parse dates from fields',
					fields: [
						{
							type: 'string',
							key: 'field',
							label: 'Field',
							required: true,
							defaultValue: '',
							value: 'event.timestamp'
						},
						{
							type: 'array',
							key: 'formats',
							label: 'Formats',
							required: true,
							defaultValue: [],
							helperText: {
								text: 'Learn more about supported date formats.',
								link: 'https://docs.opensearch.org/latest/mappings/supported-field-types/date'
							},
							value: ['ISO8601']
						},
						{
							type: 'string',
							key: 'target_field',
							label: 'Target Field',
							required: false,
							defaultValue: '',
							value: '@timestamp'
						},
						{
							type: 'string',
							key: 'timezone',
							label: 'Timezone',
							required: false,
							defaultValue: ''
						},
						{ type: 'string', key: 'locale', label: 'Locale', required: false, defaultValue: '' },
						{
							type: 'string',
							key: 'output_format',
							label: 'Output Format',
							required: false,
							defaultValue: '',
							helperText: {
								text: 'Learn more about supported date formats.',
								link: 'https://docs.opensearch.org/latest/mappings/supported-field-types/date'
							}
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 841 },
				selected: false,
				dragging: false
			},
			{
				id: 'c6f29683-7513-4c4d-b75f-df60f8f857e6',
				type: 'nodeProcessorConvert',
				position: { x: -1619.6652777487177, y: 21.456366192444307 },
				data: {
					type: 'nodeProcessorConvert',
					groupKey: 'data-transformation',
					key: 'convert',
					label: 'Convert',
					description: 'Convert field to a different type',
					fields: [
						{
							type: 'string',
							key: 'field',
							label: 'Field',
							required: true,
							defaultValue: '',
							value: 'event.amount'
						},
						{
							type: 'select',
							key: 'type',
							label: 'Type',
							required: true,
							defaultValue: 'string',
							options: ['integer', 'long', 'float', 'double', 'string', 'boolean', 'auto'],
							value: 'float'
						},
						{
							type: 'string',
							key: 'target_field',
							label: 'Target Field',
							required: false,
							defaultValue: ''
						},
						{
							type: 'boolean',
							key: 'ignore_missing',
							label: 'Ignore Missing',
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 580 },
				selected: false,
				dragging: false
			},
			{
				id: '0e7878cd-838e-4bf5-8fd1-64cd3103f939',
				type: 'nodeProcessorScript',
				position: { x: -1616.231362707074, y: 619.0133884761826 },
				data: {
					type: 'nodeProcessorScript',
					groupKey: 'advanced',
					key: 'script',
					label: 'Script',
					description: 'Execute a script to transform the document',
					fields: [
						{
							type: 'string',
							key: 'source',
							label: 'Source',
							required: false,
							defaultValue: '',
							value:
								"if (ctx.event.currency == 'EUR') { ctx.event.amount_usd = ctx.event.amount * 1.1; } else if (ctx.event.currency == 'GBP') { ctx.event.amount_usd = ctx.event.amount * 1.27; } else { ctx.event.amount_usd = ctx.event.amount; }"
						},
						{
							type: 'string',
							key: 'lang',
							label: 'Language',
							required: false,
							defaultValue: 'painless',
							value: 'painless'
						},
						{
							type: 'object',
							key: 'params',
							label: 'Parameters',
							required: false,
							defaultValue: {}
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 525 },
				selected: false,
				dragging: false
			},
			{
				id: 'b975ac4e-af80-4083-8bf5-a3cf623d3506',
				type: 'nodeProcessorRemove',
				position: { x: -1256.614723718085, y: 593.0042484136674 },
				data: {
					type: 'nodeProcessorRemove',
					groupKey: 'filtering-and-cleanup',
					key: 'remove',
					label: 'Remove',
					description: 'Remove fields from documents',
					fields: [
						{
							type: 'array',
							key: 'field',
							label: 'Field',
							required: true,
							defaultValue: [],
							value: ['event_data']
						},
						{
							type: 'boolean',
							key: 'ignore_missing',
							label: 'Ignore Missing',
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
						{
							type: 'node',
							key: 'on_failure',
							label: 'On Failure',
							required: false,
							defaultValue: ''
						}
					]
				},
				origin: [0.5, 0],
				measured: { width: 300, height: 452 },
				selected: true,
				dragging: false
			}
		],
		processors: [
			{ json: { field: 'event_data', target_field: 'event' } },
			{
				fingerprint: {
					fields: ['event.user_id', 'event.session_start'],
					hash_method: 'SHA-256@2.16.0',
					target_field: 'session_id'
				}
			},
			{ date: { field: 'event.timestamp', formats: ['ISO8601'], target_field: '@timestamp' } },
			{ convert: { field: 'event.amount', type: 'float' } },
			{
				script: {
					source:
						"if (ctx.event.currency == 'EUR') { ctx.event.amount_usd = ctx.event.amount * 1.1; } else if (ctx.event.currency == 'GBP') { ctx.event.amount_usd = ctx.event.amount * 1.27; } else { ctx.event.amount_usd = ctx.event.amount; }",
					lang: 'painless'
				}
			},
			{ remove: { field: ['event_data'] } }
		]
	};

export const PIPELINES_TEMPLATE: IPipelineTemplate[] = [
	{
		key: 'blank',
		name: 'Blank Pipeline',
		pipeline: BLANK_PIPELINE
	},
	{
		key: 'csv-data-parser',
		name: 'CSV Data Parser',
		pipeline: CSV_DATA_PARSER_PIPELINE
	},
	{
		key: 'security-firewall-logs',
		name: 'Security Logs Pipeline',
		pipeline: SECURITY_FIREWALL_LOGS_PIPELINE
	},
	{
		key: 'ecommerce-event-tracking',
		name: 'E-commerce/Event Tracking',
		pipeline: ECOMMERCE_EVENT_TRACKING_PIPELINE
	}
];
