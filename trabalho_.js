import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const img_path = 'https://api.otaviolube.com';

function TitleBar({title}) {
  return (
    <View style={styles.titleBar}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const baseUrl = 'https://api.otaviolube.com/api/filmes?populate=*';

  useEffect(function(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setFilmes(data.data);
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <TitleBar title="Filmes disponíveis" />
      <View style={styles.viewDados}>
        {filmes.length > 0 ? (
          filmes.map(filme => (
            <View key={filme.id} style={styles.filmeContainer}>
              <View style={styles.viewImagem}>
                <Image style={styles.poster} source={{ uri: `${img_path}${filme.attributes.poster.data.attributes.formats.thumbnail.url}` }} />
              </View>
              <View style={styles.viewDescricao}>
              <Text style={styles.titulo}>{filme.attributes.titulo}</Text>
              <View style={{ flexWrap: 'wrap' }}>
                <Text numberOfLines={9} style={styles.sinopse}>{filme.attributes.sinopse}</Text>
              </View>
              <View style = {styles.viewBotao}>
                <TouchableOpacity style={styles.botao}>
                  <Text style={styles.botaoTexto}>Comprar ingresso</Text>
                </TouchableOpacity>
              </View>  
            </View>

            </View>
          ))
        ) : (
          <Text style={styles.loading}>Carregando...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  titleBar: {
    Flex: 1,
    height: 60,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },

  viewDados: {
    flex: 1,
    padding: 10,
  },

  filmeContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 220,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },

  viewImagem: {
    width: '30%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  poster: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },

  viewDescricao: {
    flex: 1,
    padding: 10,
  },

  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#424242',
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  sinopse: {
    fontSize: 16,
    textAlign: 'justify',
    fontFamily: 'Roboto',
    color: '#757575',
    lineHeight: 22,
    marginBottom: 10,
    numberOfLines: 5
  },

  botao: {
    backgroundColor: '#FF4500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'center',    
  },

  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  loading: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#fff',
    marginTop: 30,    
  },
  
});