// Global variables
let currentUser = null;
let currentLanguage = 'en';
let chatMessages = [];

// DOM elements
const openingScreen = document.getElementById('opening-screen');
const languageScreen = document.getElementById('language-screen');
const mainApp = document.getElementById('main-app');
const typewriterText = document.getElementById('typewriter-text');
const fallingDot = document.getElementById('falling-dot');
const semicolon = document.getElementById('semicolon');
const cartoonBaby = document.getElementById('cartoon-baby');
const handprints = document.getElementById('handprints');
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburgerMenu = document.getElementById('hamburger-menu');
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const closeAuthBtn = document.getElementById('close-auth');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages_el = document.getElementById('chat-messages');
const tinySpeaksBtn = document.getElementById('tiny-speaks');

// Language data
const languages = {
    'en': 'English',
    'hi': 'हिंदी',
    'bn': 'বাংলা',
    'ta': 'தமিழ்',
    'te': 'তেলুগু',
    'gu': 'ગુજરાતી',
    'kn': 'ಕನ್ನಡ',
    'ml': 'മലയാളം',
    'pa': 'ਪੰਜਾਬੀ',
    'mr': 'मराठी'
};

// Sample bot responses
const botResponses = {
    'feeding': [
        "For newborns, feeding every 2-3 hours is normal. Look for hunger cues like rooting or sucking motions.",
        "Breast milk is the best nutrition for babies in the first 6 months. If breastfeeding isn't possible, formula is a good alternative.",
        "Solid foods can be introduced around 6 months when your baby can sit up and shows interest in food."
    ],
    'sleep': [
        "Newborns sleep 14-17 hours a day in short periods. A consistent bedtime routine helps establish good sleep patterns.",
        "Safe sleep guidelines recommend babies sleep on their backs, in a crib with a firm mattress and no loose bedding.",
        "Sleep regressions are normal and temporary. Stick to routines and be patient."
    ],
    'development': [
        "Every baby develops at their own pace. First smiles typically appear around 6-8 weeks.",
        "Tummy time is important for building neck and shoulder strength. Start with short periods when baby is awake and alert.",
        "Rolling over usually happens between 4-6 months, but some babies do it earlier or later."
    ],
    'health': [
        "Regular pediatric checkups are important for monitoring growth and development.",
        "Fever in babies under 3 months requires immediate medical attention. For older babies, monitor closely.",
        "Trust your instincts - you know your baby best. Don't hesitate to contact your healthcare provider with concerns."
    ],
    'default': [
        "I'm here to help with all your parenting questions! Feel free to ask about feeding, sleep, development, or health.",
        "That's a great question! Every baby is unique, but I can share some general guidance based on pediatric recommendations.",
        "I'd be happy to help! Can you tell me more about your specific situation so I can provide better guidance?"
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    startOpeningAnimation();
    setupEventListeners();
});

// Opening Animation Sequence (Fixed according to specifications)
function startOpeningAnimation() {
    // Step 1: Typewriter effect for "HeyBabyy" (without punctuation initially)
    const text = "HeyBabyy";
    let index = 0;
    
    const typeInterval = setInterval(() => {
        typewriterText.textContent = text.substring(0, index + 1);
        index++;
        
        if (index >= text.length) {
            clearInterval(typeInterval);
            // Step 2: Show falling dot (period)
            setTimeout(showFallingDot, 500);
        }
    }, 200);
}

function showFallingDot() {
    // Show the falling period/full stop
    fallingDot.textContent = '.'; // Ensure it's a period, not semicolon
    fallingDot.style.opacity = '1';
    fallingDot.style.animation = 'fallAndBounce 2s ease-out forwards';
    
    // Step 3: Period slides to the end and transforms to semicolon
    setTimeout(() => {
        fallingDot.style.display = 'none';
        semicolon.classList.remove('hidden');
        // Update the main text to include semicolon
        typewriterText.textContent = "HeyBabyy;";
    }, 2000);
    
    // Step 4: Show baby running
    setTimeout(showBabyAnimation, 2500);
}

