export const userLoggedData = {
  userId: 1,
  userName: 'Tarun',
  userAvatar: 'https://picsum.photos/id/1047/800/1200',
  followers: 150,
  following: 100,
  shortBio: 'Adventure enthusiast | Beach lover',
  postContent: 'Having a great day at the beach!',
  postImages: [
    {
      id: 11,
      postImage: 'https://picsum.photos/id/1005/800/1200',

      caption: 'Capturing every moment',
      likes: 24,
      comments: [
        {user: 'Arun', text: 'Beautiful shot!'},
        {user: 'shejal', text: 'Love the colors.'},
      ],
    },
    {
      id: 22,
      postImage: 'https://picsum.photos/id/1036/800/1200',
      caption: 'Beautiful view',
      likes: 95,
      comments: [
        {user: 'shila', text: 'Sunset goals!'},
        {user: 'Raj', text: 'Amazing photo.'},
      ],
    },
    {
      id: 33,
      postImage: 'https://picsum.photos/id/1033/1200/1800',
      caption: 'Beautiful',
      likes: 100,
      comments: [
        {user: 'Random', text: 'Where is this?'},
      ],
    },
  ],
  comments: [
    {commentId: 1, commenterName: 'Bob', commentText: 'Beautiful view!'},
    {commentId: 2, commenterName: 'Charlie', commentText: 'Looks amazing!'},
  ],
  likes: 23,
};
