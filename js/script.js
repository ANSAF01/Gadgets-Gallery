document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Form Submission with AJAX and Validation
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const emailError = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            emailError.textContent = '';
            messageError.textContent = '';

            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required.';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Invalid email format.';
                isValid = false;
            }

            if (!messageInput.value.trim()) {
                messageError.textContent = 'Message is required.';
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();

            xhr.open('POST', 'https://formspree.io/f/xwplpnlj');
            xhr.setRequestHeader('Accept', 'application/json');

            xhr.onload = function() {
                if (xhr.status === 200) {
                    document.getElementById('successMessage').textContent = 'Message sent successfully!';
                    document.getElementById('successMessage').style.display = 'block';
                    form.reset();
                    setTimeout(function() {
                        document.getElementById('successMessage').style.display = 'none';
                    }, 5000);
                } else {
                    alert('An error occurred. Please try again.');
                }
            };

            xhr.onerror = function() {
                alert('An error occurred. Please try again.');
            };

            xhr.send(formData);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
