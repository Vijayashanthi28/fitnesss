//Navbar
  // ===================== DOM ELEMENTS ===================== //
const registerBtn = document.getElementById('registerBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeSignupModal = document.getElementById('closeSignupModal');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const userActions = document.getElementById('userActions');
const userAvatar = document.getElementById('userAvatar');
const userDropdown = document.getElementById('userDropdown');
const notificationBtn = document.getElementById('notificationBtn');
const notificationsPanel = document.getElementById('notificationsPanel');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// ===================== SEARCH DATA ===================== //
const navbarSearchItems = [
    { title: "HIIT Fitness", description: "High intensity interval training for maximum results" },
    { title: "Yoga and Meditation", description: "Find your inner peace with guided yoga sessions" },
    { title: "Weight Loss Program", description: "Comprehensive weight loss with diet and exercise" },
    { title: "Strength Training", description: "Build muscle and increase strength effectively" },
    { title: "Cardio Program", description: "Improve cardiovascular health and endurance" },
    { title: "Corporate Wellness", description: "Workplace wellness programs for teams" },
    { title: "Personal Training", description: "One-on-one personalized fitness coaching" },
    { title: "Nutrition Program", description: "Learn healthy eating habits and meal planning" }
];

// ===================== AUTH CHECK ===================== //
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
updateUIBasedOnAuth();

// ===================== REGISTER BUTTON ===================== //
registerBtn.addEventListener('click', () => {
    showModal(loginModal);
});

// ===================== MODAL FUNCTIONS ===================== //
function showModal(modal) {
    modalBackdrop.classList.add('active');
    modal.style.display = 'flex';
}

function hideAllModals() {
    modalBackdrop.classList.remove('active');
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
}

closeLoginModal.addEventListener('click', hideAllModals);
closeSignupModal.addEventListener('click', hideAllModals);

modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) hideAllModals();
});

// ===================== TOGGLE LOGIN / SIGNUP ===================== //
showSignup.addEventListener('click', () => {
    loginModal.style.display = 'none';
    signupModal.style.display = 'flex';
});

showLogin.addEventListener('click', () => {
    signupModal.style.display = 'none';
    loginModal.style.display = 'flex';
});

// ===================== LOGIN FORM ===================== //
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    isLoggedIn = true;
    updateUIBasedOnAuth();
    hideAllModals();
    showNotification('Welcome back! You have successfully logged in.');
});

// ===================== SIGNUP FORM ===================== //
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    isLoggedIn = true;
    updateUIBasedOnAuth();
    hideAllModals();
    showNotification('Account created successfully! Welcome to Fitness Hub.');
});

// ===================== AUTH UI UPDATE ===================== //
function updateUIBasedOnAuth() {
    if (isLoggedIn) {
        registerBtn.style.display = 'none';
        userActions.classList.add('active');
    } else {
        registerBtn.style.display = 'block';
        userActions.classList.remove('active');
    }
}

// ===================== USER DROPDOWN ===================== //
userAvatar.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
    notificationsPanel.classList.remove('active');
});

// ===================== NOTIFICATION PANEL ===================== //
notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationsPanel.classList.toggle('active');
    userDropdown.classList.remove('active');
});

// ===================== LOGOUT ===================== //
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    isLoggedIn = false;
    updateUIBasedOnAuth();
    userDropdown.classList.remove('active');
    showNotification('You have been logged out successfully.');
});

// ===================== CLOSE PANELS WHEN CLICKING OUTSIDE ===================== //
document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
    notificationsPanel.classList.remove('active');
    searchResults.classList.remove('active');
});

// ===================== SEARCH FUNCTIONALITY ===================== //
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        searchResults.classList.remove('active');
        return;
    }

    const filtered = navbarSearchItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    displaySearchResults(filtered);
});

searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length > 0) {
        searchResults.classList.add('active');
    }
});

function displaySearchResults(results) {
    searchResults.innerHTML = results.length
        ? results.map(r => `
            <div class="search-result-item">
                <div class="search-result-title">${r.title}</div>
                <div class="search-result-desc">${r.description}</div>
            </div>
        `).join('')
        : '<div class="no-results">No programs found</div>';

    searchResults.classList.add('active');
}

searchResults.addEventListener('click', (e) => {
    if (e.target.closest('.search-result-item')) {
        const title = e.target.closest('.search-result-item')
            .querySelector('.search-result-title').textContent;
        showNotification(`Navigating to ${title}...`);
        searchResults.classList.remove('active');
        searchInput.value = '';
    }
});

