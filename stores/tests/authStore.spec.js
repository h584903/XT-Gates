import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth'; // Adjust path as necessary

// Set up Pinia before each test
beforeEach(() => {
  setActivePinia(createPinia());
});

describe('useAuthStore', () => {
  it('should get the updated username', () => {
    const authStore = useAuthStore();
    authStore.setUsername('John Doe');
    const username = authStore.getUsername();
    expect(username).toBe('John Doe');
  });

});
