import { IndexSubsystem } from './subsystem/index.subsystem';
import { IngestPipelineSubsystem } from './subsystem/ingest-pipleine.subsystem';
import { MachineLearningSubsystem } from './subsystem/machine-learning.subsystem';

/**
 * Design Pattern: Facade
 *
 */
export class OpenSearchController {
	public machine_learning: MachineLearningSubsystem;
	public ingest_pipeline: IngestPipelineSubsystem;
	public index: IndexSubsystem;
	constructor() {
		this.machine_learning = new MachineLearningSubsystem();
		this.ingest_pipeline = new IngestPipelineSubsystem();
		this.index = new IndexSubsystem();
	}
}
