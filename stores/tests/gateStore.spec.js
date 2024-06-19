import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useGatesStore } from '@/stores/gates';
import { useTasksStore } from '../tasks';
import { useProjectsStore } from '../projects';

const mockTasksStore = {
    maxTaskDuration: vi.fn(),
    getGateTasks: vi.fn(),
    tasks: [],
  };
  
  const mockProjectsStore = {
    getSFDate: vi.fn(),
  };
  
  vi.mock('@/stores/dependencies', () => ({
    useTasksStore: () => mockTasksStore,
    useProjectsStore: () => mockProjectsStore,
  }));
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  describe('useGatesStore', () => {
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
        { ID: '1', prosjektID: 'project1', gateNR: 1, gateTitle: 'Gate 1', progress: 50 },
      ];
  
      const mockFetch = vi.fn().mockResolvedValue(mockResponse);
      global.$fetch = mockFetch;
  
      await gatesStore.fetchGates('project1');
  
      expect(gatesStore.gates).toEqual([
        {
          ID: '1',
          projectID: 'project1',
          gateNR: 1,
          title: 'Gate 1',
          plannedDate: '1000-07-07',
          completionDate: '1000-07-07',
          progress: 50,
        },
      ]);
    });
  });