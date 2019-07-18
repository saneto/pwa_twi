import React, { Component } from 'react';
import moment from 'moment';

class TweetItem extends Component {
	constructor(props) {
		super(props);
		let followState = true;
		if (this.props.follow.filter(rt => rt === this.props.tweet.userId).length === 0 )
        {   
			followState = false;
        }
		this.state = {
			pressFavorite: false,
			pressRetweet: false,
			editMode: false,
			name : this.props.name,
			editText: this.props.tweet.text,
			followTexte : (followState) ?   "Unfollow"  : "Follow",
			followState : followState
		};
	}

	onPressRetweet =() => {
		this.props.onReTweet(this.props.tweet, this.props.authUser);
		this.setState({
		  pressRetweet: true
		})
	}

	onReplyTweet =() => {
		this.props.onReplyTweet(this.props.tweet.username);
	}

	 
	onPressFavorite =() => {
		this.props.onaddFavorite(this.props.tweet, this.props.authUser);
		this.setState({
			pressFavorite: true
		})
	}

	onChangeEditText = event => {
		this.setState({ editText: event.target.value });
	  };

	onSaveEditText = () => {
		this.props.onEditTweet(this.props.tweet);
		this.setState({ editMode: false });
	   };
	   
	onToggleEditMode = () => {
		this.setState(state => ({
			editMode: !state.editMode,
			editText: this.props.tweet.text,
		}));
	};
	
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

	toto = ()=>{
		console.log("j'ai reussi");
	}


	render() {
		const {  tweet, onRemoveTweet} = this.props;
		const { editMode } = this.state;
		const dateFormat = moment(tweet.createdAt).fromNow();
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
					<div className="icon_reply" onClick={this.onReplyTweet} >
						<span className='fa fa-reply'>  Reply</span>
					</div>
					<div className="rtGreen space" onClick={this.onPressRetweet} >
						<span className='fa fa-retweet'></span>
						<span className="number">{tweet.retweets}   Retweet</span>
					</div>
					<div className="favYellow space" onClick={this.onPressFavorite} >
						<span className='fa fa-star'></span>
						<span className="number">{tweet.like}   Like</span>
					</div>
				{/*	{editMode ? (
						<div className="space">
							<div className="space" onClick={this.onSaveEditText} >
								<span className='fa fa-save'></span>
								<span className="number">  Save</span>
							</div>
							<div className="space" onClick={this.onToggleEditMode} >
								<span className='fa fa-empty-set'></span>
								<span className="number">   Reset</span>
							</div>
						</div>

					) : (
						<div className="space" onClick={this.onToggleEditMode} >
							<span className='fa fa-edit'></span>
							<span className="number">  Edit</span>
						</div>
					)}*/}

					{!editMode && (
						<div className=" space" onClick={() => onRemoveTweet(tweet.tid)} >
							<span className='fas fa-eraser'></span>
							<span className="number">  Delete</span>
						</div>
					)}				
				</div>
			</div>
		);
	}
}

export default TweetItem;
