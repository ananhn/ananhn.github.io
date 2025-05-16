// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            // Extract form data
            const name = contactForm.elements['Name'].value.trim();
            const email = contactForm.elements['Email'].value.trim();
            const contactNumber = contactForm.elements['Contact Number'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            // Simple validation
            if (!name || !email || !contactNumber || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!/^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Mock sending the form data
            alert('Thank you for your message, ' + name + '! We will get back to you soon.');

            // Reset the form
            contactForm.reset();
        });
    }
});