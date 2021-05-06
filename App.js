import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
} from 'react-native';

import Voice from '@react-native-voice/voice';

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };

    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.results}>
            Result
        </Text>
        {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
        )}
        <View style={styles.buttonView}>
        <Button style={styles.button}
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    textAlign: 'center',
  },
  results: {
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20
  },
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
  },
  buttonView: {
    position: 'absolute',
    bottom:15,
    width: '100%',
    alignItems: 'center'
},
});
AppRegistry.registerComponent('VoiceNative', () => VoiceNative);
