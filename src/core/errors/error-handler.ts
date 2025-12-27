import type { APIResult } from '$core/axios/types';
import type { OpenSearchErrorResponse } from '$infrastructure/opensearch/types';
import type { ErrorStrategy } from './error-strategy';
import { AggregateErrorStrategy } from './strategies/AggregateErrorStrategy';
import { BadRequestErrorStrategy } from './strategies/BadRequestErrorStrategy';
import { UnknownErrorStrategy } from './strategies/UnkownErrorStrategy';

export class ErrorHandlerService {
	private strategies: ErrorStrategy[] = [];

	constructor() {
		this.strategies.push(new AggregateErrorStrategy());
		this.strategies.push(new BadRequestErrorStrategy());
		this.strategies.push(new UnknownErrorStrategy());
	}

	handleError(error: unknown): APIResult<OpenSearchErrorResponse> {
		const strategy = this.strategies.find((strategy) => strategy.canHanddle(error));
		if (!strategy) {
			return new UnknownErrorStrategy().handle(error);
		}

		const result = strategy.handle(error);
		return result;
	}
}
