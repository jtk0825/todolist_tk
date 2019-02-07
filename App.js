import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ToDo from "./ToDo";
import {AppLoading} from 'expo';
const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos:false
  };

  componentDidMount = () => {
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading></AppLoading>;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>
        <Text style={styles.title}>TaeKi's TodoList</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder= {"New To Do"} value={newToDo} onChangeText={this._controlNewToDo} placeholderTextColor={"#999"} returnKeyType={'done'} autoCorrect={false} onSubmitEditing={this._addToDo} ></TextInput>
          <ScrollView contentContainerStyle={styles.todos}>
            <ToDo text={'Hello I am a ToDo' }/>
          </ScrollView>        

        </View>
      </View>
    );
  }
  _controlNewToDo = text => {
    this.setState({
      newToDo: text
    })
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  _addToDo = () => {
    const {newToDo} = this.state;
    if (newToDo != ""){
      this.setState({
        newToDo: ""
      });
      

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 50,
    fontWeight: "100",
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: width - 25,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowRadius: 5,
        shadowOpacity: 0.5,
        shadowOffset: {
        height: -3,
        width: 0
        },

      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: {
    alignItems: 'center'
  }
});
