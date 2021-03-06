import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';

const dataList = [
  new TodoModel('Hello Koding'),
  new TodoModel('Make a Todo App with React Native'),
  new TodoModel('Check to complete a todo'),
  new TodoModel('Long press, drag and drop a todo to sort'),
  new TodoModel('Save data with Realm'),
  new TodoModel('Sync data with Firebase'),
];

let dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList,
    };
  }

  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList,
    });
  }

  _onCompletedChange(dataItem, index) {
    const fromIndex = dataListOrder.indexOf(index);
    const toIndex = dataItem.completed ? dataListOrder.length - 1 : 0;
    moveOrderItem(this, fromIndex, toIndex);
  }

  render() {
    let listView = (<View />);
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref="listView"
          style={{ flex: 1 }}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange} />}
        />
      );
    }

    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <OmniBox
          data={dataList}
          updateDataList={this.updateDataList}
        />
        {listView}
      </View>
    );
  }
}

module.exports = ListView;
