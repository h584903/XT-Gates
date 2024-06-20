import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProjectsStore } from '@/stores/projects';
import { useTasksStore } from '@/stores/tasks'; 
import { useGatesStore } from '@/stores/gates'; 

// Define mock stores
const mockTasksStore = {
  maxTaskDuration: vi.fn(),
  getGateTasks: vi.fn(),
  tasks: [],
};

const mockGatesStore = {
  getPlannedDate: vi.fn(),
  gates: [],
};

// Mock the dependencies
vi.mock('@/stores/tasks', () => ({
  useTasksStore: () => mockTasksStore,
}));

vi.mock('@/stores/gates', () => ({
  useGatesStore: () => mockGatesStore,
}));

// Set up Pinia and reset mocks before/after each test
beforeEach(() => {
  setActivePinia(createPinia());
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useProjectsStore', () => {
    it('Should add a project', async () => {
        const projectStore = useProjectsStore();
        
        const mockFetch = vi.fn().mockResolvedValue([]);
        global.$fetch = mockFetch;

        await projectStore.addProject(1, "Test add project", 0, "2000-10-10", "2000-11-11", "...", "Petter Testdal", "");

        // Check that the fetch was called at least once with the correct parameters
        expect(mockFetch).toHaveBeenCalledWith('/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ID: 1,
                title: "Test add project", 
                progress: 0, 
                plannedDate: "2000-10-10", 
                PODate: "2000-11-11", 
                status: "...", 
                PEM: "Petter Testdal", 
                comment: ""
            })
        });
    });
});
