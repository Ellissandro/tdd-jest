class CheckLastEventStatus {
    constructor(private readonly loadLastEventRepository: LoadLastEventRepository) {
    }

    async perform(groupId: string): Promise<void>{
        await this.loadLastEventRepository.loadLastEvent(groupId);
    }
}

interface LoadLastEventRepository{
    loadLastEvent: (grouoId: string) => Promise<void>;
}

class LoadLastEventRepositoryMock implements LoadLastEventRepository{
    groupId?: string;
    async loadLastEvent(grouoId: string): Promise<void>{
        this.groupId = grouoId;
    }
}

describe('CheckLastEventStatus', () => {
    it('should get last event data', async () => {
        const loadLastEventRepository = new LoadLastEventRepositoryMock();
        const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository);

        await checkLastEventStatus.perform('any_group_id');

        expect(loadLastEventRepository.groupId).toBe('any_group_id');
    })
})