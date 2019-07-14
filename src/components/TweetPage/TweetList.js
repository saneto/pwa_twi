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
}) => (
	<div className="root_listTweet">
		{tweets.map(tweet => (
			<TweetItem
			authUser={authUser}
			key={tweet.uid}
			tweet={tweet}
			onReTweet ={onReTweet}
			onaddFavorite={onaddFavorite}
			onReplyTweet={onReplyTweet}
			onEditTweet={onEditTweet}
			onRemoveTweet={onRemoveTweet}
			/>
		)).reverse()}
	</div>
);

export default TweetList;
