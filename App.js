import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ListView, TouchableHighlight, Button } from 'react-native';
import { PIXABAY_API_KEY } from './.secrets.env';
import PhotoDetails from './PhotoDetails';
import ListItem from './ListItem';

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.webformatURL !== r2.webformatURL });
    this.state = {
      searchFor: '',
      dataSource: ds.cloneWithRows([]),
      selectedItem: {},
      home: true,
    };
  }

  handleSearchQuery = () => {
    const { dataSource, searchFor } = this.state
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchFor}&image_type=photo`)
      .then((res) => res.json())
      .then((resJson) => resJson.hits)
      .then((foundImages) => {
        const newDataSource = dataSource.cloneWithRows(foundImages);
        this.setState({ searchFor: '', dataSource: newDataSource, selectedItem: {}, home: false })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectItem = (item) => {
    this.setState({ selectedItem: item })
  }

  onPressGoBackToList = () => {
    this.setState({ selectedItem: {} })
  }

  handleTextInput = (searchFor) => {
    this.setState({ searchFor })
  }

  render() {
    const { dataSource, searchFor, selectedItem, home } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.whiteText} >Search For Something!</Text>
        <Text style={styles.whiteText} >We recommend cats!</Text>
        <TextInput
          placeholder="Enter something to search for!"
          style={styles.textInputStyles}
          onChangeText={this.handleTextInput}
          onSubmitEditing={this.handleSearchQuery}
          value={searchFor}
        />
        {home && <Image style={styles.imageSize} source={require('./react-native-logo.png')}/>}
        {selectedItem.webformatURL && <PhotoDetails {...this.state.selectedItem} />}
        {!selectedItem.webformatURL &&
          <ListView
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(rowData) => <ListItem rowData={rowData} selectItem={this.selectItem} />}
          />}
          {selectedItem.webformatURL &&
            <View style={styles.buttonBackground}>
              <Button title="Back" color="#FFF" accessibilityLabel="Go Back to List" onPress={this.onPressGoBackToList}/>
            </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#00A4D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  textInputStyles: {
    height: 40,
    borderColor: '#FFF',
    borderWidth: 1,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
  },
  imageSize: {
    width: 300,
    height: 100,
  },
  buttonBackground: {
    backgroundColor: '#ED4956',
    justifyContent: 'center',
    width: 400,
  }
});
