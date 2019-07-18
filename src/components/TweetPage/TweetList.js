import React from 'react';

import TweetItem from './TweetItem';

const TweetList = ({
	authUser,
	tweets,
	onReTweet ,
	onaddFavorite,
	onReplyTweet,
	onEditTweet,
	onRemoveTweet,
	onFollow,
	follow,
}) => (
	<div className="root_listTweet">
		{tweets.map(tweet => (
			<TweetItem 	key={tweet.uid}
						authUser={authUser}
						tweet={tweet}
						onReTweet ={onReTweet}
						onaddFavorite={onaddFavorite}
						onReplyTweet={onReplyTweet}
						onEditTweet={onEditTweet}
						onRemoveTweet={onRemoveTweet}
						onFollow = {onFollow}
						follow = {follow}
			/>
		)).reverse()}
	</div>
);

export default TweetList;
