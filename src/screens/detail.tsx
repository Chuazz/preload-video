import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
import {Post} from '../data/post/data';

const DetailScreen = ({route}: NativeStackScreenProps<any>) => {
  const {post} = route.params || ({} as {post: Post});

  return (
    <View style={{flexGrow: 1, padding: 12}}>
      <Text>{title}</Text>
    </View>
  );
};

export {DetailScreen};
