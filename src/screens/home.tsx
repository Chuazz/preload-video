import {
  useWindowDimensions,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  ViewToken,
} from 'react-native';
import {Post, posts} from '../data/post/data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRef} from 'react';

const HomeScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {width} = useWindowDimensions();

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(
    async ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      if (viewableItems.length) {
        const post = viewableItems?.[0]?.item as Post;
        const currentIndex = viewableItems?.[0]?.index;

        if (
          currentIndex === null ||
          currentIndex === undefined ||
          currentIndex < 0
        ) {
          return;
        }

        if (!post) {
          return;
        }

        console.log(post);
      }
    },
  );

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
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      contentContainerStyle={{gap: 24, paddingVertical: 12, flexGrow: 1}}
    />
  );
};

export {HomeScreen};
