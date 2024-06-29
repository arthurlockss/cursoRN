import { useContext, useState } from "react";
import { Text, View, StyleSheet, ScrollView, As } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteContext } from "../App";

const AddNoteScreen = ({ navigation }) => {
  const [note, setNote] = useState("");

  const { notes, setNotes } = useContext(NoteContext);

  const handleSaveNote = async () => {
    if (!note) return alert("Insira alguma nota para salvar!");

    try {
      const newNotes = notes?.length
        ? [...notes, { note, index: notes.pop().index + 1 }]
        : [{ note, index: 0 }];

      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

      setNotes(newNotes);
      navigation.navigate("Home");
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 20, justifyContent: "space-around" }}>
        <TextInput
          style={styles.textarea}
          placeholder="Type Here"
          mode="contained"
          multiline={true}
          numberOfLines={5}
          onChangeText={(text) => setNote(text)}
        />
        <Button
          onPress={handleSaveNote}
          mode="contained"
          buttonColor="#009067"
          icon="plus"
        >
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textarea: {
    marginBottom: 8,
  },
});
export default AddNoteScreen;
