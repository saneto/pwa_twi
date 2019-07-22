import React, { Component } from 'react';
import moment from 'moment';
import TweetCommentCard from './TweetCommentCard';

class TweetItem extends Component {
	constructor(props) {
		super(props);
		const followState = this.props.follow.filter(rt => rt === this.props.tweet.userId).length === 0? true : false;

		this.state = {
			name : this.props.name,
			editText: this.props.tweet.text,
			followTexte : (followState) ?   "Unfollow"  : "Follow",
			followState : followState,
			commentText : ''
		};
	}

	onPressRetweet =() => {
		this.props.onReTweet('\n\n@'+this.props.tweet.username+' '+this.props.tweet.text);
	}

	onPressFavorite =() => {
		this.props.onaddFavorite(this.props.tweet, this.props.authUser);
		this.setState({
			pressFavorite: true
		})
	}

	onChangeCommentText =event=>{
		this.setState({ commentText: event.target.value });
	}

	onComment =() => {
		this.props.onComment(this.props.tweet, this.props.authUser, this.state.commentText);
	}

	
	onFollow= () => {
		let text = "Follow";
		if(!this.state.followState)
		{
			text = "Unfollow";
		}
		this.setState(state => ({
			followState: !state.followState,
			followTexte : text
		}));
		this.props.onFollow(this.props.tweet.userId, this.props.authUser);
	};

	render() {
		const {  tweet, onRemoveTweet} = this.props;
		const dateFormat = moment(tweet.createdAt).fromNow();
		const commentList = tweet.listCommentaire ? Object.values(tweet.listCommentaire):null;
		return (
			<div key={tweet.uid} className="root_Tweet_item">
				<div className="user">
					<span className="imgcontainer space"> 
						<img src={tweet.src} alt="Avatar" className="avatar" />  
					</span>  
					<span className="username space">   {tweet.username}      {this.state.name}</span>
          			<span className="date space">   {dateFormat}</span>
					{tweet.editedAt && <span>(Edited)</span>}
					<button className="signoutbutton" type="button" onClick={this.onFollow}>
						{this.state.followTexte}
					</button>
				</div>
				<h3>{tweet.text}</h3>
				<div className="buttons">
					<div className="rtGreen space" onClick={this.onPressRetweet} >
						<span className='fa fa-retweet'></span>
						<span className="number"> Retweet</span>
					</div>
					<div className="favYellow space" onClick={this.onPressFavorite} >
						<span className='fa fa-star'></span>
						<span className="number">{tweet.like}   Like</span>
					</div>

					{tweet.userId === this.props.authUser.uid? (
						<div className=" space" onClick={() => onRemoveTweet(tweet.tid)} >
							<span className='fas fa-eraser'></span>
							<span className="number">  Delete</span>
						</div>
					): ('')}				
				</div>
				<div className="stylish-input-group">
					<input type="text" className="search-bar"  
						name='text'
						value = {this.state.commentText}
						onChange={this.onChangeCommentText}
					placeholder="Comment" />
						<span className="input-comment">
							<button onClick={this.onComment} type="button"> <i className="fa fa-paper-plane-o" aria-hidden="true"></i> </button>
						</span> 
				</div>


				<div className="new_comment">
					<ul className="user_comment">	
						{commentList ?
							commentList.map((comment, key)=>(
								key>commentList.length-4? <TweetCommentCard 	key={key} 
													comment={comment} />:''
							)) :''
						}					
					</ul>
				</div>

				
			</div>
		);
	}
}

export default TweetItem;
