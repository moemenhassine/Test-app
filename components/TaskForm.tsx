/**
 * TaskForm Component
 * Form for adding new tasks or editing existing tasks
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Task } from '@/storage/taskStorage';

interface TaskFormProps {
  onSubmit: (title: string, description?: string) => void;
  onCancel?: () => void;
  initialTask?: Task | null;
  isEditing?: boolean;
}

export function TaskForm({ onSubmit, onCancel, initialTask, isEditing = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const borderColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');

  // Load initial task data when editing
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialTask]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim(), description.trim() || undefined);
      if (!isEditing) {
        // Clear form after adding new task
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </ThemedText>

      <TextInput
        style={[styles.input, { borderColor, color: useThemeColor({}, 'text') }]}
        placeholder="Task title (required)"
        placeholderTextColor={useThemeColor({}, 'icon')}
        value={title}
        onChangeText={setTitle}
        autoFocus={!isEditing}
      />

      <TextInput
        style={[
          styles.input,
          styles.descriptionInput,
          { borderColor, color: useThemeColor({}, 'text') },
        ]}
        placeholder="Description (optional)"
        placeholderTextColor={useThemeColor({}, 'icon')}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <View style={styles.buttonContainer}>
        {isEditing && onCancel && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton, { borderColor }]}
            onPress={onCancel}>
            <ThemedText>Cancel</ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.submitButton, { backgroundColor: tintColor }]}
          onPress={handleSubmit}
          disabled={!title.trim()}>
          <ThemedText style={styles.submitButtonText}>
            {isEditing ? 'Update' : 'Add Task'}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  title: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 44,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
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
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

