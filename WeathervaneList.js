'use strict';

var React = require('react-native');
// var FAKE_VID_DATA = [
//   {videoInfo: {title: 'Recording Workshop', date: '06192019', imageLinks: {thumbnail: 'http://weathervanemusic.org/images/wv-logo.png'}}}
// ];
var REQUEST_URL = 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCpTdK0vsnjgMyiAq6VRSS8Q&maxResults=25&key=[key_here]';

var {
    Image,
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    width: 85,
    height: 85,
    marginRight: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  date: {
    color: 'blue'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});

class WeathervaneList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.items),
        isLoading: false
    });
  })
  .done();
}
    render() {
      if(this.state.isLoading) {
        return this.renderLoadingView();
      }

        return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderVideo.bind(this)}
            style={styles.listview}
            />
        );
    }
    renderLoadingView() {
      return (
           <View style={styles.loading}>
               <ActivityIndicatorIOS
                   size='large'/>
               <Text>
                   Loading videos...
               </Text>
           </View>
       );
   }
  renderVideo(video) {
    console.log(video);
       return (
            <TouchableHighlight>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: video.snippet.thumbnails.default.url}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{video.snippet.title}</Text>
                            <Text style={styles.date}>{video.snippet.publishedAt}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }
}

module.exports = WeathervaneList;
