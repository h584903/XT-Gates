import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '@/stores/tasks';
import { useGatesStore } from '@/stores/gates';
import { useProjectsStore } from '@/stores/projects';
import { useAuthStore } from '@/stores/auth'; 

// Define mock stores
const mockGatesStore = {
  getProjectID: vi.fn(),
  getGateNR: vi.fn(),
  getSFG: vi.fn(),
  updateGateProgress: vi.fn(),
  gates: [],
};

const mockProjectsStore = {
  calculateFloat: vi.fn(),
  updateOnTime: vi.fn(),
  projects: [],
};

const mockAuthStore = {
  getUsername: vi.fn(),
};

// Mock the dependencies
vi.mock('@/stores/gates', () => ({
  useGatesStore: () => mockGatesStore,
}));

vi.mock('@/stores/projects', () => ({
  useProjectsStore: () => mockProjectsStore,
}));

vi.mock('@/stores/auth', () => ({
  useAuthStore: () => mockAuthStore,
}));

// Set up Pinia and reset mocks before/after each test
beforeEach(() => {
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useTasksStore', () => {
  it('should add a task', async () => {
    const tasksStore = useTasksStore();

    const mockFetch = vi.fn().mockResolvedValue([]);
    global.$fetch = mockFetch;

    mockGatesStore.getProjectID.mockReturnValue(1);

    await tasksStore.addTask(1, 1, 'Test Task', 'John Doe', 5);

    expect(mockFetch).toHaveBeenCalledWith('/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        projectID: 1,
        gateID: 1,
        step: 1,
        title: 'Test Task',
        responsiblePerson: 'John Doe',
        duration: 5,
        completeDate: null,
      }),
    });
  });

  it('should fetch tasks', async () => {
    const tasksStore = useTasksStore();

    const mockResponse = [
      { ID: '1', prosjektID: '1', gateID: '1', step: 1, title: 'Task 1', responsiblePerson: 'John Doe', duration: 5, progress: 50 },
    ];

    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    global.$fetch = mockFetch;

    await tasksStore.fetchTasks('1');

    expect(tasksStore.tasks).toEqual([
      {
        ID: '1',
        prosjektID: '1',
        gateID: '1',
        step: 1,
        title: 'Task 1',
        responsiblePerson: 'John Doe',
        duration: 5,
        progress: 50,
        onTime: undefined,
        comment: undefined, 
        completeDate: undefined,
        updateUser: undefined,
      },
    ]);
  });

  it('should update task progress', async () => {
    const tasksStore = useTasksStore();
    tasksStore.setTasks([{ ID: '1', progress: 0, gateID: '1' }]);

    const mockFetch = vi.fn().mockResolvedValue([]);
    global.fetch = mockFetch;

    await tasksStore.updateTaskProgress('1', 50);

    expect(tasksStore.tasks[0].progress).toBe(50);
    expect(mockFetch).toHaveBeenCalledWith('/tasks/progress/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskID: '1',
        newProgress: 50,
      }),
    });
  });

  it('should update task duration', async () => {
    const tasksStore = useTasksStore();
    tasksStore.setTasks([{ ID: '1', duration: 5, gateID: '1' }]);

    const mockFetch = vi.fn().mockResolvedValue([]);
    global.fetch = mockFetch;

    await tasksStore.updateTaskDuration('1', 10);

    expect(tasksStore.tasks[0].duration).toBe(10);
    expect(mockFetch).toHaveBeenCalledWith('/tasks/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskID: '1',
        newDuration: 10,
      }),
    });
  });

  it('should update task responsible person', async () => {
    const tasksStore = useTasksStore();
    tasksStore.setTasks([{ ID: '1', responsiblePerson: 'John Doe' }]);

    const mockFetch = vi.fn().mockResolvedValue([]);
    global.fetch = mockFetch;

    await tasksStore.updateTaskResponsiblePerson('1', 'Jane Smith');

    expect(tasksStore.tasks[0].responsiblePerson).toBe('Jane Smith');
    expect(mockFetch).toHaveBeenCalledWith('/tasks/responsiblePerson/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskID: '1',
        newResponsiblePerson: 'Jane Smith',
      }),
    });
  });
});
