
// To Handel the navbar reaction after scrolled

console.log('hii');


$(window).scroll(function () {
  $('nav').toggleClass('red', $(this).scrollTop() > 20);
});


// this script for successful implementation of typed.js and create typewriter

// var typed = new Typed(".text-slider-items", {
//   strings: [
//     "Developer",
//     "Designer",
//     "Blogger",
//     "Freelancer"
//   ],

//   typeSpeed: 50,                                                
//   loop: true,
//   backDelay: 900,
//   backSpeed: 30,
// });

















// $(document).ready(function(){
//   $(window).scroll(function(){
//     if(this.scrollY > 200){
//       $('.navbar').addClass('.red');
//     }else{
//       $('.navbar').removeClass('.red');
//     }
//   })
// })

// Typing Animation text 
// import Typed from 'typed.js'; 
// var typed = new Typed("#typed", {
//   strings: [
//     "Developer",
//     "Designer",
//     "Blogger",
//     "Freelancer"
//   ],
//   typeSpeed: 0,
//   backSpeed: 100,
//   loop: true,
// });


// var typed = new Typed('.element', {
//     strings: ["First sentence.", "Second sentence."],
//     typeSpeed: 30
//   });
