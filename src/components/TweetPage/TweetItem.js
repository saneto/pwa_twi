import React, { Component } from 'react';
import moment from 'moment';

class TweetItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pressFavorite: false,
			pressRetweet: false,
			editMode: false,
			editText: this.props.tweet.text,
		};
	}

	onPressRetweet =() => {
		this.props.onReTweet(this.props.tweet);
		this.setState({
		  pressRetweet: true
		})
	}

	onReplyTweet =() => {
		this.props.onReplyTweet(this.props.tweet.username);
	}

	 
	onPressFavorite =() => {
		this.props.onaddFavorite(this.props.tweet);
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

	render() {
		const {  tweet, onRemoveTweet} = this.props;
		const { editMode } = this.state;
		const dateFormat = moment(tweet.createdAt).fromNow()
		return (
			<div className="root_Tweet_item">
				<div className="user">
					<span className="username"> {tweet.username}</span>
          			<span className="date"> {dateFormat}</span>
					{tweet.editedAt && <span>(Edited)</span>}
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
					{editMode ? (
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
					)}

					{!editMode && (
						<div className=" space" onClick={() => onRemoveTweet(tweet.uid)} >
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
