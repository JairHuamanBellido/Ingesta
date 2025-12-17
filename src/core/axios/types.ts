export interface APIResult<T=undefined> {
	isSuccess: boolean;
	data: T;
	error?: string;
	message?: string;
    statusCode: number
}
