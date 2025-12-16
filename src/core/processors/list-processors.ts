const commonParamters = [
	{
		type: 'string',
		key: 'description',
		label: 'Description',
		required: false,
		defaultValue: ''
	},

	{
		type: 'string',
		key: 'on_failure',
		label: 'On Failure',
		required: false,
		defaultValue: ''
	},
	{
		type: 'string',
		key: 'tag',
		label: 'Tag',
		required: false,
		defaultValue: ''
	},
	{
		type: 'boolean',
		key: 'ignore_failure',
		label: 'Ignore Failure',
		required: false,
		defaultValue: false
	},
	{
		type: 'node',
		key: 'if',
		label: 'Condition',
		required: false,
		defaultValue: ''
	}
];

// Data Enrichment
export const APPEND_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'value',
			label: 'Value',
			required: true,
			defaultValue: ''
		},

		{
			type: 'boolean',
			key: 'allow_duplicates',
			label: 'Allow Duplicates',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const SET_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'value',
			label: 'Value',
			required: true,
			defaultValue: ''
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
		...commonParamters
	]
};

export const COPY_PROCESSOR = {
	type: 'nodeProcessorCopy',
	groupKey: 'data-enrichment',
	key: 'copy',
	label: 'Copy',
	description: 'Copy field values',
	fields: [
		{
			type: 'string',
			key: 'source_field',
			label: 'Source Field',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'target_field',
			label: 'Target Field',
			required: true,
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
			type: 'boolean',
			key: 'override_target',
			label: 'Override Target',
			required: false,
			defaultValue: false
		},
		{
			type: 'boolean',
			key: 'remove_source',
			label: 'Remove Source',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const RENAME_PROCESSOR = {
	type: 'nodeProcessorRename',
	groupKey: 'data-enrichment',
	key: 'rename',
	label: 'Rename',
	description: 'Rename fields',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'target_field',
			label: 'Target Field',
			required: true,
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
			type: 'boolean',
			key: 'override_target',
			label: 'Override Target',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

// Data Transformation
export const CONVERT_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'select',
			key: 'type',
			label: 'Type',
			required: true,
			defaultValue: 'string',
			options: ['integer', 'long', 'float', 'double', 'string', 'boolean', 'auto']
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
		...commonParamters
	]
};

export const GSUB_PROCESSOR = {
	type: 'nodeProcessorGsub',
	groupKey: 'data-transformation',
	key: 'gsub',
	label: 'Gsub',
	description: 'Replace substring matches with replacements',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'pattern',
			label: 'Pattern',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'replacement',
			label: 'Replacement',
			required: true,
			defaultValue: ''
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
		...commonParamters
	]
};

export const LOWERCASE_PROCESSOR = {
	type: 'nodeProcessorLowercase',
	groupKey: 'data-transformation',
	key: 'lowercase',
	label: 'Lowercase',
	description: 'Convert field value to lowercase',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
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
		...commonParamters
	]
};

export const UPPERCASE_PROCESSOR = {
	type: 'nodeProcessorUppercase',
	groupKey: 'data-transformation',
	key: 'uppercase',
	label: 'Uppercase',
	description: 'Converts text to uppercase',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field Name',
			required: true,
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
			key: 'target_field',
			label: 'Target Field',
			required: false,
			defaultValue: ''
		},
		...commonParamters
	]
};

export const SPLIT_PROCESSOR = {
	type: 'nodeProcessorSplit',
	groupKey: 'data-transformation',
	key: 'split',
	label: 'Split',
	description: 'Split a field into an array',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'separator',
			label: 'Separator',
			required: true,
			defaultValue: ''
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
			type: 'boolean',
			key: 'preserve_trailing',
			label: 'Preserve Trailing',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const TRIM_PROCESSOR = {
	type: 'nodeProcessorTrim',
	groupKey: 'data-transformation',
	key: 'trim',
	label: 'Trim',
	description: 'Remove leading and trailing whitespace',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
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
		...commonParamters
	]
};

// Data parsing & Extraction
export const GROK_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'array',
			key: 'patterns',
			label: 'Patterns',
			required: true,
			defaultValue: []
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
			key: 'ignore_missing',
			label: 'Ignore Missing',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const JSON_PROCESSOR = {
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
			defaultValue: ''
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
		...commonParamters
	]
};

export const CSV_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'array',
			key: 'target_fields',
			label: 'Target Fields',
			required: true,
			defaultValue: []
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
			key: 'quote',
			label: 'Quote',
			required: false,
			defaultValue: '"'
		},
		{
			type: 'boolean',
			key: 'trim',
			label: 'Trim',
			required: false,
			defaultValue: false
		},
		{
			type: 'boolean',
			key: 'empty_value',
			label: 'Empty Value',
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
		...commonParamters
	]
};

export const DATE_PROCESSOR = {
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
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'target_field',
			label: 'Target Field',
			required: false,
			defaultValue: '@timestamp'
		},
		{
			type: 'array',
			key: 'formats',
			label: 'Formats',
			required: true,
			defaultValue: []
		},
		{
			type: 'string',
			key: 'timezone',
			label: 'Timezone',
			required: false,
			defaultValue: 'UTC'
		},
		{
			type: 'string',
			key: 'locale',
			label: 'Locale',
			required: false,
			defaultValue: 'ENGLISH'
		},
		{
			type: 'string',
			key: 'output_format',
			label: 'Output Format',
			required: false,
			defaultValue: ''
		},
		...commonParamters
	]
};

