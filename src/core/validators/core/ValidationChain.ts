/**
 * Pattern Applied: Chain of Responsibility Pattern
 */

import type { ValidationContext, ValidationResult } from '../types';
import type { ValidationRule } from './ValidationRule';

export class ValidationChain {
	private firstRule: ValidationRule | null;

	constructor(firstRule: ValidationRule | null = null) {
		this.firstRule = firstRule;
	}

	setFirstRule(rule: ValidationRule): this {
		this.firstRule = rule;
		return this;
	}

	validate(context: ValidationContext): ValidationResult {
		if (!this.firstRule) {
			return {
				success: true,
				message: 'No validation rules found'
			};
		}

		return this.firstRule.validate(context);
	}

	static fromRules(rules: ValidationRule[]): ValidationChain {
		if (!rules || rules.length === 0) {
			return new ValidationChain();
		}

		const chain = new ValidationChain(rules[0]);
		for (let i = 0; i < rules.length; i++) {
			rules[i].setNext(rules[i + 1]);
		}
		return chain;
	}
}
