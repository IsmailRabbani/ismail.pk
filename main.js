// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "xxxxx",
  authDomain: "xxxxx",
  databaseURL: "xxxxx",
  projectId: "xxxxx",
  storageBucket: "xxxxx",
  messagingSenderId: "xxxxx"
};

// Initialize Firebase if available
if (window.firebase && typeof firebase.initializeApp === 'function') {
  try {
    firebase.initializeApp(config);
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
} else {
  console.warn('Firebase library not found; continuing without DB persistence.');
}

// Reference messages collection (only if database is available)
var messagesRef = null;
if (window.firebase && firebase.database) {
  try {
    messagesRef = firebase.database().ref('messages');
  } catch (err) {
    console.warn('Could not get messages ref:', err);
  }
}

// Attach submit handler after DOM ready
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', submitForm);
  } else {
    console.warn('Contact form not found on page.');
  }
});

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message (if DB available)
  if (messagesRef) {
    saveMessage(name, company, email, phone, message);
  } else {
    console.log('messagesRef not available — message not persisted to Firebase DB.');
  }

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  var formEl = document.getElementById('contactForm');
  if (formEl) formEl.reset();
}

// Function to get get form values
// Function to get form values safely
function getInputVal(id){
  var el = document.getElementById(id);
  return el ? el.value : '';
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  if (!messagesRef) return;
  try {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      company: company,
      email: email,
      phone: phone,
      message: message
    });
  } catch (err) {
    console.warn('Failed to save message:', err);
  }
}

// Simple horizontal slider controls for portfolio
document.addEventListener('DOMContentLoaded', function () {
  var next = document.querySelector('.portfolio-next');
  var prev = document.querySelector('.portfolio-prev');
  var slider = document.querySelector('.portfolio-slider');
  if (!slider) return;

  var scrollAmount = Math.round(slider.clientWidth * 0.8);

  function goNext() {
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  function goPrev() {
    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  if (next) next.addEventListener('click', goNext);
  if (prev) prev.addEventListener('click', goPrev);

  // Recompute on resize for responsiveness
  window.addEventListener('resize', function () {
    scrollAmount = Math.round(slider.clientWidth * 0.8);
  });
});