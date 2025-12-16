import { ValidationChain } from '../core/ValidationChain';
import type { ValidationRule } from '../core/ValidationRule';
import { ValidateSourceTargetTypeRule } from './ValidateSourceTargetTypeRule';

export function createConnectionValidationChain(): ValidationChain {
	const rules: ValidationRule[] = [];

	rules.push(new ValidateSourceTargetTypeRule());

	return ValidationChain.fromRules(rules);
}
