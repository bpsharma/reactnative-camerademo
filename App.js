import * as React from "react";
import { View, Image,ScrollView,StyleSheet,Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = {
    imageUrl: 'http://clipart-library.com/images_k/male-silhouette-profile/male-silhouette-profile-12.png'
  }
  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
        let capturedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
            console.log(capturedImage);
            this.setState({imageUrl: capturedImage.uri });
        }
    }
  }
  
  render(){
  return (
    <ScrollView>
    <View style={styles.container}>
    <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                </View>
    </View>
    </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      margin: 50,
  },
  imageContainer: {
      flex: 1,
      flexDirection: 'row',
      margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  }
});
