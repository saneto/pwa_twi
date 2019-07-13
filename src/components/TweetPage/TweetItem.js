import React, { Component } from 'react';
import moment from 'moment';

class TweetItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pressFavorite: false,
      		pressRetweet: false
		};
	}

	onPressRetweet () {
		this.props.onRetweet()
		this.setState({
		  pressRetweet: true
		})
	   }
	 
	onPressFavorite () {
		this.props.onFavorite()
		this.setState({
			pressFavorite: true
		})
	}


	onSaveEditText = () => {
		this.props.onEditTweet(this.props.tweet, "ddsqdqsd");
	 
		this.setState({ editMode: false });
	   };


	render() {
		const { authUser, tweet} = this.props;
		const dateFormat = moment(tweet.createdAt).fromNow()
		return (
			<div className="root_Tweet_item">
				<div className="user">
					<span className="displayName"> {authUser.email}</span>
					<span className="username"> {authUser.username}</span>
          			<span className="date"> {dateFormat}</span>
					{tweet.editedAt && <span>(Edited)</span>}
				</div>
				<h3>{tweet.text}</h3>
				<div className="buttons">
					<div
						className="icon"
						onClick={this.props.onSaveEditText}
					>
						<span className='fa fa-reply'> sqdd </span>
					</div>
					<div
						className="rtGreen space"
						onClick={this.onPressRetweet}
					>
						<span className='fa fa-retweet'></span>
						<span className="number">{this.props.numRetweets}</span>
					</div>
					<div
						className="favYellow"
						onClick={this.onPressFavorite}
					>
						<span className='fa fa-star'></span>
						<span className="number">{this.props.numFavorites}</span>
					</div>
					{authUser.uid === tweet.userId && (
					<span>
					
					<span>
						<button onClick={this.onSaveEditText}>Save</button>
						<button onClick={this.onToggleEditMode}>Reset</button>
					</span>


					</span>
				)}
				</div>
			</div>
		);
	}
}

export default TweetItem;
