document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
        const message = document.getElementById('message').value.trim();
        
        // Validate form data
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For demonstration, we'll simulate a form submission
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <h3>Thank You for Reaching Out!</h3>
                <p>I've received your message and will contact you soon to discuss how the AIM Methodology can help transform your sales performance.</p>
                <button class="btn btn-primary" id="send-another">Send Another Message</button>
            `;
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Add event listener to "Send Another Message" button
            document.getElementById('send-another').addEventListener('click', () => {
                formContainer.innerHTML = '';
                formContainer.appendChild(contactForm);
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        }, 2000);
    }
    
    function validateForm(name, email, message) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Reset previous error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
        
        // Validate name
        if (name === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        formGroup.classList.add('has-error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        formGroup.appendChild(errorMessage);
    }
});