function showBabyAnimation() {
    cartoonBaby.classList.remove('hidden');
    
    // Step 5: Show handprints (make them visible)
    setTimeout(() => {
        handprints.classList.remove('hidden');
        handprints.style.opacity = '1';
        handprints.style.visibility = 'visible';
    }, 1500);
    
    // Step 6: Transition to language selection
    setTimeout(showLanguageSelection, 3000);
}

function showLanguageSelection() {
    openingScreen.style.opacity = '0';
    setTimeout(() => {
        openingScreen.style.display = 'none';
        languageScreen.classList.remove('hidden');
        languageScreen.style.transform = 'translateX(0)';
        // Setup language bubbles after language screen is visible
        setupLanguageBubbles();
    }, 1000);
}

// Language Selection
function setupLanguageBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    console.log('Setting up language bubbles:', bubbles.length);
    
    bubbles.forEach(bubble => {
        // Remove any existing listeners first
        bubble.removeEventListener('click', handleLanguageSelect);
        // Add the event listener
        bubble.addEventListener('click', handleLanguageSelect);
    });
}

function handleLanguageSelect(event) {
    const langCode = this.getAttribute('data-lang');
    console.log('Language selected:', langCode);
    selectLanguage(langCode);
}

function selectLanguage(langCode) {
    currentLanguage = langCode;
    console.log('Selecting language:', langCode);
    
    // Add visual feedback
    const selectedBubble = document.querySelector(`[data-lang="${langCode}"]`);
    if (selectedBubble) {
        selectedBubble.style.transform = 'scale(1.1)';
        selectedBubble.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.3))';
    }
    
    // Smooth transition to main app
    setTimeout(() => {
        languageScreen.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            languageScreen.style.display = 'none';
            mainApp.classList.remove('hidden');
            mainApp.classList.add('visible');
            console.log('Main app should now be visible');
            
            // Initialize the main app features
            initializeMainApp();
        }, 1000);
    }, 500);
}

function initializeMainApp() {
    // Add welcome message to chat
    setTimeout(() => {
        addMessageToChat("Welcome to HeyBabyy! I'm Tiny, your AI parenting assistant. I'm here 24/7 to help with feeding, sleep, development, and health questions. How can I help you today?", 'bot');
    }, 1000);
    
    // Add sample interactions
    setTimeout(addSampleInteractions, 2000);
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    setupNavigation();
    
    // Logo navigation - Fix for home navigation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            showPage('home');
        });
        logo.style.cursor = 'pointer';
    }
    
    // Hamburger menu
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleHamburgerMenu);
    }
    
    // Authentication
    if (loginBtn) {
        loginBtn.addEventListener('click', showAuthModal);
    }
    if (closeAuthBtn) {
        closeAuthBtn.addEventListener('click', hideAuthModal);
    }
    
    // Click outside modal to close
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }
    
    // Chat functionality
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Quick actions
    setupQuickActions();
    
    // Service cards
    setupServiceCards();
    
    // TinySpeaks voice assistant
    if (tinySpeaksBtn) {
        tinySpeaksBtn.addEventListener('click', activateVoiceAssistant);
    }
    
    // Authentication forms
    setupAuthForms();
    
    // Hamburger menu items
    setupHamburgerMenuItems();
}

