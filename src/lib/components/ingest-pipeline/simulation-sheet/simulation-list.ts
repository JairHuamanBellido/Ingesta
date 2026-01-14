export const DEFAULT_SIMULATION_INPUT_PAYLOAD = JSON.stringify(
	{
		docs: [
			{
				_source: {
					_index: 'testindex',
					_id: '1'
				}
			}
		]
	},
	null,
	2
);
