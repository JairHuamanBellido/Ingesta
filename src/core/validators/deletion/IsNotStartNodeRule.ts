import { ValidationRule } from '../core/ValidationRule';
import type { ValidationContext, ValidationResult } from '../types';

export class IsNotStartNodeRule extends ValidationRule {
	constructor() {
		super('isNotStartNode');
	}

	validate(context: ValidationContext): ValidationResult {
		const { node } = context;

		if (!node) {
			return this.success();
		}

		if (node.id === 'nodestart') {
			return this.fail('Cannot delete the start node of the pipeline');
		}

		return this.proceed(context);
	}
}
