import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '../tasks';
import { useProjectsStore } from '../projects';
import { useAuthStore } from '../auth';

// Define mock stores
const mockTasksStore = {
  maxTaskDuration: vi.fn(),
  getGateTasks: vi.fn(),
  tasks: [],
};

const mockProjectsStore = {
  getSFDate: vi.fn(),
};

// Mock the dependencies
vi.mock('@/stores/tasks', () => ({
  useTasksStore: () => mockTasksStore,
}));
vi.mock('@/stores/projects', () => ({
  useProjectsStore: () => mockProjectsStore,
}));

// Set up Pinia and reset mocks before/after each test
beforeEach(() => {
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useGatesStore', () => {
  // Example gates to be used in the tests
  const exampleGates = [
    { ID: '1', projectID: '1', gateNR: 1, title: 'Gate 1', plannedDate: '2024-01-01', completionDate: '2024-01-10', progress: 50 },
    { ID: '2', projectID: '1', gateNR: 2, title: 'Gate 2', plannedDate: '2024-02-01', completionDate: '2024-02-10', progress: 75 },
    { ID: '3', projectID: '2', gateNR: 1, title: 'Gate 1', plannedDate: '2024-03-01', completionDate: '2024-03-10', progress: 100 },
  ];

  // Set the example gates in the store before each test
  beforeEach(() => {
    const gatesStore = useGatesStore();
    gatesStore.setGates(exampleGates);
  });

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

  it('should subtract days correctly for five different cases', () => {
    const gatesStore = useGatesStore();

    // Case 1: Simple subtraction
    let result = gatesStore.substractDays("2000-01-11", 10);
    expect(result).toBe("2000-01-01"); // Correct date after subtracting 10 days from 2000-01-11

    // Case 2: Subtracting days crossing a year boundary
    result = gatesStore.substractDays("2000-01-01", 1);
    expect(result).toBe("1999-12-31"); // Correct date after subtracting 1 day from 2000-01-01

    // Case 3: Subtracting days crossing a month boundary
    result = gatesStore.substractDays("2000-03-01", 1);
    expect(result).toBe("2000-02-29"); // Correct date after subtracting 1 day from 2000-03-01 (leap year)

    // Case 4: Subtracting a large number of days
    result = gatesStore.substractDays("2000-01-01", 365);
    expect(result).toBe("1999-01-01"); // Correct date after subtracting 365 days from 2000-01-01

    // Case 5: Subtracting days from a leap day
    result = gatesStore.substractDays("2000-02-29", 1);
    expect(result).toBe("2000-02-28"); // Correct date after subtracting 1 day from 2000-02-29
  });

  it('Should retrieve attributes correctly', () => {
    const gatesStore = useGatesStore();

    // Case 1: Retrieve planned date for gate with ID 1
    let result = gatesStore.getPlannedDate('1')
    expect(result).toBe("2024-01-01");

    // Case 2: Retrieve planned date for gate with ID 2
    result = gatesStore.getPlannedDate('2')
    expect(result).toBe("2024-02-01");

    // Case 3: Retrieve planned date for gate with ID 3
    result = gatesStore.getPlannedDate('3')
    expect(result).toBe("2024-03-01");

    // Case 4: Retrieve gateNR for gate with ID 1
    result = gatesStore.getGateNR(1)
    expect(result).toBe(1);

    // Case 5: Retrieve gateNR for gate with ID 2
    result = gatesStore.getGateNR(2)
    expect(result).toBe(2);

    // Case 6: Retrieve gateNR for gate with ID 3
    result = gatesStore.getGateNR(3)
    expect(result).toBe(1);

    // Case 7: Retrieve gateNR for gate with ID -1
    result = gatesStore.getGateNR(-1)
    expect(result).toBe(null);

    // Case 8: Retrieve planned date for gate with ID -1
    result = gatesStore.getPlannedDate('-1')
    expect(result).toBe(null);
  })
});
