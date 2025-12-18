/**
 * HomeScreen - To-Do List App
 * Main screen displaying the task list with add, edit, delete, and search functionality
 */

import { TaskItem } from '@/components/TaskItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  Task,
  deleteTask,
  loadTasks,
  toggleTask,
} from '@/storage/taskStorage';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  const borderColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  // Load tasks from storage on mount
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Reload tasks when screen is focused (e.g., returning from modal)
  useFocusEffect(
    useCallback(() => {
      loadTasksFromStorage();
    }, [])
  );

  // Filter tasks based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load tasks from AsyncStorage
   */
  const loadTasksFromStorage = async () => {
    try {
      const loadedTasks = await loadTasks();
      setTasks(loadedTasks);
      setFilteredTasks(loadedTasks);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setIsLoading(false);
    }
  };

  /**
   * Open modal to add a new task
   */
  const handleAddTask = () => {
    router.push('/modal?mode=add');
  };

  /**
   * Handle deleting a task
   */
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  /**
   * Handle toggling task completion status
   */
  const handleToggleTask = async (taskId: string) => {
    try {
      await toggleTask(taskId);
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  /**
   * Open modal to edit a task
   */
  const handleEditTask = (task: Task) => {
    router.push(`/modal?mode=edit&taskId=${task.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            My To-Do List
          </ThemedText>
          {tasks.length > 0 && (
            <ThemedText style={styles.taskCount}>
              {tasks.filter((t) => !t.completed).length} active, {tasks.length} total
            </ThemedText>
          )}
        </View>

        {/* Add Task Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "#3B5998" }]}
            onPress={handleAddTask}>
            <ThemedText style={styles.addButtonText}>+ Add Task</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {tasks.length > 0 && (
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                { borderColor, color: textColor, backgroundColor },
              ]}
              placeholder="Search tasks..."
              placeholderTextColor={iconColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        {/* Tasks List */}
        <Animated.View style={[styles.tasksContainer, { opacity: fadeAnim }]}>
          {isLoading ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText>Loading tasks...</ThemedText>
            </ThemedView>
          ) : filteredTasks.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText type="subtitle" style={styles.emptyStateText}>
                {searchQuery
                  ? 'No tasks found matching your search'
                  : tasks.length === 0
                    ? 'No tasks yet. Add one above!'
                    : 'No tasks match your search'}
              </ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={filteredTasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item: task }) => (
                <TaskItem
                  task={task}
                  onToggle={handleToggleTask}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              )}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Animated.View>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    marginBottom: 4,
  },
  taskCount: {
    fontSize: 14,
    opacity: 0.7,
  },
  addButtonContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  addButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 44,
  },
  tasksContainer: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    textAlign: 'center',
    opacity: 0.6,
  },
});