// Navigation
function setupNavigation() {
    // Main navigation
    const navLinks = document.querySelectorAll('.main-nav a, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            if (pageName) {
                showPage(pageName);
            } else {
                showPage('home');
            }
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    let targetPage = document.getElementById(`${pageName}-page`);
    if (!targetPage) {
        targetPage = document.getElementById('home-page');
    }
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Hamburger Menu
function toggleHamburgerMenu() {
    if (hamburgerMenu) {
        hamburgerMenu.classList.toggle('visible');
    }
}

function setupHamburgerMenuItems() {
    const hamburgerItems = document.querySelectorAll('.hamburger-item');
    hamburgerItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            
            // Close hamburger menu
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('visible');
            }
            
            // Scroll to section
            const section = document.getElementById(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Authentication Modal
function showAuthModal() {
    if (authModal) {
        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideAuthModal() {
    if (authModal) {
        authModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function setupAuthForms() {
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTitle = document.getElementById('auth-title');
    const sendOtpBtn = document.getElementById('send-otp');
    const verifyOtpBtn = document.getElementById('verify-otp');
    const nextStepBtn = document.getElementById('next-step');
    const prevStepBtn = document.getElementById('prev-step');
    const completeRegBtn = document.getElementById('complete-registration');
    
    // Switch between login and register
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginForm) loginForm.classList.add('hidden');
            if (registerForm) registerForm.classList.remove('hidden');
            if (authTitle) authTitle.textContent = 'Register with HeyBabyy';
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            if (registerForm) registerForm.classList.add('hidden');
            if (loginForm) loginForm.classList.remove('hidden');
            if (authTitle) authTitle.textContent = 'Login to HeyBabyy';
        });
    }
    
    // OTP functionality
    if (sendOtpBtn) {
        sendOtpBtn.addEventListener('click', function() {
            const phone = document.getElementById('phone').value;
            if (phone) {
                // Simulate OTP sending
                showNotification('OTP sent to ' + phone, 'success');
                const otpGroup = document.getElementById('otp-group');
                if (otpGroup) {
                    otpGroup.classList.remove('hidden');
                }
            } else {
                showNotification('Please enter a valid phone number', 'error');
            }
        });
    }
    
    if (verifyOtpBtn) {
        verifyOtpBtn.addEventListener('click', function() {
            const otp = document.getElementById('otp').value;
            if (otp && otp.length === 6) {
                // Simulate OTP verification
                currentUser = { phone: document.getElementById('phone').value };
                hideAuthModal();
                showNotification('Successfully logged in!', 'success');
                updateUIForLoggedInUser();
            } else {
                showNotification('Please enter a valid 6-digit OTP', 'error');
            }
        });
    }
    
    // Registration steps
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', function() {
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            if (step1) step1.classList.remove('active');
            if (step2) step2.classList.add('active');
        });
    }
    
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', function() {
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            if (step2) step2.classList.remove('active');
            if (step1) step1.classList.add('active');
        });
    }
    
    if (completeRegBtn) {
        completeRegBtn.addEventListener('click', function() {
            // Simulate registration completion
            currentUser = { registered: true };
            hideAuthModal();
            showNotification('Registration completed successfully!', 'success');
            updateUIForLoggedInUser();
        });
    }
}

function updateUIForLoggedInUser() {
    if (currentUser && loginBtn) {
        loginBtn.textContent = 'Profile';
        loginBtn.onclick = showProfile;
    }
}

function showProfile() {
    showNotification('Profile feature coming soon!', 'info');
}

// Chat Functionality
function sendMessage() {
    if (!chatInput) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addMessageToChat(botResponse, 'bot');
    }, 1000);
}

function addMessageToChat(message, sender) {
    if (!chatMessages_el) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    
    chatMessages_el.appendChild(messageDiv);
    chatMessages_el.scrollTop = chatMessages_el.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple keyword matching for responses
    if (message.includes('feed') || message.includes('milk') || message.includes('bottle') || message.includes('eat')) {
        return getRandomResponse('feeding');
    } else if (message.includes('sleep') || message.includes('nap') || message.includes('bed')) {
        return getRandomResponse('sleep');
    } else if (message.includes('develop') || message.includes('milestone') || message.includes('grow')) {
        return getRandomResponse('development');
    } else if (message.includes('sick') || message.includes('fever') || message.includes('health') || message.includes('doctor')) {
        return getRandomResponse('health');
    } else {
        return getRandomResponse('default');
    }
}

function getRandomResponse(category) {
    const responses = botResponses[category] || botResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
}

// Quick Actions
function setupQuickActions() {
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'growth-tracker':
            showNotification('Growth Tracker: Track your baby\'s height, weight, and milestones', 'info');
            break;
        case 'feeding-log':
            showNotification('Feeding Log: Record feeding times and amounts', 'info');
            break;
        case 'find-services':
            showPage('services');
            break;
        case 'reminders':
            showNotification('Reminders: Set up checkup and vaccination reminders', 'info');
            break;
    }
}