// ===================== NOTIFICATION POPUP ===================== //
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn .3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut .3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================== ANIMATION STYLES ===================== //
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {opacity:0; transform: translateX(100px);}
    to   {opacity:1; transform: translateX(0);}
}
@keyframes slideOut {
    from {opacity:1; transform: translateX(0);}
    to   {opacity:0; transform: translateX(100px);}
}
`;
document.head.appendChild(style);

//FAQ
 // Get all FAQ items
        const faqItems = document.querySelectorAll('.faq-item');

        // Add click event to each FAQ question
        faqItems.forEach(item => {
            const questionWrapper = item.querySelector('.faq-question-wrapper');
            
            questionWrapper.addEventListener('click', () => {
                // Toggle active class
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });

        // Add keyboard accessibility
        faqItems.forEach(item => {
            const questionWrapper = item.querySelector('.faq-question-wrapper');
            questionWrapper.setAttribute('tabindex', '0');
            questionWrapper.setAttribute('role', 'button');
            questionWrapper.setAttribute('aria-expanded', 'false');
            
            questionWrapper.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    questionWrapper.click();
                }
            });
            
            // Update aria-expanded when item is toggled
            const observer = new MutationObserver(() => {
                const isActive = item.classList.contains('active');
                questionWrapper.setAttribute('aria-expanded', isActive);
            });
            
            observer.observe(item, { attributes: true, attributeFilter: ['class'] });
        });

     

//My Program
   function startProgram() {
            alert('🎉 Starting your Premium Program!\n\nYou will be redirected to the payment page.');
            // In production: window.location.href = 'payment.html';
        }

        // Add intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animation
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.program-showcase-container');
            animatedElements.forEach(el => observer.observe(el));
        });

        //User Profile
          // Switch between tabs
        function switchTab(tabName) {
            // Remove active class from all tabs
            const allTabs = document.querySelectorAll('.nav-tab-button');
            allTabs.forEach(tab => {
                tab.classList.remove('active-tab');
            });

            // Hide all content panels
            const allPanels = document.querySelectorAll('.content-panel');
            allPanels.forEach(panel => {
                panel.classList.remove('active-content');
            });

            // Activate selected tab
            if (tabName === 'personal') {
                allTabs[0].classList.add('active-tab');
                document.getElementById('personal-panel').classList.add('active-content');
            } else if (tabName === 'password') {
                allTabs[2].classList.add('active-tab');
                document.getElementById('password-panel').classList.add('active-content');
            } else if (tabName === 'logout') {
                allTabs[3].classList.add('active-tab');
                document.getElementById('logout-panel').classList.add('active-content');
            }
        }

        // Redirect to My Program page
        function redirectToProgram() {
          
            
            // For demonstration, show an alert
            alert('Redirecting to myprogram.html...\n\nIn production, uncomment the window.location.href line in the redirectToProgram() function.');
            
            
              
            window.location.href = 'myprogram.html';
        }

        // Update Personal Information
        function updatePersonalInfo() {
            alert('Personal information updated successfully!');
        }

        // Update Password
        function updatePassword() {
            const currentPassword = document.querySelectorAll('#password-panel .text-input-field')[0].value;
            const newPassword = document.querySelectorAll('#password-panel .text-input-field')[1].value;
            const confirmPassword = document.querySelectorAll('#password-panel .text-input-field')[2].value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all password fields');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('New passwords do not match!');
                return;
            }

            alert('Password updated successfully!');
        }

        // Forgot Password
        function forgotPassword(event) {
            event.preventDefault();
            alert('Password reset link sent to your email!');
        }

        // Confirm Logout
        function confirmLogout() {
            alert('Logging out....');
            // In production:
            window.location.href = 'index.html';
        }

        //Tracking
         function toggleSection(sectionType) {
            const sections = {
                'workout': 'workout-section',
                'nutrition': 'nutrition-section',
                'progress': 'progress-section',
                'challenge': 'challenge-section',
                'expert': 'expert-section'
            };

            const sectionId = sections[sectionType];
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.classList.toggle('active');
            }
        }

        //Payment Options
          let isDropdownOpen = false;

        function togglePaymentDropdown() {
            const paymentOptions = document.getElementById('paymentOptions');
            const dropdownArrow = document.getElementById('dropdownArrow');
            
            isDropdownOpen = !isDropdownOpen;
            
            if (isDropdownOpen) {
                paymentOptions.classList.add('expanded-dropdown');
                dropdownArrow.classList.add('rotate-arrow');
            } else {
                paymentOptions.classList.remove('expanded-dropdown');
                dropdownArrow.classList.remove('rotate-arrow');
            }
        }

        function selectPaymentMethod(method) {
            const paymentForm = document.getElementById('paymentForm');
            const successMessage = document.getElementById('successMessage');
            
            // Hide success message if visible
            successMessage.classList.remove('display-success');
            
            // Show payment form
            paymentForm.classList.add('show-form');
            
            // Scroll to form
            paymentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Close dropdown
            const paymentOptions = document.getElementById('paymentOptions');
            const dropdownArrow = document.getElementById('dropdownArrow');
            paymentOptions.classList.remove('expanded-dropdown');
            dropdownArrow.classList.remove('rotate-arrow');
            isDropdownOpen = false;
        }

        function processPayment() {
            const cardHolderName = document.getElementById('cardHolderName').value;
            const cardNumber = document.getElementById('cardNumber').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvvCode = document.getElementById('cvvCode').value;

            // Basic validation
            if (!cardHolderName || !cardNumber || !expiryDate || !cvvCode) {
                alert('Please fill in all fields');
                return;
            }

            if (cardNumber.replace(/\s/g, '').length < 13) {
                alert('Please enter a valid card number');
                return;
            }

            if (cvvCode.length < 3) {
                alert('Please enter a valid CVV');
                return;
            }

            // Hide form
            const paymentForm = document.getElementById('paymentForm');
            paymentForm.classList.remove('show-form');

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('display-success');

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Clear form
            document.getElementById('cardHolderName').value = '';
            document.getElementById('cardNumber').value = '';
            document.getElementById('expiryDate').value = '';
            document.getElementById('cvvCode').value = '';
        }

        function scrollToPayment() {
            const paymentSection = document.getElementById('paymentSection');
            paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Format card number with spaces
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Format expiry date
        document.getElementById('expiryDate').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // Only allow numbers in CVV
        document.getElementById('cvvCode').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

      