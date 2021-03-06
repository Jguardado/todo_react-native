import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this.state = {
      data: this.props.data,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data,
    });
  }

  _onCheckBoxPressed() {
    const data = this.state.data;
    data.completed = !data.completed;
    this.setState({
      data,
    });

    this.props.onCompletedChange(data, this.props.dataIndex);
  }

  render() {
    const data = this.state.data;
    const color = data.completed ? '#C5C8C9' : '#000';
    const textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight underlayColor={'#eee'} style={{ paddingTop: 6, paddingBottom: 6, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee' }} {...this.props.sortHandlers}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed} />
          <Text style={{ fontSize: 18, color, textDecorationLine }}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListViewItem;
