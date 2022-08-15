import React,{ useState,useRef,useEffect } from 'react';
import {  Image, TouchableOpacity, View, Text, StyleSheet,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import closeIcon from '../assets/icons/close/close.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskProps {
    item:Task;
    index:number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number,taskNewTitle: string) => void;
}

export function TaskItem({ item,index,toggleTaskDone,removeTask,editTask }: TaskProps) {
    const [isEditing,setIsEditing] = useState<boolean>(false);
    const [newTitle,setNewTitle] = useState<string>(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setIsEditing(!isEditing);
    }

    function handleCancelEditing(){
        setIsEditing(!isEditing);  
        setNewTitle(item.title);  
    }

    function handleSubmitEditing(){
        editTask(item.id, newTitle);
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

  return (
    <View style={ styles.container } >
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  style={item.done ? styles.taskTextDone : styles.taskText}
                  onChangeText={setNewTitle}
                  value={newTitle}
                  editable={isEditing}
                  onSubmitEditing={handleSubmitEditing}
                  ref={textInputRef}
                  autoCorrect={false}
                />
     
              </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer } >
                { isEditing ? (
                    <TouchableOpacity
                    onPress={handleCancelEditing}
                    >
                    <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    onPress={handleStartEditing}
                    >
                    <Image source={editIcon} />
                    </TouchableOpacity>
                ) }

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
                </View>
            </View>
          
        )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer:{
    flexDirection:'row',   
     justifyContent:'space-between',
     alignItems:'center',
     marginRight:10,
     padding:5    

  },
  iconsDivider:{
    marginLeft:10,
    marginRight:10,
    width:1,
    height:24,
    backgroundColor:'rgba(196, 196, 196, 0.24)'
  },
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
  },
})