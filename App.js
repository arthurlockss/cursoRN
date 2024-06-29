import { createContext, useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesScreen from './screens/NotesScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditNoteScreen from './screens/EditNoteScreen';

export const NoteContext = createContext({ notes: [], setNotes: () => { }, selectedNote: { index: 0, note: '' }, setSelectedNote: () => { } })

export default function App() {
  const Stack = createNativeStackNavigator()

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  const getNotes = async () => {
    try {
      const notesJson = await AsyncStorage.getItem("notes");

      const notes = notesJson ? JSON.parse(notesJson.split(",")) : [];

      setNotes(notes);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    getNotes();
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        <NoteContext.Provider value={{ notes, setNotes, selectedNote, setSelectedNote }}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={NotesScreen} />
            <Stack.Screen name='AddNote' component={AddNoteScreen} />
            <Stack.Screen name='EditNote' component={EditNoteScreen} />
          </Stack.Navigator>
        </NoteContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}
