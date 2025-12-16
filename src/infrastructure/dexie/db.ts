import { Dexie, type Table } from 'dexie';
import type { IPipeline } from '$infrastructure/model/pipeline.model';

const db = new Dexie('pipeline') as Dexie & {
	pipelines: Table<IPipeline, string>;
};

db.version(1).stores({
	pipelines: '++key, name, description'
});

export { db };
