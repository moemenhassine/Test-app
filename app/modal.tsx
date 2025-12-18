/**
 * Modal Screen - Task Form
 * Modal for adding new tasks or editing existing tasks
 */

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { addTask, loadTasks, updateTask } from '@/storage/taskStorage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalScreen() {
  const params = useLocalSearchParams<{ taskId?: string; mode?: 'add' | 'edit' }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const borderColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const backgroundColor = useThemeColor({}, 'background');

  const isEditing = params.mode === 'edit' && params.taskId;

  // Load task data when editing
  useEffect(() => {
    if (isEditing && params.taskId) {
      loadTaskData(params.taskId);
    }
  }, [isEditing, params.taskId]);

  /**
   * Load task data for editing
   */
  const loadTaskData = async (taskId: string) => {
    try {
      const tasks = await loadTasks();
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
      }
    } catch (error) {
      console.error('Error loading task:', error);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      if (isEditing && params.taskId) {
        // Update existing task
        await updateTask(params.taskId, { title: title.trim(), description: description.trim() || undefined });
      } else {
        // Add new task
        await addTask(title.trim(), description.trim() || undefined);
      }
      // Close modal and go back
      router.back();
    } catch (error) {
      console.error('Error saving task:', error);
      setIsLoading(false);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    router.back();
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
              {isEditing ? 'Edit Task' : 'Add New Task'}
            </ThemedText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { borderColor, color: textColor, backgroundColor }]}
              placeholder="Task title (required)"
              placeholderTextColor={iconColor}
              value={title}
              onChangeText={setTitle}
              autoFocus
            />

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                { borderColor, color: textColor, backgroundColor },
              ]}
              placeholder="Description (optional)"
              placeholderTextColor={iconColor}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { borderColor }]}
                onPress={handleCancel}
                disabled={isLoading}>
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.submitButton,
                  { backgroundColor: tintColor },
                  !title.trim() && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={!title.trim() || isLoading}>
                <ThemedText style={styles.submitButtonText}>
                  {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Add Task'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    marginBottom: 4,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 44,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 'auto',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  submitButton: {
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
