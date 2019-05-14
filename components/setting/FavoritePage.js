

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import configureStore from '../../redux/store';
const store = configureStore();

import {DBTool} from '../tools/DBTool';
const rowData = {
    video:''
}
export default class FavoritePage extends Component {

    //更新store 视频数据
    _video_store_change(){
        var stroeVideos = [];
        this.state.videoLists.map((item)=>{
            stroeVideos.push(item.videoUrl);
        });
        const action = {
            //每个action绑定一个type；
                type:'video_change',
                //需要更新store中的相关数据；
                value:stroeVideos
            };
            //store将事件派发给reducer；
        store.dispatch(action);
    }

    constructor(props){
        super(props);
        this.state = {
            videoLists:[]
        }
    }

    _contains(){
        for (var i = 0; i < store.getState().videoLists.length; i++){
            if (store.getState().videoLists[i] == this.state.shareUrl)//如果要求数据类型也一致，这里可使用恒等号===
                return true;
        }
        return false;
    }

    //监听store是否更新了；
    _storeChanged(){
        alert('Store更新了');
        var that = this;
        //store更新后 重新获取store的state作为当前的state；当前界面上的组件就会被刷新；
        this.setState({
            isCollected:that._contains()
        });
    }
    
    componentDidMount(){
        this._requestVideos();
    }
    _requestVideos(){
        var that = this;
        DBTool.queryVideo(function(videos){
            that.setState({videoLists:videos});
        })
    }
    _clickItem(item){
        rowData.video = item.videoUrl;
        const navigateAction = NavigationActions.navigate({
            routeName: 'VideoDetail',
            params: {rowData},
            action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
            });
        this.props.navigation.dispatch(navigateAction);
    }
    _deleteCollect(item){
        DBTool.deleteVideo(item.videoUrl);
        var newS = this.state.videoLists;
        const index =  newS.indexOf(item);
        newS.splice(index,1);
        this.setState({
            videoLists:newS
        });
        this._video_store_change();
    }

    _shareHeart(item){
       return   <TouchableWithoutFeedback onPress={()=>this._deleteCollect(item)}>
                     <Image style={{
                         width:25,
                         height:25,
                         marginLeft:Dimensions.get('window').width-143,
                         marginBottom:5,
                         resizeMode:'contain'
                     }}
                     source={require('../src/heart_active.png')}
                     >
                     </Image>
                </TouchableWithoutFeedback>
    }

    _renderRow(item){
        return <TouchableWithoutFeedback key={item.imageUrl} onPress={()=>this._clickItem(item)}>
                    <View style={{flex:1,height:106,marginHorizontal:5,marginTop:5}}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                            <Image style={{width:100,height:100,borderRadius:5}} source={{uri:item.imageUrl}}></Image>
                            <View style={{flex:1}}>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{flex:1,fontSize:16,color:'#333333',textAlign:'left',marginLeft:8,overflow:'hidden'}}>{item.content}</Text>
                                {this._shareHeart(item)}
                            </View>
                        </View>
                        <View style={{height:1,backgroundColor:'#EEE9E9'}}></View>
                    </View>
                </TouchableWithoutFeedback>

    }
    _extraUniqueKey(item ,index){
        return "index"+index+item.imageUrl;
    }  
    render(){
        return  <FlatList
                    style={{flex:1}}
                    keyExtractor = {this._extraUniqueKey} 
                    data={this.state.videoLists}
                    renderItem = {({item}) => this._renderRow(item)}
                />;
    }


}