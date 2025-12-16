import type { ValidationContext, ValidationResult, ValidationSeverity } from '../types';

export abstract class ValidationRule {
	protected nextRule: ValidationRule | null = null;

	constructor(public readonly name: string) {}

	setNext(rule: ValidationRule): ValidationRule {
		this.nextRule = rule;
		return rule;
	}

	abstract validate(context: ValidationContext): ValidationResult;

	protected proceed(context: ValidationContext): ValidationResult {
		return this.nextRule ? this.nextRule.validate(context) : this.success();
	}

	protected success(message?: string): ValidationResult {
		return {
			success: true,
			message,
			ruleName: this.name
		};
	}

	protected fail(
		message: string,
		severity: ValidationSeverity = 'error',
		metadata: Record<string, any> = {}
	): ValidationResult {
		return {
			success: false,
			message,
			severity,
			ruleName: this.name,
			metadata
		};
	}
}
