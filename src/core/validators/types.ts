import type { Node, Edge, Connection } from '@xyflow/svelte';

export type ValidationSeverity = 'info' | 'warning' | 'error';

export interface ValidationResult {
	success: boolean;
	message?: string;
	severity?: ValidationSeverity;
	ruleName?: string;
}

export interface ValidationContext {
	node?: Node;
	edges?: Edge[];
	nodes?: Node[];
	connection?: Connection;
}

export interface DeletionContext extends ValidationContext {}
