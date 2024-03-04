import React, {useRef, useState} from 'react';
import {View, Image, ScrollView, Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const PostSlider = ({images}) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.floor(offsetX / screenWidth);
    setCurrentPage(page);
  };

  //   const handleSwipe = direction => {
  //     let nextPage = currentPage;

  //     if (direction === 'right' && currentPage < images.length - 1) {
  //       nextPage += 1;
  //     } else if (direction === 'left' && currentPage > 0) {
  //       nextPage -= 1;
  //     }

  //     scrollViewRef.current.scrollTo({
  //       x: nextPage * screenWidth,
  //       animated: true,
  //     });
  //     setCurrentPage(nextPage);
  //   };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.map((image, index) => {
          return (
            <Image key={index} source={{uri: image}} style={styles.image} />
          );
        })}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {opacity: index === currentPage ? 1 : 0.5},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: 350,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'white',
  },
});

export default PostSlider;
