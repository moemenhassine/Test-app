/**
 * Task Storage Utility
 * Handles all AsyncStorage operations for tasks persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for tasks
const TASKS_STORAGE_KEY = '@todo_tasks';

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

/**
 * Load all tasks from AsyncStorage
 * @returns Promise<Task[]> - Array of tasks
 */
export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      return JSON.parse(tasksJson);
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

/**
 * Save all tasks to AsyncStorage
 * @param tasks - Array of tasks to save
 */
export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

/**
 * Add a new task
 * @param title - Task title (required)
 * @param description - Task description (optional)
 * @returns Promise<Task> - The newly created task
 */
export const addTask = async (title: string, description?: string): Promise<Task> => {
  const tasks = await loadTasks();
  const newTask: Task = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    title,
    description,
    completed: false,
    createdAt: Date.now(),
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
};

/**
 * Update an existing task
 * @param taskId - ID of the task to update
 * @param updates - Partial task object with fields to update
 */
export const updateTask = async (
  taskId: string,
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>
): Promise<void> => {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    await saveTasks(tasks);
  }
};

/**
 * Delete a task
 * @param taskId - ID of the task to delete
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  const tasks = await loadTasks();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(filteredTasks);
};

/**
 * Toggle task completion status
 * @param taskId - ID of the task to toggle
 */
export const toggleTask = async (taskId: string): Promise<void> => {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    await saveTasks(tasks);
  }
};

