document.addEventListener('DOMContentLoaded', function() {
  let prevScrollPos = window.scrollY;

  window.addEventListener('scroll', function() {
    const currentScrollPos = window.scrollY;

    const navbar = document.querySelector('.navbar');
    
    if (navbar) { 
      if (prevScrollPos > currentScrollPos) {
        navbar.classList.add('nav-bar');
      } else {
        navbar.classList.remove('nav-bar');
      }
    }

    prevScrollPos = currentScrollPos;
  });
});




const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});

const sidemenu=document.getElementById("side-menu");

function openmenu(){
  sidemenu.style.right="0";
}

function closemenu(){
  sidemenu.style.right="-180px";
}