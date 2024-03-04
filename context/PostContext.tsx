import {ReactNode, createContext, useContext, useReducer} from 'react';
import {userLoggedData} from '../DB/MockUserLoggedData';
import {STATE} from '../types/types';

interface PostsContextValue {
  state: STATE;
  dispatch: any;
}

export const PostsContext = createContext<PostsContextValue | undefined>(
  undefined,
);

const initialState: STATE = {
  post: userLoggedData.postImages,
};

const postsReducer = (state: STATE, action: any) => {
  console.log(action.payload);

  switch (action.type) {
    case 'ADD_POST': {
      return {post: state.post.concat(action.payload)};
    }
    case 'EDIT_POST': {
      const Post = state.post.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
      return {post: Post};
    }
    case 'DELETE_POST': {
      console.log(state.post);

      return {post: state.post.filter(post => post.id !== action.payload)};
    }
  }
};

interface PostsProviderProps {
  children: ReactNode;
}
export const PostsProvider: React.FC<PostsProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  return (
    <PostsContext.Provider value={{state, dispatch}}>
      {children}
    </PostsContext.Provider>
  );
};

const usePostContext = () => {
  return useContext(PostsContext);
};

export {usePostContext};
