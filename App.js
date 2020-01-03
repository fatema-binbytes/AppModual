import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import codePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import RNFS from 'react-native-fs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
    OneSignal.init('0029f883-495b-4369-aa2f-6f5efd4b116d');
  }
  componentDidMount() {
    // codePush.sync();
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(files => {
        files.forEach(x => {
          if (x.path.includes('.png')) {
            this.state.images.push(x.path);
            this.setState({images: this.state.images});
          }
        });
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }
  dowanloadImage(path) {
    const dest = RNFS.CachesDirectoryPath + '/Image/';
    RNFS.moveFile(path, dest)
      .then(files => {
        console.log(files);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.images.map(x => {
          return (
            <View style={styles.container}>
              <Image source={{uri: x}} style={{height: 100, width: 100}} />
              <TouchableOpacity onPress={() => this.dowanloadImage(x)}>
                <Text>{'Dowanload'}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
