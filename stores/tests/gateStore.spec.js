import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGatesStore } from '@/stores/gates';
import { useTasksStore } from '../tasks'; // Adjust path as necessary
import { useProjectsStore } from '../projects'; // Adjust path as necessary


//spesifisere hva som skal hentes fra mock stores, altså metoder, variabler osv..
const mockTasksStore = {
  maxTaskDuration: vi.fn(),
  getGateTasks: vi.fn(),
  tasks: [],
};
const mockProjectsStore = {
  getSFDate: vi.fn(),
};

//setter opp mock stores for andre stores enn den som testes
vi.mock('@/stores/tasks', () => ({
  useTasksStore: () => mockTasksStore,
}));
vi.mock('@/stores/projects', () => ({
  useProjectsStore: () => mockProjectsStore,
}));

//Setter opp Pinia og resetter mocks før/etter hver test.
beforeEach(() => {
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});


describe('useGatesStore', () => {

    //eksempeltest 1
  it('should add a gate', async () => {
    const gatesStore = useGatesStore();

    const mockFetch = vi.fn().mockResolvedValue([]);
    global.$fetch = mockFetch;

    await gatesStore.addGate(1, 'project1', 'Gate Title');

    expect(mockFetch).toHaveBeenCalledWith('/gates', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectID: 'project1',
        gateNR: 1,
        title: 'Gate Title'
      })
    });
  });

  //eksempeltest 2
  it('should fetch gates', async () => {
    const gatesStore = useGatesStore();

    const mockResponse = [
      { ID: '1', prosjektID: '1', gateNR: 1, gateTitle: 'Gate 1', progress: 50 },
    ];

    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    global.$fetch = mockFetch;

    await gatesStore.fetchGates('1');

    expect(gatesStore.gates).toEqual([
      {
        ID: '1',
        projectID: '1',
        gateNR: 1,
        title: 'Gate 1',
        plannedDate: '1000-07-07',
        completionDate: '1000-07-07',
        progress: 50,
      },
    ]);
  });

  it('should substract days', async () => {
    const gatesStore = useGatesStore();

    let response = gatesStore.substractDays("2000-01-11", 10)
    expect(response).toBe("2000-01-01")

    response = gatesStore.substractDays("1900-03-28", 10)
    expect(response).toBe("1900-03-18")

    response = gatesStore.substractDays("2024-03-10", 10)
    expect(response).toBe("2024-02-29")
  })
});
