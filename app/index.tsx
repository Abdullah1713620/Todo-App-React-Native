import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const Home = () => {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [index, setIndex] = useState<number | null>(null);

  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todo, input]);
      setInput('');
    }
  };

  const openModal = (item: string, idx: number) => {
    setUpdateInput(item);
    setIndex(idx);
    setModalVisible(true);
  };

  const updateTodo = () => {
    if (updateInput.trim() && index !== null) {
      const updatedTodos = [...todo];
      updatedTodos[index] = updateInput;
      setTodo(updatedTodos);
      closeModal();
    }
  };

  const deleteTodo = (idx: number) => {
    setTodo(todo.filter((_, index) => index !== idx));
  };

  const closeModal = () => {
    setModalVisible(false);
    setUpdateInput('');
    setIndex(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={[styles.button, styles.successButton]} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={() => openModal(item, index)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={() => deleteTodo(index)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.smallModal}>
            <Text style={styles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit task"
              value={updateInput}
              onChangeText={setUpdateInput}
            />
            <TouchableOpacity style={[styles.button, styles.warningButton]} onPress={updateTodo}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  smallModal: {
    width: '70%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
