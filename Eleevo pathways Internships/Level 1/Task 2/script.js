const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  // Email validation regex (simple, but effective)
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !subject || !message) {
    showToast("Please fill in all fields.");
    return;
  }

  if (!emailRegex.test(email)) {
    showToast("Please enter a valid email address.");
    return;
  }



  showToast("Thank! We will let you know soon.");
  form.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  // Remove the show class after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
