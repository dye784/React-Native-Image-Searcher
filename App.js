import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ListView, TouchableHighlight, Button } from 'react-native';
import { PIXABAY_API_KEY } from './.secrets.env';
import PhotoDetails from './PhotoDetails';
import ListItem from './ListItem';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.state = {
      searchFor: '',
      dataSource: ds.cloneWithRows([]),
      selectedItem: {},
      home: true,
      canLoadMoreContent: true,
      page: 1,
      perPage: 10,
    };
  }

  handleSearchQuery = () => {
    const { dataSource, searchFor, perPage, page } = this.state
    const newNumPages = perPage === 200 ? page + 1 : page;
    const newNumPerPages = perPage + 10;
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchFor}&image_type=photo&page=${newNumPages}&per_page=${newNumPerPages}`)
      .then((res) => res.json())
      .then((resJson) => resJson.hits)
      .then((foundImages) => {
        const newDataSource = dataSource.cloneWithRows([...dataSource, ...foundImages]);
        this.setState({ dataSource: newDataSource, selectedItem: {}, home: false, page: newNumPages, perPage: newNumPerPages })
      })
      .catch((error) => console.log(error));
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
        <Text style={styles.whiteText}>Search For Something!</Text>
        <Text style={styles.whiteText}>We recommend cats!</Text>
        <TextInput
          placeholder="Enter something to search for!"
          style={styles.textInputStyles}
          onChangeText={this.handleTextInput}
          onSubmitEditing={this.handleSearchQuery}
          value={searchFor}
        />
        {home && <Image style={styles.imageSize} source={require('./react-native-logo.png')}/>}
        {selectedItem.webformatURL && <PhotoDetails {...selectedItem} />}
        {!selectedItem.webformatURL &&
          <ListView
            renderScrollComponent={(props) => <InfiniteScrollView {...props} />}
            dataSource={dataSource}
            onLoadMoreAsync={this.handleSearchQuery}
            enableEmptySections={true}
            canLoadMore={true}
            distanceToLoadMore={5}
            renderRow={(rowData) => (
              <ListItem
                rowData={rowData}
                selectItem={this.selectItem}
              />
              )}
          />}
        {selectedItem.webformatURL &&
          <View style={styles.buttonBackground}>
            <Button
              title="Back"
              color="#FFF"
              accessibilityLabel="Go Back to List"
              onPress={this.onPressGoBackToList}
            />
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
