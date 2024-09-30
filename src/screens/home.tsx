import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewToken,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Post, posts} from '../data/post/data';

export const preloadVideo = async (inputUrl: string) => {
  const name = inputUrl.split('/').pop();
  const command = `-i ${inputUrl} -ss 0 -t 5 -c copy ${RNFS.TemporaryDirectoryPath}/${name} -n`;

  if (await RNFS.exists(`${RNFS.TemporaryDirectoryPath}/${name}`)) {
    return `${RNFS.TemporaryDirectoryPath}/${name}`;
  }

  try {
    const session = await FFmpegKit.execute(command);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      return `${RNFS.TemporaryDirectoryPath}/${name}`;
    }
  } catch (error) {
    console.log(error);
  }
};

const HomeScreen = ({navigation}: NativeStackScreenProps<any>) => {
  const {width} = useWindowDimensions();
  const [convertedPost, setConvertedPost] = useState<Post[]>([]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 20,
  });

  const onViewableItemsChanged = useRef(
    async ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      const items = viewableItems.map(t => t.item) as Post[];
      const result: Post[] = [];

      for (let index = 0; index < items.length; index++) {
        const post = items[index];

        if (!post?.source) {
          continue;
        }

        // const uri = convertToProxyURL(post?.source);
        // console.log('🚀 ~ uri:', uri);

        // if (!uri) {
        //   continue;
        // }

        // result.push({...post, preload: uri});
      }

      setConvertedPost(result);

      // if (viewableItems.length) {
      //   const post = viewableItems?.[0]?.item as Post;
      //   const currentIndex = viewableItems?.[0]?.index;

      //   if (
      //     currentIndex === null ||
      //     currentIndex === undefined ||
      //     currentIndex < 0
      //   ) {
      //     return;
      //   }

      //   if (!post) {
      //     return;
      //   }

      //   console.log(post);
      // }
    },
  );

  const renderItem = ({item}: {item: Post}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Detail', {
            post: convertedPost.find(t => t.title === item.title),
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
      getItemLayout={(item, index) => ({
        index,
        length: 433,
        offset: 433 * index,
      })}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      contentContainerStyle={{gap: 24, paddingVertical: 12, flexGrow: 1}}
    />
  );
};

export {HomeScreen};
