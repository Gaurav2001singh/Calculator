let container = document.querySelector(".container");
let div = document.querySelectorAll(".row");
let input = document.querySelector("input");

let string = "";
let buttons = document.querySelectorAll(".button");
Array.from(buttons).forEach((button) => {
    
    button.addEventListener("click",(evt) => {
        if(evt.target.innerHTML == "="){
            string = eval(string);
            
            input.value = string

        }else if(evt.target.innerHTML == "C"){
            string = "";
            input.value = string
        }
        else{
            // console.log(evt.target);
            string = string + evt.target.innerHTML;
            input.value = string;
        }
    })
})


