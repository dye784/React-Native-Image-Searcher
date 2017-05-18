import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ListView } from 'react-native';
import { PIXABAY_API_KEY } from './.secrets.env'

export default class App extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.webformatURL !== r2.webformatURL });
    this.state = {
      searchFor: '',
      dataSource: ds.cloneWithRows([]),
      selectedItem: {},
    };
  }

  handleSearchQuery = () => {
    const { dataSource, searchFor } = this.state
    fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchFor}&image_type=photo`)
      .then((res) => res.json())
      .then((resJson) => resJson.hits)
      .then((foundImages) => {
        const newDataSource = dataSource.cloneWithRows(foundImages);
        this.setState({ searchFor: '', dataSource: newDataSource })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { dataSource, searchFor } = this.state;
    return (
      <View style={styles.container}>
        <Text>Search For Something!</Text>
        <Text>Recommendation: Cats!</Text>
        <TextInput
          placeholder="Enter something to search for!"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(searchFor) => this.setState({ searchFor })}
          onEndEditing={this.handleSearchQuery}
          value={searchFor}
        />
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(rowData) => <Image style={{ width: 200, height: 200 }} source={{ uri: rowData.webformatURL }} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
