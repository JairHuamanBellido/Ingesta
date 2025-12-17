import { ValidationChain } from '../core/ValidationChain';
import type { ValidationRule } from '../core/ValidationRule';
import { IsNotStartNodeRule } from './IsNotStartNodeRule';

export interface DeletionValidationConfig {
	allowStartNodeDeletion: boolean;
}

export function createDeletionValidationChain(config: DeletionValidationConfig): ValidationChain {
	const { allowStartNodeDeletion = false } = config;

	const rules: ValidationRule[] = [];

	if (!allowStartNodeDeletion) {
		rules.push(new IsNotStartNodeRule());
	}

	return ValidationChain.fromRules(rules);
}
