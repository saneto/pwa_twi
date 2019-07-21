import React from 'react';

import TweetItem from './TweetItem';

const TweetList = ({
	authUser,
	tweets,
	onReTweet ,
	onaddFavorite,
	onReplyTweet,
	onRemoveTweet,
	onComment,
	onFollow,
	follow,
	name,
}) => (
	<div className="root_listTweet">
		{tweets.map(tweet => (
			<TweetItem 	key={tweet.tid}
						authUser={authUser}
						tweet={tweet}
						name = {name}
						onReTweet ={onReTweet}
						onaddFavorite={onaddFavorite}
						onReplyTweet={onReplyTweet}
						onRemoveTweet={onRemoveTweet}
						onFollow = {onFollow}
						follow = {follow}
						onComment= {onComment}
			/>
		)).reverse()}
	</div>
);

export default TweetList;
