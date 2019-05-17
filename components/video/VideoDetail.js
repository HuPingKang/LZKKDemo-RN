import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
import MarqueeLabel from 'react-native-lahk-marquee-label';
export default class VideoDetail extends Component {

  componentDidMount(){
    console.log(JSON.stringify(this.props.navigation.state.params.rowData.video));
  }
  _runHorseLabel(){

    var dmTexts = [
      // '安兹是王足以，号令天下于此。',
      // '小天使你要是消失了，我就陪你消失。',
      // '一吻定情的粉红，我的天，粉了我一个夏天',
      '高能预警 ',
      'UP 地址呢？我搜不到呀',
      '放开那个人，让我来 ',
    ];
    var colors = ['white','#FF83FA','#00FF7F','#00F5FF','#00C5CD','#00CD00',
                  '#FFE4C4','#FFFFF0','#FF7256','#FF34B3','#FF4500'
                 ];
    var horses = [];
    for(var i=0;i<dmTexts.length;i++){
      const color = colors[i];
      horses.push(
          <MarqueeLabel key={i}
              duration={8000}
              text={dmTexts[i]}
              textHeight={20}
              textWidth={30}
              textStyle={{fontSize: 18, color:color,fontWeight:'bold'}}
          />
      );
    }
    
    return  <View style={{position:'absolute',width:Dimensions.get('window').width,height:320}}>
                {horses}
            </View>
  }
  render() {
          return(
            <View style={{flex:1,justifyContent:'flex-start'}}>
                <Video source={{uri: this.props.navigation.state.params.rowData.video}}  
                ref={(ref) => {
                  this.player = ref
                }}                                      
                style={{
                  width:Dimensions.get('window').width,
                  height:320
                }} 
                resizeMode={'cover'}
              />
              {this._runHorseLabel()}
            </View>
          );
      }
}
