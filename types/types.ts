export type POST = {
    id: string | number;
    postImage: string;
    caption: string;
    likes: number;
    comments: {user: string; text: string}[];
  };
  
  export type STATE = {
    post: POST[];
  };