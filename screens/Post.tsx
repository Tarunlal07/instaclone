import {
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from 'react-native';
import React, { useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import PostHeader from '../components/PostHeader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-regular-svg-icons/faHeart';
import {faComment} from '@fortawesome/free-regular-svg-icons/faComment';
import { usePostContext} from '../context/PostContext';
import CustomBottomModal from '../components/CustomBottomModal';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons/faPenToSquare';
import { POST } from '../types/types';

const Post = () => {
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const {
    state: {post},
    dispatch,
  } = usePostContext();
  const [allPost, setAllPost] = useState<any>(post);
  const [postSelectId, setSelectPostId] = useState();
  const [editPost, setEditPost] = useState<POST>();
  const {postId, user} = route.params;
  const [editedCaption, setEditedCaption] = useState('');

  const initialIndex = post?.findIndex(p => p.id === postId);

  useEffect(() => {
    setAllPost(post);
    return () => {
      setEditPost(null);
      setSelectPostId('');
    };
  }, [post, dispatch]);

  const deletePostHandler = () => {
    dispatch({type: 'DELETE_POST', payload: postSelectId});
    setModalVisible(false);
  };

  const editPostHandler = () => {
    setEditModalVisible(true);
    const selectedPost = post.filter(item => item.id === postSelectId);
    selectedPost.length && setEditPost(selectedPost[0]);
    setEditedCaption(selectedPost[0].caption);
    setModalVisible(false);
  };

  const saveEditedPostHandler = () => {
    const editedPost = {
      ...editPost,
      caption: editedCaption,
    };
    dispatch({type: 'EDIT_POST', payload: editedPost});
    setEditModalVisible(false);
  };

  const renderItems = ({item}) => {
    const renderComments = ({item}) => {
      return (
        <View style={styles.commentBox}>
          <Text style={styles.commentAuthor}>{item.user}</Text>
          <Text style={styles.comment}>{item.text}</Text>
        </View>
      );
    };

    const viewCommentsHandler = (postId: string) => {
      const editPostInfo = post.map(post => {
        if (post.id === postId)
          return {
            ...post,
            showComments: true,
          };
        return {
          ...post,
          showComments: post.showComments ? post.showComments : false,
        };
      });
      setAllPost(editPostInfo);
    };

    const postOptionhandler = postId => {
      setModalVisible(true);
      setSelectPostId(postId);
    };

    return (
      <View style={styles.postContainer}>
        <PostHeader
          postAvatar={user.userAvatar}
          postUser={user}
          postOptionHandler={() => postOptionhandler(item.id)}
        />
        <Image source={{uri: item?.postImage}} style={styles.image} />
        <View style={styles.postFooterContainer}>
          <View style={styles.postFooter}>
            <FontAwesomeIcon
              icon={faHeart}
              style={{marginRight: 8}}
              size={20}
              color="gray"
            />
            <FontAwesomeIcon
              icon={faComment}
              style={{marginRight: 8}}
              size={20}
              color="gray"
            />
          </View>
          <View>
            <Text style={{fontSize: 11, paddingVertical: 4}}>
              Liked by{' '}
              <Text style={{fontWeight: '500'}}>{item.likes} peoples</Text>
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 11, fontWeight: '600'}}>
                {user.userName}
              </Text>
              <Text style={{fontSize: 11}}> {item.caption}</Text>
            </View>
            {item.comments.length > 1 && !item.showComments ? (
              <TouchableOpacity onPress={() => viewCommentsHandler(item.id)}>
                <Text style={{fontSize: 11, color: 'gray'}}>
                  View all comments
                </Text>
              </TouchableOpacity>
            ) : (
              <FlatList
                data={item.comments}
                renderItem={renderComments}
                style={styles.commentContainer}
              />
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={allPost}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        initialScrollIndex={initialIndex > 0 ? initialIndex : null}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        getItemLayout={(data, index) => ({
          length: 320 /* your item height */,
          offset: /* your item height * index */ 320 * index,
          index,
        })}
      />
      <CustomBottomModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}>
        <TouchableOpacity
          style={styles.modalOptions}
          onPress={deletePostHandler}>
          <Text style={{fontSize: 22, color: 'red', paddingRight: 8}}>
            Delete
          </Text>
          <FontAwesomeIcon icon={faTrash} color="red" size={15} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOptions} onPress={editPostHandler}>
          <Text style={{fontSize: 22, paddingRight: 8}}>Edit</Text>
          <FontAwesomeIcon icon={faPenToSquare} size={15} />
        </TouchableOpacity>
      </CustomBottomModal>
      <Modal visible={isEditModalVisible} style={styles.editModalStyle}>
        <View style={styles.editModalContainer}>
          <Image
            source={{uri: editPost?.postImage}}
            style={styles.previewImage}
          />
          {/* <TextInput
            style={styles.inputStyle}
            placeholder="Change Caption"
            defaultValue={editPost?.caption}
            value={editedCaption}
            onChangeText={e => setEditedCaption(e)}
          /> */}
          <TextInput
            style={styles.inputStyle}
            placeholder="Change Caption"
            defaultValue={editPost?.caption}
            value={editedCaption}
            onChangeText={text => setEditedCaption(text)}
          />

          <View style={styles.editModalBtnContainer}>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={[styles.btnClose]}>
              <Text style={{color: 'red'}}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={saveEditedPostHandler}
              style={[styles.btnSave]}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {paddingVertical: 6, backgroundColor: 'white'},
  image: {
    flex: 1,
    height: 320,
  },
  postFooterContainer: {
    padding: 6,
  },
  postFooter: {
    flexDirection: 'row',
  },
  commentContainer: {
    paddingVertical: 3,
  },
  commentBox: {
    flexDirection: 'row',
    paddingTop: 0.5,
  },
  commentAuthor: {
    fontWeight: '500',
    fontSize: 11,
  },
  comment: {
    fontSize: 11,
    paddingLeft: 3,
  },
  modalOptions: {
    flex: 1,
    borderRadius: 10,
    margin: 2,
    borderColor: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    flexDirection: 'row',
  },
  inputStyle: {
    width: 300,
    color: 'black',
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 0.2,
    paddingHorizontal: 10,
  },
  previewImage: {
    width: 300,
    height: 300,
  },
  btnClose: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    padding: 8,
    maxWidth: 150,
    alignItems: 'center',
  },
  btnSave: {
    flex: 1,
    borderColor: 'green',
    backgroundColor: 'green',
    padding: 8,
    maxWidth: 150,
    alignItems: 'center',
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
