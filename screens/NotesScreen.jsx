import { ScrollView, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useContext } from "react";
import NoteCard from "../components/NoteCard";
import { NoteContext } from "../App";

const NotesScreen = ({ navigation }) => {
  const { notes } = useContext(NoteContext);

  return (
    <>
      <View style={styles.view}>
        <Button
          mode="contained"
          icon="plus"
          style={{ marginTop: 5 }}
          onPress={() => {
            navigation.navigate("AddNote");
          }}
        >
          Novo
        </Button>
      </View>
      <ScrollView>
        {notes.map(({ note }, i) => (
          <NoteCard note={note} key={i} index={i} navigation={navigation} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    marginLeft: "auto",
  },
});

export default NotesScreen;
