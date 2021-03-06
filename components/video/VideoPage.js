import React, { Component } from 'react';
import {
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import setStatusBar from '../tools/StatusTool';
import CustomTabBar from './CustomTabBar';

export default class VideoPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      imageUrl:'',
      showPic:false,
    }
  }
  componentDidMount(){
    setStatusBar(true);
  }
  
  _play = (navigateAction)=>{
    this.props.navigation.dispatch(navigateAction);
  }

  _onShowPic(imageUrl){
    this.setState({
      imageUrl:imageUrl,
      showPic:!this.state.showPic
    });
  }

  _showModel(){
    return <Modal visible={this.state.showPic && this.state.imageUrl.length>0} transparent={true} 
              onRequestClose={()=> {this.setState({showPic: false,})
           }}>
              <ImageViewer 
                  onCancel={()=> {this.setState({showPic: false,});}}
                  saveToLocalByLongPress={false}
                  loadingRender={()=>{
                    return <ActivityIndicator color='white' size="large"/>
                  }}
                  onClick={()=>{this.setState({showPic:!this.state.showPic});}}
                  imageUrls={[{url:this.state.imageUrl,props:{}}]}/>
           </Modal>;
  }

  render() {
          return(
            <View style={{flex:1}}>
                {this._showModel()}
                <CustomTabBar
                    onTapPlay={(navigateAction)=>this._play(navigateAction)}
                    onShowPic={(imageUrl)=>this._onShowPic(imageUrl)}
                />
              </View>
          );
      }
}
