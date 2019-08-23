import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'

var {width,height}=Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex:1, 
        margin:0
    },
    headerBox: {
        height:'20%',
        width:width,
        alignItems:'center',
        justifyContent:'center'
    },
    headerContent: {
        flexDirection:'row',
        marginHorizontal:30,
        marginBottom:10,
        alignItems:'center'
    },
    headerText: {
        fontSize:22,
        fontWeight:'bold',
        color:'white'
    },
    headerButton: {
        position:'absolute',
        right:5
    },
    headerIcon: {
        color:'white',
        fontSize:20
    },
    headerText2: {
        backgroundColor:'rgba(255,255,255,0.7)',
        borderColor:'gray',
        borderWidth:0.5,
        fontSize:15,
        marginHorizontal:20,
        paddingVertical:5,
        paddingHorizontal:15,
        borderRadius:50
    },
    contentBox: {
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'white',
        height:'70%',
        marginRight:30,
        borderBottomRightRadius:50,
        borderTopRightRadius:50
    },
    menuBox: {
        alignItems:'center',
        margin:15
    },
    menuButton: {
        backgroundColor:'#5F42AB',
        borderRadius:50,
        marginBottom:5,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    menuText: {
        width:60,
        fontSize:15,
        textAlign:'center'
    }
})

export default styles