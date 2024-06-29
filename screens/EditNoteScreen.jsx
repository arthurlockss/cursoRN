import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, As } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteContext } from "../App";

const EditNoteScreen = ({ navigation }) => {
  const [note, setNote] = useState("");

  const { notes, setNotes, selectedNote } = useContext(NoteContext);

  const handleSaveNote = async () => {
    if (!note) return alert("Insira alguma nota para salvar!");

    try {
      const newNotes = [...notes];

      newNotes[selectedNote.index] = { ...selectedNote, note };

      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

      setNotes(newNotes);

      navigation.navigate("Home");
    } catch (e) {
      alert(e);
    }
  };

  const handleDeleteNote = async () => { 
    try {
      const newNotes = notes.filter(
        (note) => note.index !== selectedNote.index
      );

      const sortedNotes = newNotes.map((note, i) => {
        return { note: note.note, index: i };
      });

      await AsyncStorage.setItem("notes", JSON.stringify(sortedNotes));

      setNotes(sortedNotes);

      navigation.navigate("Home");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setNote(selectedNote.note);
  }, []);

  return (
    <ScrollView>
      <View style={{ padding: 20, justifyContent: "space-around" }}>
        <TextInput
          style={styles.textarea}
          placeholder="Type Here"
          mode="contained"
          multiline={true}
          numberOfLines={5}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <Button
          style={{ marginBottom: 5 }}
          buttonColor="#009067"
          onPress={handleSaveNote}
          mode="contained"
          icon="pencil"
        >
          Editar
        </Button>
        <Button
          buttonColor="#b40028"
          onPress={handleDeleteNote}
          mode="contained"
          icon="delete"
        >
          Excluir
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
export default EditNoteScreen;
