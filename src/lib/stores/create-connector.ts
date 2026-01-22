import { ML_CONNECTOR_STEPPER_LIST } from '@/components/machine-learning/ml-connectors/stepper-list';
import { writable } from 'svelte/store';
interface Step {
	name: string;
	icon: string;
	isDone: boolean;
}
interface CreateConnectorStore {
	steps: Step[];
	currentStep: number;
	provider: string;
	model: string;
	apiKey: string;
	connectorPayload: string;
	configuration: Record<string, string>;
	connector_id: string;
	model_id: string;
}

const stepsInitial = ML_CONNECTOR_STEPPER_LIST.map((step) => ({
	name: step.name,
	icon: step.icon,
	isDone: false
}));

const initialState: CreateConnectorStore = {
	steps: stepsInitial,
	currentStep: 0,
	apiKey: '',
	model: '',
	provider: '',
	connectorPayload: '',
	configuration: {},
	connector_id: '',
	model_id: ''
};

const { set, update, subscribe } = writable<CreateConnectorStore>(structuredClone(initialState));

export const createConnectorStore = {
	subscribe,
	set,
	update,
	clear: () => {
		update(() => {
			return structuredClone(initialState);
		});
	}
};
