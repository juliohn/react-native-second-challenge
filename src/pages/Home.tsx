import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const found = tasks.find(task => {
      return task.title === newTaskTitle;
    });

    if(found){
      Alert.alert(
        "Ops",
        `"${newTaskTitle}" Já cadastrado.`,
        [          
          { text: "Entendi"},
        ]
      );
      return false;      
    }    
    
    const newTask = {
      id:new Date().getTime(),
      title:newTaskTitle,
      done:false
    }
    setTasks(state =>[...state, newTask]);
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => (
       task.id === id ? {...task, done: !task.done}: task
    ));   
    
    setTasks(updatedTasks);
  }

  function handleEditTask(id: number,taskNewTitle: string) {
   
    const found = tasks.find(task => {
      return task.title === taskNewTitle;
    });

    if(found){
      Alert.alert(
        "Ops",
        `"${taskNewTitle}" Já cadastrado.`,
        [          
          { text: "Entendi"},
        ]
      );
      return false;      
    }  

    const editTasks = tasks.map(task => (
       task.id === id ? {...task, title: taskNewTitle}: task
    ));   
    
    setTasks(editTasks);
  }

  function handleRemoveTask(id: number) {    
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [    
        { text: "Não", onPress: () => {
          return;
        }},    
        { text: "Sim", onPress: () => {
          const newTasks = tasks.filter(function(task) {
            return task.id !== id;
          })
      
          setTasks(newTasks);  

        } }
      ]
    );

          
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})