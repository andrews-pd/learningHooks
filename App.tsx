import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useToggle from './hooks/useToggle';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

interface Respositorie {
  id: number;
  name: string;
  favorite: boolean;
}

export default function App() {
  const [user, setUser] = useState<User>();
  const[respositories, setRepositories] = useState<Respositorie[]>([]);
  const repoNames = useMemo(() => respositories.map(repo => repo.name).join(', '), [respositories]);
  const [toggleState, { toggle }] = useToggle();

  const greating = useCallback(
    () => alert(`Hello ${repoNames}`), [repoNames]
  );

  useEffect(() =>  {
    fetch('https://api.github.com/users/diego3g/repos').then(response => {
      response.json().then(data => {
        setRepositories(data);
      })
    })
  }, []);

  async function loaddata() {
    const response = await fetch('https://api.github.com/users/diego3g');
    const data = await response.json();

    setUser(data);
  }

  function handleFavorite(id:number) {
    const newRepositories = respositories.map(repo => {
      return repo.id == id ? {...repo, favorite: true} : repo
    });

    setRepositories(newRepositories);
  }

  loaddata();

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <StatusBar style="auto" />
      <Text>{repoNames}</Text>
      <Text>{toggleState}</Text>
      <Button title="Toggle" onPress={toggle} />
      {/* {respositories.map(repo => (
        <>
          <Text key={repo.name}>{repo.name} - { repo.favorite && 'Favorito'}</Text>
          <Button key={repo.name} title='Favoritar' onPress={() => handleFavorite(repo.id)} />
        </>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
