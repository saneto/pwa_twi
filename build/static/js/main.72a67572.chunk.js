(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{51:function(e,t,a){e.exports=a(82)},56:function(e,t,a){},82:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(42),o=a.n(s),i=(a(56),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function l(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var c=a(12),u=a(23),m="/home",p=r.a.createContext(null),d=function(e){return function(t){return r.a.createElement(p.Consumer,null,function(a){return r.a.createElement(e,Object.assign({},t,{firebase:a}))})}},h=p,f=a(10),b=a(4),E=a(26),g=a.n(E),v=(a(59),a(61),a(65),a(83),{apiKey:"AIzaSyAe7hufjDHedAdKMIeT_MhjN_Oc1X34HoA",authDomain:"superp2-8a0d2.firebaseapp.com",databaseURL:"https://superp2-8a0d2.firebaseio.com",projectId:"superp2-8a0d2",storageBucket:"superp2-8a0d2.appspot.com",messagingSenderId:"499719922525",appId:"1:499719922525:web:cf330b8bb5ce987b"}),w=function e(){var t=this;Object(b.a)(this,e),this.doCreateUserWithEmailAndPassword=function(e,a){return t.auth.createUserWithEmailAndPassword(e,a)},this.doSignInWithEmailAndPassword=function(e,a){return t.auth.signInWithEmailAndPassword(e,a)},this.doSignOut=function(){return t.auth.signOut()},this.doPasswordReset=function(e){return t.auth.sendPasswordResetEmail(e)},this.doPasswordUpdate=function(e){return t.auth.currentUser.updatePassword(e)},this.onAuthUserListener=function(e,a){return t.auth.onAuthStateChanged(function(n){n?t.user(n.uid).once("value").then(function(t){var a=t.val();n=Object(f.a)({uid:n.uid,email:n.email,emailVerified:n.emailVerified},a),e(n)}):a()})},this.user=function(e){return t.db.ref("users/".concat(e))},this.users=function(){return t.db.ref("users")},this.message=function(e){return t.db.ref("messages/".concat(e))},this.messages=function(){return t.db.ref("messages")},this.tweet=function(e){return t.db.ref("tweets/".concat(e))},this.tweets=function(){return t.db.ref("tweets")},this.image=function(e){return t.storage.ref("images/".concat(e))},this.images=function(){return t.storage.ref("images")},g.a.initializeApp(v),this.serverValue=g.a.database.ServerValue,this.auth=g.a.auth(),this.db=g.a.database(),this.storage=g.a.storage()},O=d(function(e){var t=e.firebase;return r.a.createElement("button",{className:"signoutbutton",type:"button",onClick:t.doSignOut},r.a.createElement("span",{className:"fa fa-sign-out"})," Sign Out")}),N=r.a.createContext(null),j=a(5),y=a(7),C=a(6),S=a(8),T=function(e){var t=function(t){function a(e){var t;return Object(b.a)(this,a),(t=Object(y.a)(this,Object(C.a)(a).call(this,e))).state={authUser:JSON.parse(localStorage.getItem("authUser"))},t}return Object(S.a)(a,t),Object(j.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.props.firebase.onAuthUserListener(function(t){localStorage.setItem("authUser",JSON.stringify(t)),e.setState({authUser:t})},function(){localStorage.removeItem("authUser"),e.setState({authUser:null})})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){return r.a.createElement(N.Provider,{value:this.state.authUser},r.a.createElement(e,this.props))}}]),a}(r.a.Component);return d(t)},x=a(21),U=function(e){return function(t){var a=function(a){function n(){return Object(b.a)(this,n),Object(y.a)(this,Object(C.a)(n).apply(this,arguments))}return Object(S.a)(n,a),Object(j.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.firebase.auth.onAuthStateChanged(function(a){e(a)||t.props.history.push("/signin")})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){var a=this;return r.a.createElement(N.Consumer,null,function(n){return e(n)?r.a.createElement(t,a.props):null})}}]),n}(r.a.Component);return Object(x.a)(u.e,d)(a)}},k=function(e){e.authUser;return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,{to:m},"Home")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/account"},"Account")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/listeAmis"},"Friend list")),r.a.createElement("li",{style:{float:"right"}},r.a.createElement(O,null)))},R=function(){return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(c.b,{to:"/signin"},"Sign In")),r.a.createElement("li",null,r.a.createElement(c.b,{to:"/signup"},"Sign Up")))},A=function(){return r.a.createElement("header",{className:"root"},r.a.createElement("h1",{className:"fa fa-twitter"},"PWA twitter"),r.a.createElement(N.Consumer,null,function(e){return e?r.a.createElement(k,{authUser:e}):r.a.createElement(R,null)}))},_=function(){return r.a.createElement(A,null)},P=a(17),M={username:"",name:"",email:"",passwordOne:"",passwordTwo:"",isAdmin:!1,error:null},F="le compte existe deja",I=" error",L=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=a.state,n=t.username,r=t.name,s=t.email,o=t.passwordOne;a.props.firebase.doCreateUserWithEmailAndPassword(s,o).then(function(e){return a.props.firebase.user(e.user.uid).set({username:n,name:r,email:s})}).then(function(){return a.props.firebase.doSendEmailVerification()}).then(function(){a.setState(Object(f.a)({},M)),a.props.history.push(m)}).catch(function(e){e.code===F&&(e.message=I),a.setState({error:e})}),e.preventDefault()},a.onChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.onChangeCheckbox=function(e){a.setState(Object(P.a)({},e.target.name,e.target.checked))},a.state=Object(f.a)({},M),a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,a=e.email,n=e.passwordOne,s=e.passwordTwo,o=e.error,i=e.name,l=n!==s||""===n||""===a||""===i||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"username"},r.a.createElement("b",null,"User Name")),r.a.createElement("input",{name:"username",value:t,onChange:this.onChange,type:"text",placeholder:"Full Name"}),r.a.createElement("label",{htmlFor:"name"},r.a.createElement("b",null,"Name")),r.a.createElement("input",{name:"name",value:i,onChange:this.onChange,type:"text",placeholder:" Name"}),r.a.createElement("label",{htmlFor:"email"},r.a.createElement("b",null,"Email Address")),r.a.createElement("input",{name:"email",value:a,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("label",{htmlFor:"passwordOne"},r.a.createElement("b",null,"Password")),r.a.createElement("input",{name:"passwordOne",value:n,onChange:this.onChange,type:"password",placeholder:"Password"}),r.a.createElement("label",{htmlFor:"passwordTwo"},r.a.createElement("b",null,"Confirm Password")),r.a.createElement("input",{name:"passwordTwo",value:s,onChange:this.onChange,type:"password",placeholder:"Confirm Password"}),r.a.createElement("button",{className:"registerbtn",disabled:l,type:"submit"},"Sign Up"),o&&r.a.createElement("p",null,o.message)))}}]),t}(n.Component),W=function(){return r.a.createElement("p",null,"Don't have an account? ",r.a.createElement(c.b,{to:"/signup"},"Sign Up"))},D=Object(x.a)(u.e,d)(L),V=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Register"),r.a.createElement(D,null))},B={email:"",error:null},J=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=a.state.email;a.props.firebase.doPasswordReset(t).then(function(){a.setState(Object(f.a)({},B))}).catch(function(e){a.setState({error:e})}),e.preventDefault()},a.onChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.state=Object(f.a)({},B),a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.error,n=""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:this.state.email,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("button",{disabled:n,type:"submit"},"Reset My Password"),a&&r.a.createElement("p",null,a.message))}}]),t}(n.Component),H=function(){return r.a.createElement("p",null,r.a.createElement(c.b,{to:"/pw-forget"},"Forgot Password?"))},z=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"PasswordForget"),r.a.createElement(K,null))},K=d(J),G={email:"",password:"",error:null},X=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=a.state,n=t.email,r=t.password;a.props.firebase.doSignInWithEmailAndPassword(n,r).then(function(){a.setState(Object(f.a)({},G)),a.props.history.push(m)}).catch(function(e){a.setState({error:e})}),e.preventDefault()},a.onChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.state=Object(f.a)({},G),a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,a=e.password,n=e.error,s=""===a||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:t,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("input",{name:"password",value:a,onChange:this.onChange,type:"password",placeholder:"Password"}),r.a.createElement("button",{className:"registerbtn",disabled:s,type:"submit"},"Sign In"),n&&r.a.createElement("p",null,n.message))}}]),t}(n.Component),Y=Object(x.a)(u.e,d)(X),$=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"SignIn"),r.a.createElement(Y,null),r.a.createElement(H,null),r.a.createElement(W,null))},q=a(30),Q=a(46),Z=a.n(Q),ee=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onPressRetweet=function(){a.props.onReTweet(a.props.tweet,a.props.authUser),a.setState({pressRetweet:!0})},a.onReplyTweet=function(){a.props.onReplyTweet(a.props.tweet.username)},a.onPressFavorite=function(){a.props.onaddFavorite(a.props.tweet,a.props.authUser),a.setState({pressFavorite:!0})},a.onChangeEditText=function(e){a.setState({editText:e.target.value})},a.onSaveEditText=function(){a.props.onEditTweet(a.props.tweet),a.setState({editMode:!1})},a.onToggleEditMode=function(){a.setState(function(e){return{editMode:!e.editMode,editText:a.props.tweet.text}})},a.state={pressFavorite:!1,pressRetweet:!1,editMode:!1,editText:a.props.tweet.text},a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.props,t=e.tweet,a=e.onRemoveTweet,n=this.state.editMode,s=Z()(t.createdAt).fromNow();return r.a.createElement("div",{className:"root_Tweet_item"},r.a.createElement("div",{className:"user"},r.a.createElement("span",{className:"imgcontainer space"},r.a.createElement("img",{src:t.src,alt:"Avatar",className:"avatar"})),r.a.createElement("span",{className:"username space"},"   ",t.username),r.a.createElement("span",{className:"date space"},"   ",s),t.editedAt&&r.a.createElement("span",null,"(Edited)")),r.a.createElement("h3",null,t.text),r.a.createElement("div",{className:"buttons"},r.a.createElement("div",{className:"icon_reply",onClick:this.onReplyTweet},r.a.createElement("span",{className:"fa fa-reply"},"  Reply")),r.a.createElement("div",{className:"rtGreen space",onClick:this.onPressRetweet},r.a.createElement("span",{className:"fa fa-retweet"}),r.a.createElement("span",{className:"number"},t.retweets,"   Retweet")),r.a.createElement("div",{className:"favYellow space",onClick:this.onPressFavorite},r.a.createElement("span",{className:"fa fa-star"}),r.a.createElement("span",{className:"number"},t.like,"   Like")),n?r.a.createElement("div",{className:"space"},r.a.createElement("div",{className:"space",onClick:this.onSaveEditText},r.a.createElement("span",{className:"fa fa-save"}),r.a.createElement("span",{className:"number"},"  Save")),r.a.createElement("div",{className:"space",onClick:this.onToggleEditMode},r.a.createElement("span",{className:"fa fa-empty-set"}),r.a.createElement("span",{className:"number"},"   Reset"))):r.a.createElement("div",{className:"space",onClick:this.onToggleEditMode},r.a.createElement("span",{className:"fa fa-edit"}),r.a.createElement("span",{className:"number"},"  Edit")),!n&&r.a.createElement("div",{className:" space",onClick:function(){return a(t.uid)}},r.a.createElement("span",{className:"fas fa-eraser"}),r.a.createElement("span",{className:"number"},"  Delete"))))}}]),t}(n.Component),te=function(e){var t=e.authUser,a=e.tweets,n=e.onReTweet,s=e.onaddFavorite,o=e.onReplyTweet,i=e.onEditTweet,l=e.onRemoveTweet;return r.a.createElement("div",{className:"root_listTweet"},a.map(function(e){return r.a.createElement(ee,{authUser:t,key:e.uid,tweet:e,onReTweet:n,onaddFavorite:s,onReplyTweet:o,onEditTweet:i,onRemoveTweet:l})}).reverse())},ae=function(e){function t(e){var a;Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onsubmit=function(e){a.props.onCreateTweet(e),a.setState({text:""})},a.onChangeText=function(e){a.setState({text:e.target.value}),a.props.onChangeText(e.target.value)};var n=a.props.userNameToReply?"@".concat(a.props.userNameToReply," "):"";return a.state={text:n,userNameToReply:"toto"},a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state,t=e.text,a=e.userNameToReply;return r.a.createElement("form",{onSubmit:this.onsubmit},r.a.createElement("textarea",{className:"tweet_text",name:"text",value:t,onChange:this.onChangeText},a?"@".concat(a," "):""),r.a.createElement("div",{className:"tweet_button"},r.a.createElement("button",{className:"tweet_close",onClick:this.props.onCloseText},"Close"),r.a.createElement("button",{className:"tweet_send",type:"submit"}," Send ")))}}]),t}(n.Component),ne=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onListenForTweets=function(){a.setState({loading:!0}),a.props.firebase.tweets().orderByChild("createdAt").limitToLast(a.state.limit).on("value",function(e){var t=e.val();if(t){var n=Object.keys(t).map(function(e){return Object(f.a)({},t[e],{uid:e})});a.setState({tweets:n,loading:!1})}else a.setState({tweets:null,loading:!1})})},a.renderTweetInput=function(){if(a.state.openText)return r.a.createElement(ae,{authUser:a.state.authUser,onChangeText:a.onChangeText,onCreateTweet:a.onCreateTweet,text:a.state.text,onCloseText:a.onCloseText,userNameToReply:a.state.userNameToReply})},a.onaddFavorite=function(e,t){0===a.state.likes.filter(function(t){return t===e.uid}).length&&(a.props.firebase.tweet(e.uid).child("listLike").push({userId:t.uid,username:t.username}),e.like++,a.props.firebase.tweet(e.uid).child("like").set(e.like),a.props.firebase.user(t.uid).child("listLike").push(e.uid),a.state.likes.push(e.uid))},a.onReTweet=function(e,t){0===a.state.retweets.filter(function(t){return t===e.uid}).length&&(e.retweets++,a.props.firebase.tweet(e.uid).child("listreTweets").push({text:a.state.text,userId:t.uid,src:t.src,username:t.username,createdAt:a.props.firebase.serverValue.TIMESTAMP,like:0,retweets:0}),a.props.firebase.tweet(e.uid).child("retweets").set(e.retweets),a.props.firebase.user(t.uid).child("listRetweet").push(e.uid),a.state.retweets.push(e.uid))},a.onCreateTweet=function(e){a.props.firebase.tweets().push({text:a.state.text,userId:a.state.authUser.uid,username:a.state.authUser.email.split("@")[0],createdAt:a.props.firebase.serverValue.TIMESTAMP,src:a.state.authUser.src,like:0,retweets:0,listreTweets:[],listFav:[]}),a.setState({text:"",openText:!1}),e.preventDefault()},a.onEditTweet=function(e,t){e.uid;var n=Object(q.a)(e,["uid"]);a.props.firebase.tweet(e.uid).set(Object(f.a)({},n,{text:t,editedAt:a.props.firebase.serverValue.TIMESTAMP}))},a.onRemoveTweet=function(e){a.props.firebase.tweet(e).remove()},a.onReplyTweet=function(e){a.setState({openText:!0,userNameToReply:e})},a.onChangeText=function(e){a.setState({text:e})},a.onOpenText=function(e){e.preventDefault(),a.setState({openText:!0})},a.state={text:"",loading:!1,tweets:[],limit:15,openText:!1,userNameToReply:"",isReply:!1,retweets:a.props.authUser.listRetweet?Object.values(a.props.authUser.listRetweet):[],likes:a.props.authUser.listLike?Object.values(a.props.authUser.listLike):[],authUser:a.props.authUser},console.log(a.state),a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"componentDidMount",value:function(){this.onListenForTweets()}},{key:"componentWillUnmount",value:function(){this.props.firebase.tweets().off()}},{key:"render",value:function(){var e=this.state,t=e.tweets,a=e.loading,n=e.authUser;return r.a.createElement("div",null,a&&r.a.createElement("div",null,"Loading ..."),r.a.createElement("button",{onClick:this.onOpenText,className:"open_button_tweet"},r.a.createElement("span",{className:"fa fa-lg fa-edit"})," Tweet!"),this.renderTweetInput(),t&&r.a.createElement(te,{authUser:n,tweets:t,onEditTweet:this.onEditTweet,onRemoveTweet:this.onRemoveTweet,onReTweet:this.onReTweet,onaddFavorite:this.onaddFavorite,onReplyTweet:this.onReplyTweet}),!t&&r.a.createElement("div",null,"Aucun tweet trouver ..."))}}]),t}(n.Component),re=d(ne),se=a(93),oe=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).changeColor=function(e){},a.state={users:[],user:e.authUser},a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),this.props.firebase.users().on("value",function(t){var a=t.val(),n=Object.keys(a).map(function(e){return Object(f.a)({},a[e],{uid:e})});e.setState({users:n,loading:!1})})}},{key:"componentWillUnmount",value:function(){this.props.firebase.users().off()}},{key:"render",value:function(){var e=this,t=this.state.users;return r.a.createElement("div",{className:"inbox_people"},r.a.createElement("div",{className:"headind_srch"},r.a.createElement("div",{className:"recent_heading"},r.a.createElement("h4",null,"Recent")),r.a.createElement("div",{className:"srch_bar"},r.a.createElement("div",{className:"stylish-input-group"},r.a.createElement("input",{type:"text",className:"search-bar",placeholder:"Search"}),r.a.createElement("span",{className:"input-group-addon"},r.a.createElement("button",{type:"button"}," ",r.a.createElement("i",{className:"fa fa-search","aria-hidden":"true"})," "))))),r.a.createElement("div",{className:"inbox_chat"},t.map(function(t){return r.a.createElement("div",{key:t.uid,onClick:function(){return e.changeColor(t.uid)},className:"chat_list"},r.a.createElement("div",{className:"chat_people"},r.a.createElement("div",{className:"chat_img"}," ",r.a.createElement("img",{className:"avatar",src:t.src,alt:"sunil"})," "),r.a.createElement("div",{className:"chat_ib"},r.a.createElement("h5",null,t.username," ",r.a.createElement("span",{className:"chat_date"}," ")))))})))}}]),t}(n.Component),ie=d(oe),le=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onSendPasswordResetEmail=function(){a.props.firebase.doPasswordReset(a.state.user.email)},a.state={user:a.props},a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=(this.state||[]).user,t=e.listPhoto;void 0===t&&(t=[]);var a="/user/"+e.username;return r.a.createElement("div",{className:"card"},r.a.createElement(c.b,{to:"/account"},r.a.createElement("img",{src:e.src,alt:"singe",style:{width:"100%"}})),r.a.createElement("h1",null,r.a.createElement(c.b,{to:a},e.name)),r.a.createElement("p",{className:"title"},r.a.createElement(c.b,{to:a},"@",e.username)),r.a.createElement("p",null,e.bio),r.a.createElement(se.a,{container:!0},t.map(function(e){return r.a.createElement(se.a,{item:!0,xs:4,key:e.url},r.a.createElement("img",{src:e.url,alt:"User_card_P",className:"user_card_P"}))})))}}]),t}(n.Component),ce=d(le),ue=Object(x.a)(U(function(e){return!!e}))(function(){return r.a.createElement("div",null,r.a.createElement(N.Consumer,null,function(e){return r.a.createElement(se.a,{container:!0},r.a.createElement(se.a,{item:!0,xs:3},r.a.createElement(ce,e)),r.a.createElement(se.a,{item:!0,xs:9},r.a.createElement(re,{authUser:e})))}))}),me=a(47),pe=a.n(me),de=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).handleChangeUsername=function(e){return a.setState({username:e.target.value})},a.handleUploadStart=function(){return a.setState({isUploading:!0,progress:0})},a.handleProgress=function(e){return a.setState({progress:e})},a.handleUploadError=function(e){a.setState({isUploading:!1})},a.handleUploadSuccess=function(e){a.setState({avatar:e,progress:100,isUploading:!1}),a.props.firebase.image(a.state.user.uid+"/"+e).getDownloadURL().then(function(e){var t=a.state.user;a.props.firebase.user(t.uid).child("listPhoto").push({url:e}),a.props.firebase.user(t.uid).update({src:e}),a.setState({avatarURL:e})})},a.onChange=function(e){a.setState(Object(P.a)({},e.target.name,e.target.value))},a.onSubmit=function(e){var t=a.state,n=t.username,r=t.name,s=t.email,o=t.bio,i=a.state.user;i.username=n,i.name=r,i.email=s,i.bio=o,a.props.firebase.user(a.state.user.uid).set(Object(f.a)({},a.state.user)).then(function(){a.setState({user:i})}),e.preventDefault()},a.state={text:"",loading:!1,messages:[],limit:5,user:e.authUser,avatarURL:e.authUser.src,name:e.authUser.name,username:e.authUser.username,email:e.authUser.email,bio:e.authUser.bio},console.log(a.state.user),a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){var e=this.state.user;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("div",{className:"imgcontainer"},r.a.createElement("img",{src:this.state.avatarURL,alt:"Avatar",className:"avatar_cardVersion"})),r.a.createElement("div",{className:"container"},r.a.createElement("label",{htmlFor:"username"},r.a.createElement("b",null,"UserName")),r.a.createElement("input",{name:"username",value:this.state.username,onChange:this.onChange,type:"text",placeholder:"Full Name"}),r.a.createElement("label",{htmlFor:"name"},r.a.createElement("b",null,"Name")),r.a.createElement("input",{name:"name",value:this.state.name,onChange:this.onChange,type:"text",placeholder:" Name"}),r.a.createElement("label",{htmlFor:"email"},r.a.createElement("b",null,"Email Address")),r.a.createElement("input",{name:"email",value:this.state.email,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("label",{htmlFor:"bio"},r.a.createElement("b",null,"bio")),r.a.createElement("textarea",{name:"bio",value:this.state.bio,onChange:this.onChange}),r.a.createElement("label",{className:"registerbtn",style:{backgroundColor:"steelblue",color:"white",pointer:"cursor"}},"Select your awesome avatar",r.a.createElement(pe.a,{hidden:!0,accept:"image/*",storageRef:this.props.firebase.image(e.uid),onUploadStart:this.handleUploadStart,onUploadError:this.handleUploadError,onUploadSuccess:this.handleUploadSuccess,onProgress:this.handleProgress})),r.a.createElement("button",{className:"registerbtn",type:"submit"},"Valider")))}}]),t}(n.Component),he=d(de),fe=U(function(e){return!!e})(function(){return r.a.createElement(N.Consumer,null,function(e){return r.a.createElement(he,{authUser:e})})}),be=(n.Component,function(e){e.authUser,e.messages,e.onEditMessage,e.onRemoveMessage;return r.a.createElement("div",{className:"mesgs"},r.a.createElement("div",{className:"msg_history"},r.a.createElement("div",{className:"incoming_msg"},r.a.createElement("div",{className:"incoming_msg_img"},r.a.createElement("img",{className:"avatar",src:"https://ptetutorials.com/images/user-profile.png",alt:"sunil"})),r.a.createElement("div",{className:"received_msg"},r.a.createElement("div",{className:"received_withd_msg"},r.a.createElement("p",null,"Test which is a new approach to have all solutions"),r.a.createElement("span",{className:"time_date"}," 11:01 AM    |    June 9")))),r.a.createElement("div",{className:"incoming_msg"},r.a.createElement("div",{className:"sent_msg"},r.a.createElement("p",null,"Apollo University, Delhi, India Test"),r.a.createElement("span",{className:"time_date"},"11:01 AM    |    Today")))),r.a.createElement("div",{className:"type_msg"},r.a.createElement("div",{className:"input_msg_write"},r.a.createElement("input",{type:"text",className:"write_msg",placeholder:"Type a message"}),r.a.createElement("button",{className:"msg_send_btn",type:"button"},r.a.createElement("i",{className:"fa fa-paper-plane-o","aria-hidden":"true"})))))}),Ee=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(y.a)(this,Object(C.a)(t).call(this,e))).onListenForMessages=function(){a.setState({loading:!0}),a.props.firebase.messages().orderByChild("createdAt").limitToLast(a.state.limit).on("value",function(e){var t=e.val();if(t){var n=Object.keys(t).map(function(e){return Object(f.a)({},t[e],{uid:e})});a.setState({messages:n,loading:!1})}else a.setState({messages:null,loading:!1})})},a.onChangeText=function(e){a.setState({text:e.target.value})},a.onCreateMessage=function(e,t){a.props.firebase.messages().push({text:a.state.text,userId:t.uid,createdAt:a.props.firebase.serverValue.TIMESTAMP}),a.setState({text:""}),e.preventDefault()},a.onEditMessage=function(e,t){e.uid;var n=Object(q.a)(e,["uid"]);a.props.firebase.message(e.uid).set(Object(f.a)({},n,{text:t,editedAt:a.props.firebase.serverValue.TIMESTAMP}))},a.onRemoveMessage=function(e){a.props.firebase.message(e).remove()},a.onNextPage=function(){a.setState(function(e){return{limit:e.limit+5}},a.onListenForMessages)},a.state={text:"",loading:!1,messages:[],limit:5},a}return Object(S.a)(t,e),Object(j.a)(t,[{key:"componentDidMount",value:function(){this.onListenForMessages()}},{key:"componentWillUnmount",value:function(){this.props.firebase.messages().off()}},{key:"render",value:function(){var e=this,t=this.state,a=t.text,n=t.messages,s=t.loading;return r.a.createElement(N.Consumer,null,function(t){return r.a.createElement("div",null,!s&&n&&r.a.createElement("button",{type:"button",onClick:e.onNextPage},"More"),s&&r.a.createElement("div",null,"Loading ..."),n&&r.a.createElement(be,{authUser:t,messages:n,onEditMessage:e.onEditMessage,onRemoveMessage:e.onRemoveMessage}),!n&&r.a.createElement("div",null,"There are no messages ..."),r.a.createElement("form",{onSubmit:function(a){return e.onCreateMessage(a,t)}},r.a.createElement("input",{type:"text",value:a,onChange:e.onChangeText}),r.a.createElement("button",{type:"submit"},"Send")))})}}]),t}(n.Component),ge=(d(Ee),function(e){function t(e){return Object(b.a)(this,t),Object(y.a)(this,Object(C.a)(t).call(this,e))}return Object(S.a)(t,e),Object(j.a)(t,[{key:"render",value:function(){return r.a.createElement(N.Consumer,null,function(e){return r.a.createElement("div",{className:"messaging"},r.a.createElement("div",{className:"inbox_msg"},r.a.createElement(ie,{authUser:e}),r.a.createElement(be,{authUser:e})))})}}]),t}(n.Component)),ve=U(function(e){return!!e})(ge),we=function(){return r.a.createElement($,null)},Oe=T(function(){return r.a.createElement(c.a,null,r.a.createElement("div",null,r.a.createElement(_,null),r.a.createElement("hr",null),r.a.createElement("div",{className:"container"},r.a.createElement(u.a,{exact:!0,path:"/",component:we}),r.a.createElement(u.a,{path:m,component:ue}),r.a.createElement(u.a,{path:"/signup",component:V}),r.a.createElement(u.a,{path:"/signin",component:$}),r.a.createElement(u.a,{path:"/listeAmis",component:ve}),r.a.createElement(u.a,{path:"/pw-forget",component:z}),r.a.createElement(u.a,{path:"/account",component:fe}))))}),Ne=a(48),je=a.n(Ne);o.a.render(r.a.createElement(je.a,null,r.a.createElement(h.Provider,{value:new w},r.a.createElement(Oe,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");i?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):l(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}}()}},[[51,1,2]]]);
//# sourceMappingURL=main.72a67572.chunk.js.map