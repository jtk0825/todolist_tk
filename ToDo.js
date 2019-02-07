import React, {Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"

const {height, width} = Dimensions.get("window");

export default class ToDo extends Component{

    state = {
        isEditing: false,
        isCompleted: false,
        todoValue: ''
    }

    render(){
        const {isCompleted, isEditing, todoValue} = this.state;
        const {text} = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCicle : styles.uncompletedCircle]}></View>
                    </TouchableOpacity>
                    {isEditing ? ( <TextInput value={todoValue} style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText] } multiline={true} onChangeText={this._controlInput} returnKeyType={'done'} onBlur={this._finishEditing}></TextInput>) : (<Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]} > {text} </Text>)  }
                </View>
                {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPress={this._finishEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>✅</Text>
                        </View>
                    </TouchableOpacity>
                </View>) :
                ( <View style={styles.actions}>
                    <TouchableOpacity onPress={this._startEditing}>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>️✏️</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>)}
            </View>
        );
    }
    _toggleComplete = () => {
        this.setState ( prevState => {
            return {
                isCompleted: !prevState.isCompleted
            }
        })
    }
    _startEditing = () => {
        const { text } = this.props;
        this.setState ({
            isEditing: true, todoValue: { text }
        })
    }
    _finishEditing = () => {
        this.setState ({
            isEditing: false
        })
    }
    _controlInput = (text) => {
        this.setState ({
            todoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCicle: {
        borderColor: "#bbb",
    },
    uncompletedCircle: {
        borderColor: "crimson",
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "black",
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width/2,
        justifyContent: 'space-between'
    },
    actions:{
        flexDirection:'row'
    },
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        marginVertical: 15,
        width: width/2,
        paddingBottom: 5
    }
})