(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,n){e.exports=n(54)},40:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(30),i=n.n(o),s=(n(40),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function l(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var u=n(4),c=n(15),m="/home",h=r.a.createContext(null),d=function(e){return function(t){return r.a.createElement(h.Consumer,null,function(n){return r.a.createElement(e,Object.assign({},t,{firebase:n}))})}},p=h,f=n(6),b=n(5),g=n(20),E=n.n(g),v=(n(43),n(45),{apiKey:"AIzaSyAe7hufjDHedAdKMIeT_MhjN_Oc1X34HoA",authDomain:"superp2-8a0d2.firebaseapp.com",databaseURL:"https://superp2-8a0d2.firebaseio.com",projectId:"superp2-8a0d2",storageBucket:"",messagingSenderId:"499719922525",appId:"1:499719922525:web:cf330b8bb5ce987b"}),w=function e(){var t=this;Object(b.a)(this,e),this.doCreateUserWithEmailAndPassword=function(e,n){return t.auth.createUserWithEmailAndPassword(e,n)},this.doSignInWithEmailAndPassword=function(e,n){return t.auth.signInWithEmailAndPassword(e,n)},this.doSignOut=function(){return t.auth.signOut()},this.doPasswordReset=function(e){return t.auth.sendPasswordResetEmail(e)},this.doPasswordUpdate=function(e){return t.auth.currentUser.updatePassword(e)},this.onAuthUserListener=function(e,n){return t.auth.onAuthStateChanged(function(a){a?(console.log(a),t.user(a.uid).once("value").then(function(n){var r=n.val();console.log(t.db),console.log(t.auth),console.log(n),console.log(r),a=Object(f.a)({uid:a.uid,email:a.email,emailVerified:a.emailVerified,providerData:a.providerData},r),e(a)})):n()})},this.user=function(e){return t.db.ref("users/".concat(e))},this.users=function(){return t.db.ref("users")},this.message=function(e){return t.db.ref("messages/".concat(e))},this.messages=function(){return t.db.ref("messages")},E.a.initializeApp(v),this.auth=E.a.auth(),this.db=E.a.database()},O=d(function(e){var t=e.firebase;return r.a.createElement("button",{type:"button",onClick:t.doSignOut},"Sign Out")}),j=r.a.createContext(null),y=n(7),S=n(9),C=n(8),A=n(10),k=function(e){var t=function(t){function n(e){var t;return Object(b.a)(this,n),(t=Object(S.a)(this,Object(C.a)(n).call(this,e))).state={authUser:JSON.parse(localStorage.getItem("authUser"))},console.log(t.state),t}return Object(A.a)(n,t),Object(y.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.listener=this.props.firebase.onAuthUserListener(function(t){localStorage.setItem("authUser",JSON.stringify(t)),e.setState({authUser:t})},function(){localStorage.removeItem("authUser"),e.setState({authUser:null})})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){return r.a.createElement(j.Provider,{value:this.state.authUser},r.a.createElement(e,this.props))}}]),n}(r.a.Component);return d(t)},U=n(16),P=function(e){return function(t){var n=function(n){function a(){return Object(b.a)(this,a),Object(S.a)(this,Object(C.a)(a).apply(this,arguments))}return Object(A.a)(a,n),Object(y.a)(a,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.firebase.auth.onAuthStateChanged(function(n){e(n)||t.props.history.push("/signin")})}},{key:"componentWillUnmount",value:function(){this.listener()}},{key:"render",value:function(){var n=this;return r.a.createElement(j.Consumer,null,function(a){return e(a)?r.a.createElement(t,n.props):null})}}]),a}(r.a.Component);return Object(U.a)(c.e,d)(n)}},I="ADMIN",W=function(e){var t=e.authUser;return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(u.b,{to:"/"},"Landing")),r.a.createElement("li",null,r.a.createElement(u.b,{to:m},"Home")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/account"},"Account")),!!t.roles[I]&&r.a.createElement("li",null,r.a.createElement(u.b,{to:"/admin"},"Admin")),r.a.createElement("li",null,r.a.createElement(O,null)))},D=function(){return r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(u.b,{to:"/"},"Landing")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/signin"},"Sign In")),r.a.createElement("li",null,r.a.createElement(u.b,{to:"/signup"},"Sign Up")))},x=function(){return r.a.createElement("div",null,r.a.createElement(j.Consumer,null,function(e){return e?r.a.createElement(W,{authUser:e}):r.a.createElement(D,null)}))},T=function(){return r.a.createElement("div",null)},M=n(13),N={username:"",email:"",passwordOne:"",passwordTwo:"",isAdmin:!1,error:null},R="auth/email-already-in-use",L="\n  An account with this E-Mail address already exists.\n  Try to login with this account instead. If you think the\n  account is already used from one of the social logins, try\n  to sign in with one of them. Afterward, associate your accounts\n  on your personal account page.\n",H=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(S.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=n.state,a=t.username,r=t.email,o=t.passwordOne,i=t.isAdmin,s={};i&&(s[I]=I),n.props.firebase.doCreateUserWithEmailAndPassword(r,o).then(function(e){return n.props.firebase.user(e.user.uid).set({username:a,email:r,roles:s})}).then(function(){return n.props.firebase.doSendEmailVerification()}).then(function(){n.setState(Object(f.a)({},N)),n.props.history.push(m)}).catch(function(e){e.code===R&&(e.message=L),n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(M.a)({},e.target.name,e.target.value))},n.onChangeCheckbox=function(e){n.setState(Object(M.a)({},e.target.name,e.target.checked))},n.state=Object(f.a)({},N),n}return Object(A.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.state,t=e.username,n=e.email,a=e.passwordOne,o=e.passwordTwo,i=e.isAdmin,s=e.error,l=a!==o||""===a||""===n||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"username",value:t,onChange:this.onChange,type:"text",placeholder:"Full Name"}),r.a.createElement("input",{name:"email",value:n,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("input",{name:"passwordOne",value:a,onChange:this.onChange,type:"password",placeholder:"Password"}),r.a.createElement("input",{name:"passwordTwo",value:o,onChange:this.onChange,type:"password",placeholder:"Confirm Password"}),r.a.createElement("label",null,"Admin:",r.a.createElement("input",{name:"isAdmin",type:"checkbox",checked:i,onChange:this.onChangeCheckbox})),r.a.createElement("button",{disabled:l,type:"submit"},"Sign Up"),s&&r.a.createElement("p",null,s.message))}}]),t}(a.Component),J=function(){return r.a.createElement("p",null,"Don't have an account? ",r.a.createElement(u.b,{to:"/signup"},"Sign Up"))},B=Object(U.a)(c.e,d)(H),F=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"SignUp"),r.a.createElement(B,null))},V={email:"",error:null},z=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(S.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=n.state.email;n.props.firebase.doPasswordReset(t).then(function(){n.setState(Object(f.a)({},V))}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(M.a)({},e.target.name,e.target.value))},n.state=Object(f.a)({},V),n}return Object(A.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.error,a=""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:this.state.email,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("button",{disabled:a,type:"submit"},"Reset My Password"),n&&r.a.createElement("p",null,n.message))}}]),t}(a.Component),K=function(){return r.a.createElement("p",null,r.a.createElement(u.b,{to:"/pw-forget"},"Forgot Password?"))},_=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"PasswordForget"),r.a.createElement(X,null))},X=d(z),$={email:"",password:"",error:null},q=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(S.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=n.state,a=t.email,r=t.password;n.props.firebase.doSignInWithEmailAndPassword(a,r).then(function(){n.setState(Object(f.a)({},$)),n.props.history.push(m)}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(M.a)({},e.target.name,e.target.value))},n.state=Object(f.a)({},$),n}return Object(A.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.state,t=e.email,n=e.password,a=e.error,o=""===n||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"email",value:t,onChange:this.onChange,type:"text",placeholder:"Email Address"}),r.a.createElement("input",{name:"password",value:n,onChange:this.onChange,type:"password",placeholder:"Password"}),r.a.createElement("button",{disabled:o,type:"submit"},"Sign In"),a&&r.a.createElement("p",null,a.message))}}]),t}(a.Component),G=Object(U.a)(c.e,d)(q),Q=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"SignIn"),r.a.createElement(G,null),r.a.createElement(K,null),r.a.createElement(J,null))},Y=P(function(e){return!!e})(function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home Page"),r.a.createElement("p",null,"The Home Page is accessible by every signed in user."))}),Z={passwordOne:"",passwordTwo:"",error:null},ee=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(S.a)(this,Object(C.a)(t).call(this,e))).onSubmit=function(e){var t=n.state.passwordOne;n.props.firebase.doPasswordUpdate(t).then(function(){n.setState(Object(f.a)({},Z))}).catch(function(e){n.setState({error:e})}),e.preventDefault()},n.onChange=function(e){n.setState(Object(M.a)({},e.target.name,e.target.value))},n.state=Object(f.a)({},Z),n}return Object(A.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){var e=this.state,t=e.passwordOne,n=e.passwordTwo,a=e.error,o=t!==n||""===t;return r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("input",{name:"passwordOne",value:t,onChange:this.onChange,type:"password",placeholder:"New Password"}),r.a.createElement("input",{name:"passwordTwo",value:n,onChange:this.onChange,type:"password",placeholder:"Confirm New Password"}),r.a.createElement("button",{disabled:o,type:"submit"},"Reset My Password"),a&&r.a.createElement("p",null,a.message))}}]),t}(a.Component),te=d(ee),ne=P(function(e){return!!e})(function(){return r.a.createElement(j.Consumer,null,function(e){return r.a.createElement("div",null,r.a.createElement("h1",null,"Account: ",e.email),r.a.createElement(X,null),r.a.createElement(te,null))})}),ae=function(e){function t(e){var n;return Object(b.a)(this,t),(n=Object(S.a)(this,Object(C.a)(t).call(this,e))).state={loading:!1,users:[]},n}return Object(A.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.setState({loading:!0}),this.props.firebase.users().on("value",function(t){var n=t.val(),a=Object.keys(n).map(function(e){return Object(f.a)({},n[e],{uid:e})});e.setState({users:a,loading:!1})})}},{key:"componentWillUnmount",value:function(){this.props.firebase.users().off()}},{key:"render",value:function(){var e=this.state,t=e.users,n=e.loading;return r.a.createElement("div",null,r.a.createElement("h1",null,"Admin"),n&&r.a.createElement("div",null,"Loading ..."),r.a.createElement(re,{users:t}))}}]),t}(a.Component),re=function(e){var t=e.users;return r.a.createElement("ul",null,t.map(function(e){return r.a.createElement("li",{key:e.uid},r.a.createElement("span",null,r.a.createElement("strong",null,"ID:")," ",e.uid),r.a.createElement("span",null,r.a.createElement("strong",null,"E-Mail:")," ",e.email),r.a.createElement("span",null,r.a.createElement("strong",null,"Username:")," ",e.username))}))},oe=d(ae),ie=k(function(){return r.a.createElement(u.a,null,r.a.createElement("div",null,r.a.createElement(x,null),r.a.createElement("hr",null),r.a.createElement(c.a,{exact:!0,path:"/",component:T}),r.a.createElement(c.a,{path:"/signup",component:F}),r.a.createElement(c.a,{path:"/signin",component:Q}),r.a.createElement(c.a,{path:"/pw-forget",component:_}),r.a.createElement(c.a,{path:m,component:Y}),r.a.createElement(c.a,{path:"/account",component:ne}),r.a.createElement(c.a,{path:"/admin",component:oe})))});i.a.render(r.a.createElement(p.Provider,{value:new w},r.a.createElement(ie,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");s?(function(e,t){fetch(e).then(function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):l(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):l(t,e)})}}()}},[[35,1,2]]]);
//# sourceMappingURL=main.2bf10807.chunk.js.map