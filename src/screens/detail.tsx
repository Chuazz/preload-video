import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Video, {OnLoadData, ReactVideoProps, VideoRef} from 'react-native-video';
import {Post} from '../data/post/data';

const DetailScreen = ({route}: NativeStackScreenProps<any>) => {
  const {post} = (route.params || {}) as {post: Post};
  const [meta, setMeta] = useState<OnLoadData>();
  const [end, setEnd] = useState(false);
  const ref = useRef<VideoRef>(null);

  const aspectRatio = useMemo(() => {
    if (meta?.naturalSize?.width && meta.naturalSize.height) {
      return meta?.naturalSize?.width / meta.naturalSize.height;
    }

    return undefined;
  }, [meta?.naturalSize.height, meta?.naturalSize?.width]);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={{padding: 12}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: 'black',
          }}>
          {post.title} -{' '}
          <Text style={{color: 'gray', fontWeight: 'normal', fontSize: 14}}>
            {post.subtitle}
          </Text>
        </Text>

        <Text style={{lineHeight: 20, paddingTop: 8, color: 'black'}}>
          {post.description}
        </Text>
      </View>

      <Video
        ref={ref}
        source={{uri: post.preload}}
        style={{
          width: '100%',
          height: aspectRatio ? undefined : 300,
          aspectRatio,
        }}
        onEnd={() => {
          setEnd(true);
        }}
        resizeMode="cover"
        controls={true}
        onLoad={e => {
          setMeta(e);
        }}
      />
    </ScrollView>
  );
};

export {DetailScreen};