export const USER_AGENT_PROCESSOR = {
	type: 'nodeProcessorUserAgent',
	groupKey: 'parsing-and-extraction',
	key: 'user_agent',
	label: 'User Agent',
	description: 'Parse user agent strings',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
		},
		{
			type: 'string',
			key: 'target_field',
			label: 'Target Field',
			required: false,
			defaultValue: 'user_agent'
		},
		{
			type: 'string',
			key: 'regex_file',
			label: 'Regex File',
			required: false,
			defaultValue: ''
		},
		{
			type: 'array',
			key: 'properties',
			label: 'Properties',
			required: false,
			defaultValue: []
		},
		{
			type: 'boolean',
			key: 'ignore_missing',
			label: 'Ignore Missing',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

// Filtering & Cleanup
export const DROP_PROCESSOR = {
	type: 'nodeProcessorDrop',
	groupKey: 'filtering-and-cleanup',
	key: 'drop',
	label: 'Drop',
	description: 'Drop a document without indexing',
	fields: [...commonParamters]
};

export const REMOVE_PROCESSOR = {
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
			defaultValue: []
		},
		{
			type: 'boolean',
			key: 'ignore_missing',
			label: 'Ignore Missing',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const FAIL_PROCESSOR = {
	type: 'nodeProcessorFail',
	groupKey: 'filtering-and-cleanup',
	key: 'fail',
	label: 'Fail',
	description: 'Raise an exception and fail the pipeline',
	fields: [
		{
			type: 'string',
			key: 'message',
			label: 'Message',
			required: true,
			defaultValue: ''
		},
		...commonParamters
	]
};

// Advanced

export const FINGERPRINT_PROCESSOR = {
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
			defaultValue: []
		},
		{
			type: 'string',
			key: 'target_field',
			label: 'Target Field',
			required: false,
			defaultValue: 'fingerprint'
		},
		{
			type: 'string',
			key: 'salt',
			label: 'Salt',
			required: false,
			defaultValue: ''
		},
		{
			type: 'select',
			key: 'method',
			label: 'Method',
			required: false,
			defaultValue: 'SHA-1',
			options: ['MD5', 'SHA-1', 'SHA-256', 'SHA-512', 'MurmurHash3']
		},
		{
			type: 'boolean',
			key: 'ignore_missing',
			label: 'Ignore Missing',
			required: false,
			defaultValue: false
		},
		...commonParamters
	]
};

export const BYTES_PROCESSOR = {
	type: 'nodeProcessorBytes',
	groupKey: 'advanced',
	key: 'bytes',
	label: 'Bytes',
	description: 'Convert human-readable byte values to bytes',
	fields: [
		{
			type: 'string',
			key: 'field',
			label: 'Field',
			required: true,
			defaultValue: ''
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
		...commonParamters
	]
};

export const CONDITIONAL_PROCESSOR = {
	type: 'nodeConditional',
	groupKey: 'advanced',
	key: 'conditional',
	label: 'Conditional',
	description: 'Conditional Group'
};

export const PROCESSORS_BY_CATEGORY = [
	{
		key: 'data-enrichment',
		label: 'Data Enrichment',
		color: 'var(--data-enrichment)',
		processors: [APPEND_PROCESSOR, SET_PROCESSOR, COPY_PROCESSOR, RENAME_PROCESSOR]
	},
	{
		key: 'data-transformation',
		label: 'Data Transformation',
		color: 'var(--data-transformation)',
		processors: [
			CONVERT_PROCESSOR,
			GSUB_PROCESSOR,
			LOWERCASE_PROCESSOR,
			UPPERCASE_PROCESSOR,
			SPLIT_PROCESSOR,
			TRIM_PROCESSOR
		]
	},
	{
		key: 'parsing-and-extraction',
		label: 'Parsing & Extraction',
		color: 'var(--parsing-and-extraction)',
		processors: [
			GROK_PROCESSOR,
			JSON_PROCESSOR,
			CSV_PROCESSOR,
			DATE_PROCESSOR,
			USER_AGENT_PROCESSOR
		]
	},
	{
		key: 'filtering-and-cleanup',
		label: 'Filtering & Cleanup',
		color: 'var(--filtering-and-cleanup)',
		processors: [DROP_PROCESSOR, REMOVE_PROCESSOR, FAIL_PROCESSOR]
	},
	{
		key: 'advanced',
		label: 'Advanced',
		color: 'var(--advanced)',
		processors: [FINGERPRINT_PROCESSOR, BYTES_PROCESSOR]
	},
	{
		key: 'conditional',
		label: 'Conditional',
		color: 'var(--conditional)',
		processors: [CONDITIONAL_PROCESSOR]
	}
];

export const PROCESSORS = [
	APPEND_PROCESSOR,
	SET_PROCESSOR,
	COPY_PROCESSOR,
	RENAME_PROCESSOR,
	CONVERT_PROCESSOR,
	GSUB_PROCESSOR,
	LOWERCASE_PROCESSOR,
	UPPERCASE_PROCESSOR,
	SPLIT_PROCESSOR,
	TRIM_PROCESSOR,
	GROK_PROCESSOR,
	JSON_PROCESSOR,
	CSV_PROCESSOR,
	DATE_PROCESSOR,
	USER_AGENT_PROCESSOR,
	DROP_PROCESSOR,
	REMOVE_PROCESSOR,
	FAIL_PROCESSOR,
	FINGERPRINT_PROCESSOR,
	BYTES_PROCESSOR,
	CONDITIONAL_PROCESSOR
];
