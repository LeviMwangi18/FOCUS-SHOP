
(function () {
    emailjs.init("e3ZUBznRByF_3vBfw");
})();
function sendMail(event) {
    event.preventDefault(); 
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_gsb7od3", "template_pesxnn3", templateParams)
        .then((response) => {
            // Show success message using SweetAlert2
            Swal.fire({
                title: 'Email Sent',
                text: 'Your email has been sent successfully!',
                icon: 'success',
            });
            // Clear the form fields
            document.getElementById('contactForm').reset()
        })
        .catch((error) => {
            // Show error message using SweetAlert2
            Swal.fire({
                title: 'Error',
                text: 'Failed to send email. Please try again later.',
                icon: 'error',
            });
            console.error('Failed to send email:', error);
        });
}

document.getElementById('contactForm'). addEventListener('submit', sendMail);

const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBtn.classList.toggle('active')
});

