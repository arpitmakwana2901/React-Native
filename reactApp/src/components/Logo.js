import React from 'react';
import {View,Image} from 'react-native';

import Images from '../constants/Images';

const Logo=()=>{

return(

<View
style={{
alignItems:'center',
marginBottom:20
}}>

<Image
source={Images.logo}
style={{
width:70,
height:70,
resizeMode:'contain'
}}
/>

</View>

)

}

export default Logo;