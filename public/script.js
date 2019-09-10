console.log("we are in the browser");


// let cookie = request.cookie["loggedin"]
// console.log(cookie)

    let loginButtonArray = document.querySelectorAll('.loginbutton')
    let registerButtonArray = document.querySelectorAll('.registerButton')
    // console.log(loginButtonArray)

    if(document.cookie){

        if(loginButtonArray.length > 0){
            loginButtonArray.forEach(loginButton =>{
                loginButton.innerHTML = `<a href="/logout" ><div class="nav_button"><box-icon name='user' type='solid' color='#ffffff' ></box-icon>Log Out</div></a>`
            })
        }

        registerButtonArray.forEach(registerButton => {
            registerButton.remove();
        })

    }
    else{

        if(loginButtonArray.length > 0){
            loginButtonArray.forEach(loginButton =>{

            loginButton.innerHTML = `<a href="/login" ><div class="nav_button"><box-icon name='user' type='solid' color='#ffffff' ></box-icon>Login</div></a>`;
        })
        }

        // let addphoto = document.querySelector('#addphoto');
        // let dashboard = document.querySelector('#dashboard');
        let navbarArray = document.querySelectorAll('.nav_left');

        if(!document.cookie){
            // addphoto.remove();
            // dashboard.remove();
            navbarArray.forEach(navbar=>{
            navbar.innerHTML=`<a className="active" href="/"><div className="nav_button">Home</div></a>
                                <a href="/gallery" ><div className="nav_button">Gallery</div></a>`
            })
        }


    }

////////////////////////////////////////////////////////////////////////////////////////
//comments fields

var textarea = document.getElementById("comment_textarea");
if(document.cookie){
    if(textarea){
        textarea.addEventListener('keydown', autosize);
        function autosize(){
          var el = this;
          setTimeout(function(){
            el.style.cssText = 'height:auto; padding:5px';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
          },0);
        }

        textarea.addEventListener("keypress", submitOnEnter);

        function submitOnEnter(event){
            if(event.which === 13){
            // alert('HELLOOOOOOO')
                // event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
                // event.target.form.submit();
            let photoId = event.target.getAttribute("photoId");
            let public_id = event.target.getAttribute("public_id")
            console.log(event.target)

             // what to do when we receive the request
            var responseHandler = function() {

                // console.log("response text", this.responseText);
                // console.log("status text", this.statusText);
                // console.log("status code", this.status);
                let response = JSON.parse(this.responseText)
                // console.log(response.comment)


                let comments_wrapper = document.querySelector('.comments_wrapper');

                let commentItem = document.createElement('div');
                commentItem.setAttribute("class","comment_box");

                let profile_pic= document.createElement('img')
                profile_pic.src='http://res.cloudinary.com/hockie2/image/upload/'+ public_id

                let comment = document.createElement('div')
                comment.setAttribute("class","comment")
                comment.innerText = response.comment;

                commentItem.append(profile_pic,comment)
                comments_wrapper.prepend(commentItem)

            }

            let inputValue = textarea.value;
            var url = `/gallery/${photoId}/` + inputValue;

            // make a new request
            var request = new XMLHttpRequest();
            // listen for the request response
            request.addEventListener("load", responseHandler);

            // ready the system by calling open, and specifying the url
            // request.open("GET", "https://swapi.co/api/people/1");
            request.open("POST", url);

            // request2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // send the request
            request.send();

            event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
            event.target.value = "";



            }

        }

    }
}

else{
    if(textarea){
        textarea.remove()
    }
}


//////////////////////////////////////////////////////////////////////////////////////

// let editbutton = document.querySelector('#edit');
// if(editbutton){
//     editbutton.addEventListener('click', function(event){
//         console.log('HEHEHEHEHEHEHEHE')
//         document.getElementById("editform").submit();
//     })
// }
//////////////////////////////////////////////////////////////////////////////////////
let deletebuttonArray = document.querySelectorAll('.delete');
if(deletebuttonArray.length > 0){

    deletebuttonArray.forEach(deletebutton => {
        deletebutton.addEventListener('click', function(event){
            var result = confirm("Are you sure to delete?");
            // console.log(result)
            // debugger;

            if(result === true){
                // console.log('HEHEHEHEHEHEHEHE')
               document.getElementById("deleteform").submit();
            }
        })
    })
}

////////////////////////////////////////////////////////////////////////////////////////

AOS.init({
  duration: 1200,
  easing: 'ease-in-out-back'
});



//////////////////////////////////////////////////////////////////////////////////////////


