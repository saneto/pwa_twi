import React from 'react';

import TweetItem from './TweetItem';

const TweetList = ({
  authUser,
  tweets,
  onEditTweet,
  onRemoveTweet,
}) => (
  <ul>
    {tweets.map(tweet => (
      <TweetItem
        authUser={authUser}
        key={tweet.uid}
        tweet={tweet}
        onEditTweet={onEditTweet}
        onRemoveTweet={onRemoveTweet}
      />
    ))}
  </ul>
);

export default TweetList;
