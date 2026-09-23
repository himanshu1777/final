// FOR BARS IN SMALL DEVICES

const bar=document.querySelector('.bar');

const barOption=document.querySelector('.bars-option');

bar.addEventListener('click',()=>{

    

    if ( bar.classList.contains('fa-bars')){

   
        bar.classList.remove('fa-bars');
        bar.classList.add('fa-xmark');
        barOption.classList.add('bars-cross')

        

    }else{


        bar.classList.remove('fa-xmark');
        barOption.classList.remove('bars-cross');
        bar.classList.add('fa-bars');
        
      
    }
});





/*
=============================================================== ======================================== =======================

============================================ FIREBASE CONFIGURATION SCRIPT =====================================================

=================================================================================================================================

*/



// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
   
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyALL8gI0jrBE76UniRH-nWi7YgAB9MzS9w",
    authDomain: "my-dustbin-85699.firebaseapp.com",
    projectId: "my-dustbin-85699",
    storageBucket: "my-dustbin-85699.firebasestorage.app",
    messagingSenderId: "589931414179",
    appId: "1:589931414179:web:a439a6056f3813230cf516",
    measurementId: "G-P69NQR5NPE"
  };


    //   Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);



/*
=============================================================== ======================================== =======================

============================================ FIREBASE CONFIGURATION SCRIPT END  =====================================================

=================================================================================================================================

*/





 /*
 
 ============ ============================================ ============================== ===========
 
    --------------------------- - Script for Login Popup Window -----------------------------------

=================== ========================================= =======================================

*/




// FOR LOGIN PAGE SCRIPT




  const modal = document.getElementById('loginModal');
  const openBtn = document.getElementById('btn');
  const closeBtn = document.getElementById('closeModalBtn');

  // Open modal
  openBtn.onclick = () => modal.style.display = 'block';

  // Close modal
  closeBtn.onclick = () => modal.style.display = 'none';

  // Close modal if user clicks outside box

  window.addEventListener('click',(e)=>{
         if (e.target === modal){
        modal.style.display = 'none';
        modal.style.cursor = 'pointer';
    }
  })





  //  To check wheter user is logged in or want to signup

const toggleText = document.querySelector('#toggleText');
const toggleModeBtn = document.querySelector('#toggleModeBtn');
const formTitle = document.querySelector('#formTitle');
const btn = document.querySelector('#Btn');

let isSignIn = true;


toggleModeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    isSignIn = !isSignIn;

    if(isSignIn){

        formTitle.textContent='Log In';
        btn.textContent='Log In';
        toggleText.textContent="Need an Account?";
        toggleModeBtn.textContent="Sign Up";

    }else{

        formTitle.textContent='Sign up';
        btn.textContent='Sign up';
        toggleText.textContent="Account Already Exist ?";
        toggleModeBtn.textContent="Log In";

    }
})


  document.getElementById('modalLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // C. Grab what the user typed in your HTML inputs
  const email = document.getElementById('userEmail');
  const password = document.getElementById('userPassword');

  // D. Call the Firebase function you imported at the top
  try {

    if(isSignIn){

        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        alert(`Welcome back ! Logged in as: ${userCredential.user.email}`);
        modal.style.display='none';
    }
    else{
        const userCredential = await createUserWithEmailAndPassword(auth,email.value,password.value);
        alert(`Account Created Successfully! Welcome ${userCredential.user.email}`);
    }

    
  } catch (error) {
    alert("Authentication Error: " + error.message);
   
  }

   email.value="";
    password.value="";
});


/*   ========================== ============================== ============================== ==== 

    ----------------------------- Login Popup Window Scipt End -----------------------------
  
    =========================== =========================== ================================= =====
*/














/*  ===================== ======================================== ================================ 

   ------------------------- Booking popup Window Script Start -----------------------------------

  ======================= ======================================== =====================================

*/


    const booking = document.querySelectorAll('.option');
    const bookingWindow = document.querySelector('.book-container');
    const TOW = document.querySelector('#tow');
    const bookContainer = document.querySelector('.book-container');


    booking.forEach((book)=>{

        book.addEventListener('click',showBooking);

    })

    function showBooking(e){

        bookingWindow.style.display='block';


        const p = e.currentTarget.querySelector('p');

        const text = p.textContent;
        TOW.value = text;
        TOW.style.color='black';
        TOW.style.backgroundColor='white';

    
        
    }

    window.addEventListener('click',(e) =>{
        if(e.target === bookContainer) bookingWindow.style.display = 'none';
    });




/* ======================  ================= ===================   ======================================

    ---------------------- BOOKING REQUEST PICKUP DATA STORAGE IN DATABASE SCRIPT ----------------------

    ===================== ================== ======================= ========================================
    
    
*/



    const address = document.querySelector('textarea');
    const date = document.querySelector('#date');
    const time = document.querySelector('#ti');
    const bookForm = document.querySelector('.book-form');
    const bookSubmit = document.querySelector('#final-submit');





    bookForm.addEventListener('submit',saveBooking)

    async function saveBooking(e) {

        e.preventDefault(); // Prevents page reload on submit
      bookSubmit.disabled = true;
      bookSubmit.value = "Saving...";

    try {
    // This creates a new document inside the "bookings" collection
        const docRef = await addDoc(collection(db, "bookings"), {
            typeOfWaste: TOW.value,      // Input 1
            bookingDate: date.value,       // Input 2
            bookingTime: time.value,       // Input 3
            customerAddress: address.value,   // Input 4
            status: "pending",         // Useful extra field to track state
            createdAt: serverTimestamp() // Tracks when the form was submitted
        });

        // console.log("Booking saved successfully with ID: ", docRef.id);
        alert("Your booking was submitted successfully!");
        bookForm.reset();
        bookingWindow.style.display='none';

        }catch (error) {
            console.error("Error adding booking: ", error);
            alert("Failed to submit booking.");
        }finally{
            bookSubmit.disabled= false; 
            bookSubmit.value= 'Book';
        }
    }
