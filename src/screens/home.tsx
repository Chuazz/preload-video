import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Post, posts} from '../data/post/data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const HomeScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {width} = useWindowDimensions();

  const renderItem = ({item}: {item: Post}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            post: item,
          })
        }>
        <View style={{paddingHorizontal: 12, paddingBottom: 12}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: 'black',
            }}>
            {item.title} -{' '}
            <Text style={{color: 'gray', fontWeight: 'normal', fontSize: 14}}>
              {item.subtitle}
            </Text>
          </Text>

          <Text style={{lineHeight: 20, paddingTop: 8, color: 'black'}}>
            {item.description}
          </Text>
        </View>

        <Image
          source={item.thumb}
          style={{
            width: width,
            height: 400,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      contentContainerStyle={{gap: 24, paddingVertical: 12, flexGrow: 1}}
    />
  );
};

export {HomeScreen};
