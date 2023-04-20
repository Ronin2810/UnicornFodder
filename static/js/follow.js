const followbtn = document.getElementById('followbtn')

followbtn.addEventListener('click',()=>{
    // console.log(followbtn);
    if (followbtn.value==="Unfollow") {
        followbtn.value= "Follow"
    }
    else{
        followbtn.value= "Unfollow"
    }
})