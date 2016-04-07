'use strict';

var React = require('react-native');
var WeathervaneList = require('./WeathervaneList');

var {
    StyleSheet,
    NavigatorIOS,
    Component
   } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

class Featured extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
            title: 'Featured Videos',
            component: WeathervaneList
            }}/>
        );
    }
}

module.exports = Featured;
