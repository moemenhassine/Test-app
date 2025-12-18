/**
 * TaskItem Component
 * Displays a single task with options to complete, edit, and delete
 */

import { useThemeColor } from '@/hooks/use-theme-color';
import { Task } from '@/storage/taskStorage';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const [scaleAnim] = useState(new Animated.Value(1));
  const tintColor = useThemeColor({}, 'tint');
  const iconColor = useThemeColor({}, 'icon');

  // Animation for delete action
  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onDelete(task.id);
          });
        },
      },
    ]);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <ThemedView style={[styles.taskCard, task.completed && styles.completedTask]}>
        <TouchableOpacity
          style={styles.content}
          onPress={() => onToggle(task.id)}
          activeOpacity={0.7}>
          {/* Checkbox */}
          <View
            style={[
              styles.checkbox,
              task.completed && { backgroundColor: "#3B5998", borderColor: "#3B5998" },
              { borderColor: task.completed ? "#3B5998" : iconColor },
            ]}>
            {task.completed && (
              <ThemedText style={styles.checkmark}>✓</ThemedText>
            )}
          </View>

          {/* Task Content */}
          <View style={styles.taskContent}>
            <ThemedText
              style={[
                styles.taskTitle,
                task.completed && styles.completedText,
              ]}>
              {task.title}
            </ThemedText>
            {task.description && (
              <ThemedText
                style={[
                  styles.taskDescription,
                  task.completed && styles.completedText,
                ]}>
                {task.description}
              </ThemedText>
            )}
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton, { backgroundColor: "#3B5998" }]}
            onPress={() => onEdit(task)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText style={styles.editButtonText}>Edit</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText style={styles.deleteText}>Delete</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedTask: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    // backgroundColor is set dynamically with "#3B5998"
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: '#ff4444',
    backgroundColor: 'transparent',
  },
  deleteText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '500',
  },
});