// Service Cards
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            handleServiceClick(service);
        });
    });
}

function handleServiceClick(service) {
    switch(service) {
        case 'consultant':
            showNotification('Virtual Consultant: AI-powered 24/7 parenting assistance', 'info');
            break;
        case 'map':
            showMapServices();
            break;
        case 'growth':
            showGrowthMonitor();
            break;
        case 'nutrition':
            showNutritionTracker();
            break;
        case 'reminders':
            showHealthReminders();
            break;
    }
}

function showMapServices() {
    const services = [
        '🏠 Creches nearby',
        '💉 Vaccination centers',
        '🎓 Quality preschools',
        '👨‍⚕️ Pediatricians',
        '🤱 Lactation consultants',
        '🩸 Blood banks'
    ];
    showNotification(`Map Services Available:\n${services.join('\n')}`, 'info');
}

function showGrowthMonitor() {
    showNotification('Growth Monitor: Track milestones like first smile, rolling over, sitting up', 'info');
}

function showNutritionTracker() {
    showNotification('Nutrition Tracker: Monitor feeding schedules and nutritional intake', 'info');
}

function showHealthReminders() {
    showNotification('Health Reminders: Never miss vaccinations and checkups', 'info');
}

// Voice Assistant
function activateVoiceAssistant() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        startVoiceRecognition();
    } else {
        showNotification('TinySpeaks: Voice feature not supported in this browser. Try typing your question in the chat!', 'info');
    }
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = currentLanguage === 'en' ? 'en-US' : 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
        if (tinySpeaksBtn) {
            tinySpeaksBtn.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
        }
        showNotification('TinySpeaks is listening... Speak now!', 'info');
    };
    
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        if (chatInput) {
            chatInput.value = transcript;
            sendMessage();
        }
    };
    
    recognition.onerror = function(event) {
        showNotification('TinySpeaks: Sorry, I couldn\'t hear you clearly. Please try again!', 'error');
    };
    
    recognition.onend = function() {
        if (tinySpeaksBtn) {
            tinySpeaksBtn.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
        }
    };
    
    recognition.start();
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        max-width: 300px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease-out;
        white-space: pre-line;
    `;
    
    // Set background based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
            break;
        case 'info':
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            break;
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close hamburger menu when clicking outside
document.addEventListener('click', function(e) {
    if (hamburgerMenu && hamburgerBtn && !hamburgerMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerMenu.classList.remove('visible');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press Escape to close modals
    if (e.key === 'Escape') {
        hideAuthModal();
        if (hamburgerMenu) {
            hamburgerMenu.classList.remove('visible');
        }
    }
    
    // Press Ctrl/Cmd + K to focus chat input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (chatInput) {
            chatInput.focus();
        }
    }
});

// Add some sample interactions for demo
function addSampleInteractions() {
    const sampleQuestions = [
        "How often should I feed my newborn?",
        "When do babies start sleeping through the night?",
        "What are the first signs of teething?",
        "How can I help my baby's development?",
        "When should I introduce solid foods?"
    ];
    
    // Add sample question buttons
    const quickQuestions = document.createElement('div');
    quickQuestions.className = 'quick-questions';
    quickQuestions.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 15px 0;
        padding: 0 20px;
    `;
    
    sampleQuestions.forEach(question => {
        const btn = document.createElement('button');
        btn.textContent = question;
        btn.style.cssText = `
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        `;
        
        btn.addEventListener('click', function() {
            if (chatInput) {
                chatInput.value = question;
                sendMessage();
            }
        });
        
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
        });
        
        quickQuestions.appendChild(btn);
    });
    
    // Insert after chat messages
    const chatContainer = document.querySelector('.chat-input-container');
    if (chatContainer && chatContainer.parentNode) {
        chatContainer.parentNode.insertBefore(quickQuestions, chatContainer);
    }
}