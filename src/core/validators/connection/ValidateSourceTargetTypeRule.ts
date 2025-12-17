import { ValidationRule } from '../core/ValidationRule';
import type { ValidationContext, ValidationResult } from '../types';

export class ValidateSourceTargetTypeRule extends ValidationRule {
	constructor() {
		super('validSourceTargetTypeRule');
	}

	validate(context: ValidationContext): ValidationResult {
		const { connection } = context;

		if (!connection) {
			return this.fail('No connection found');
		}

		if (
			connection.sourceHandle === 'node-start-source-handle' &&
			connection.targetHandle === `node-processor-${connection.target}-target-handle`
		) {
			return this.success('Start Node only accepts connections to processors nodes');
		}

		if (
			connection.sourceHandle === `node-processor-${connection.source}-conditional-source` &&
			connection.targetHandle === 'node-conditional-target-handle'
		) {
			return this.success('Processor Node only accepts connections from conditional node');
		}
		return this.fail('Invalid connection type');
	}
}
