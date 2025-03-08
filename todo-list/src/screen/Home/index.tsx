import { View, Image, Text, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Input } from '../../components/Input';
import { Task } from '../../components/Task';

import { styles } from './styles';

type TaskType = {
  id: string;
  title: string;
  isChecked: boolean;
  isPressed: boolean;
  isRemovePressed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [counterCreated, setCounterCreated] = useState<number>(0);
  const [counterDone, setCounterDone] = useState<number>(0);

  const addTask = (title: string) => {
    if (!title.trim() || tasks.find(task => task.title === title)){
      Alert.alert('Erro', 'Tarefa inválida ou já existente');
      return;
    };

    const newTask = {
      id: title,
      title,
      isChecked: false,
      isPressed: false,
      isRemovePressed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const updateCounter = () => {
    const doneCount = tasks.filter((task) => task.isChecked).length;
    setCounterDone(doneCount);

    const createdCount = tasks.length;
    setCounterCreated(createdCount);
  };

  const toggleTaskState = (id: string, key: keyof TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [key]: !task[key] } : task
      )
    );
  }

  const toggleBothStates = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, isChecked: !task.isChecked, isPressed: !task.isPressed }
          : task
      )
    );
  };

  const removeTask = (id: string) => {
    toggleTaskState(id, 'isRemovePressed');
    Alert.alert('Remover tarefa', 'Deseja realmente remover esta tarefa?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => toggleTaskState(id, 'isRemovePressed'),
      },
      { text: 'Confirmar', onPress: () => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)) }
    ]);
  };

  useEffect(() => {
    updateCounter();
  }, [tasks]);

  return (<View style={styles.container}>
      <View style={styles.blackContainer}>
        <Image source={require('../../../assets/logoApp.png')} />
      </View>

      <View style={styles.greyContainer}>
        <Input 
          addTask={addTask}
        />

        <View style={styles.amountContainer}>
          <View style={styles.amountRow}>
            <Text style={styles.created}>Criadas</Text>
            <Text style={styles.amount}>{counterCreated}</Text>
          </View>

          <View style={styles.amountRow}>
            <Text style={styles.done}>Concluídas</Text>
            <Text style={styles.amount}>{counterDone}</Text>
          </View>
        </View>
  

        <FlatList
          style={styles.list}
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              id={item.id}
              title={item.title}
              isChecked={item.isChecked}
              isPressed={item.isPressed}
              isRemovePressed={item.isRemovePressed}
              toggleTaskState={toggleTaskState}
              toggleBothStates={toggleBothStates}
              removeTask={removeTask}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
          <>
            <View style={styles.line}></View>
            <View style={styles.listEmptyContainer}>
              <Image source={require('../../../assets/Clipboard.png')}/>
              <Text style={styles.listEmptyTitle}>Você ainda não tem tarefas cadastradas</Text>
              <Text style={styles.listEmptyText}>Crie tarefas e organize seus itens a fazer</Text>
            </View>
          </>
          )}
        />
      </View>
  </View>)
}

export default Home