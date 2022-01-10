let search = document.getElementById("search");
let uidInput = document.getElementById("uid");
let img = document.getElementById("profile-image")
let name = document.getElementById("name");
let username = document.getElementById("username");
let bio = document.getElementById("bio");
let following = document.querySelector(".following");
let followers = document.querySelector(".followers");

//postman => API call
//axios
//fetch

search.addEventListener("click" , function(){
    let uid = uidInput.value;
    if(uid){
        axios.get(`/api/user/${uid}`).then(function(obj){
            let user = obj.data.user;
            img.src = user.profilePic;
            name.innerHTML = user.name;
            username.innerHTML = user.username;
            bio.innerHTML = user.bio;

            let followingPromise = axios.get(`/api/request/following/${uid}`);
            return followingPromise;
        }).then(function(obj){
            let followingLength = obj.data.myFollowing.length;
            following.innerHTML = `Following ${followingLength}`;

            let followerPromise = axios.get(`/api/request/follower/${uid}`);
            return followerPromise;
        }).then(function(obj){
            let followersLength = obj.data.myFollowers.length;
            followers.innerHTML = `Followers ${followersLength}`;
        })
    }
});