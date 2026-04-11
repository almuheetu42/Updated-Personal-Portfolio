  document.addEventListener('DOMContentLoaded', () => {
            
            // ===================================
            // 1. TIMELINE & MENU ANIMATIONS (NEW)
            // ===================================
            const items = document.querySelectorAll('.timeline-item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 });

            items.forEach(item => {
                observer.observe(item);
                item.addEventListener('mouseenter', () => item.classList.add('active'));
                item.addEventListener('mouseleave', () => item.classList.remove('active'));
            });

            // Mobile Menu
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');

            if(btn && menu){
                btn.addEventListener('click', () => {
                    menu.classList.toggle('hidden');
                });
                menu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                       menu.classList.add('hidden'); 
                    });
                });
            }

            // ===================================
            // 2. REST OF THE SCRIPTS (PRESERVED)
            // (Accordion, Skill Cards, Tabs)
            // ===================================

            // Accordion / Questions
            const questions = document.querySelectorAll('.question');
            questions.forEach(function (question) {
                const btn = question.querySelector(".question-btn");
                if(btn){
                    btn.addEventListener("click", function () {
                        questions.forEach(function (item) {
                            if (item !== question) {
                                item.classList.remove("show-text");
                            }
                        });
                        question.classList.toggle("show-text");
                    });
                }
            });

            // Skill Cards Highlight Logic
            const cards = document.querySelectorAll('.skill-card');
            const highlightedTitle = document.getElementById('highlighted-title');
            const highlightedDesc = document.getElementById('highlighted-desc');
            const highlightedIcon = document.getElementById('highlighted-icon');

            function setHighlighted(title, desc, iconHTML, cardEl) {
                if (highlightedTitle) highlightedTitle.textContent = title;
                if (highlightedDesc) highlightedDesc.textContent = desc;
                if (highlightedIcon) highlightedIcon.innerHTML = iconHTML || '<i class="fa-solid fa-star"></i>';

                cards.forEach(c => {
                    c.classList.remove('ring-2', 'ring-[#f6c47e]', 'bg-[#3a3d42]');
                    c.classList.add('bg-[#2b2d32]');
                });

                if (cardEl) {
                    cardEl.classList.remove('bg-[#2b2d32]');
                    cardEl.classList.add('ring-2', 'ring-[#f6c47e]', 'bg-[#3a3d42]');
                }
            }

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    setHighlighted(
                        card.getAttribute('data-title'),
                        card.getAttribute('data-desc'),
                        card.getAttribute('data-icon'),
                        card
                    );
                });
            });

            // Initialize default card if exists
            const defaultCard = document.querySelector('.skill-card[data-title="HTML5"]') || cards[0];
            if (defaultCard) {
                setHighlighted(
                    defaultCard.getAttribute('data-title'),
                    defaultCard.getAttribute('data-desc'),
                    defaultCard.getAttribute('data-icon'),
                    defaultCard
                );
            }

            // Filter Skills Logic
            window.filterSkills = function(category, clickedBtn) {
                const allCards = document.querySelectorAll('.skill-card');
                allCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                const allBtns = document.querySelectorAll('.tab-btn');
                allBtns.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });

                if (clickedBtn) {
                    clickedBtn.classList.add('active');
                    clickedBtn.setAttribute('aria-pressed', 'true');
                }
            };

            // Skill tab active state fix
            const skillTabButtons = document.querySelectorAll('.tab-btn');
            skillTabButtons.forEach(tabBtn => {
                tabBtn.addEventListener('click', () => {
                    const match = tabBtn.getAttribute('onclick')?.match(/filterSkills\('([^']+)'\)/);
                    const category = match ? match[1] : 'all';
                    window.filterSkills(category, tabBtn);
                });
            });

            // Nav active section highlight
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            const sections = [...navLinks]
                .map(link => document.querySelector(link.getAttribute('href')))
                .filter(Boolean);

            function updateActiveNavLink() {
                let currentSectionId = sections[0]?.id || '';

                sections.forEach(section => {
                    const top = section.offsetTop - 120;
                    const bottom = top + section.offsetHeight;
                    if (window.scrollY >= top && window.scrollY < bottom) {
                        currentSectionId = section.id;
                    }
                });

                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${currentSectionId}`;
                    link.classList.toggle('active', isActive);

                    if (link.closest('#mobile-menu')) {
                        link.classList.toggle('bg-gray-700', isActive);
                        link.classList.toggle('text-white', isActive);
                        link.classList.toggle('text-yellow-400', isActive);
                    } else {
                        link.classList.toggle('text-yellow-400', isActive);
                    }
                });
            }

            updateActiveNavLink();
            window.addEventListener('scroll', updateActiveNavLink);

            // ===================================
            // 4. PORTFOLIO TAB FILTERING (NEW)
            // ===================================
            const portfolioTabs = document.querySelectorAll('.portfolio-tab-btn');
            const portfolioGrid = document.getElementById('portfolio-grid');
            const portfolioItems = portfolioGrid ? Array.from(portfolioGrid.children) : [];

            if(portfolioTabs.length > 0 && portfolioItems.length > 0) {
                portfolioTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        portfolioTabs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');

                        const filter = this.getAttribute('data-filter');

                        portfolioItems.forEach(item => {
                            const category = item.getAttribute('data-category');
                            
                            if (filter === 'all' || filter === category) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        });
                    });
                });
            }

            // ===================================
            // 3. CONTACT FORM SUBMISSION (NEW)
            // ===================================
            const contactForm = document.getElementById('contact-form');


            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    const form = e.target;
                    const data = new FormData(form);
                    const action = form.action;
                    const submitButton = form.querySelector('button[type="submit"]');
                    const originalButtonText = submitButton.innerHTML;
                    submitButton.innerHTML = 'Submitting...';
                    submitButton.disabled = true;


                    fetch(action, {
                        method: form.method,
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    }).then(response => {
                        if (response.ok) {
                            alert('Thank you for your message!');
                            form.reset(); 
                        } else {
                             response.json().then(data => {
                                if (Object.hasOwn(data, 'errors')) {
                                    alert(data["errors"].map(error => error["message"]).join(", "));
                                } else {
                                    alert('Oops! There was a problem submitting your form.');
                                }
                            })
                        }
                    }).catch(error => {
                        alert('Oops! There was a network error.');
                    }).finally(() => {
                        submitButton.innerHTML = originalButtonText;
                        submitButton.disabled = false;
                    });
                });
            }
        });
