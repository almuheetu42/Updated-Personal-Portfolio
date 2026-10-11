document.addEventListener('DOMContentLoaded', () => {

            // ===================================
            // 0. THEME TOGGLE (NEW)
            // ===================================
            const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
            const themeToggleMobile = document.getElementById('theme-toggle-mobile');
            const sunIcon = 'fa-sun';
            const moonIcon = 'fa-moon';

            function updateThemeIcon(isLight) {
                // When light mode is active, show moon icon (to switch to dark)
                // When dark mode is active, show sun icon (to switch to light)
                const newIcon = isLight ? moonIcon : sunIcon;
                const oldIcon = isLight ? sunIcon : moonIcon;
                const label = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
                
                const desktopIcon = themeToggleDesktop ? themeToggleDesktop.querySelector('i') : null;
                const mobileIcon = themeToggleMobile ? themeToggleMobile.querySelector('i') : null;

                if (desktopIcon) {
                    desktopIcon.classList.remove(oldIcon);
                    desktopIcon.classList.add(newIcon);
                }
                if (mobileIcon) {
                    mobileIcon.classList.remove(oldIcon);
                    mobileIcon.classList.add(newIcon);
                }

                if (themeToggleDesktop) {
                    themeToggleDesktop.setAttribute('aria-label', label);
                    themeToggleDesktop.setAttribute('title', label);
                }
                if (themeToggleMobile) {
                    themeToggleMobile.setAttribute('aria-label', label);
                    themeToggleMobile.setAttribute('title', label);
                }
            }

            // Set initial icon and sync state on page load
            const initialIsLight = localStorage.getItem('theme') === 'light';
            if (initialIsLight) {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark');
            } else {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.body.classList.add('dark');
                document.body.classList.remove('light-mode');
            }
            updateThemeIcon(initialIsLight);

            const handleThemeToggle = () => {
                const isCurrentlyLight = document.documentElement.classList.contains('light') || document.body.classList.contains('light-mode');
                const nextIsLight = !isCurrentlyLight;

                if (nextIsLight) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.body.classList.remove('dark');
                    document.body.classList.add('light-mode');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                    document.body.classList.remove('light-mode');
                    document.body.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }

                updateThemeIcon(nextIsLight);
            };

            if(themeToggleDesktop) themeToggleDesktop.addEventListener('click', handleThemeToggle);
            if(themeToggleMobile) themeToggleMobile.addEventListener('click', handleThemeToggle);
            
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

            // Mobile Menu & Dropdowns
            const btn = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
            const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
            const mobileDropdownIcon = document.getElementById('mobile-dropdown-icon');

            if (mobileDropdownBtn && mobileDropdownMenu) {
                mobileDropdownBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isHidden = mobileDropdownMenu.classList.toggle('hidden');
                    const expanded = !isHidden;
                    mobileDropdownBtn.setAttribute('aria-expanded', expanded.toString());
                    if (mobileDropdownIcon) {
                        mobileDropdownIcon.classList.toggle('rotate-180', expanded);
                    }
                });
            }

            if (btn && menu) {
                btn.addEventListener('click', () => {
                    menu.classList.toggle('hidden');
                });
                menu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        menu.classList.add('hidden');
                    });
                });
            }

            // Desktop Resume Dropdown Click / Touch toggle
            const resumeDropdownBtn = document.getElementById('resume-dropdown-btn');
            const navDropdown = document.querySelector('.nav-dropdown');

            if (resumeDropdownBtn && navDropdown) {
                resumeDropdownBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isOpen = navDropdown.classList.toggle('open');
                    resumeDropdownBtn.setAttribute('aria-expanded', isOpen.toString());
                });

                document.addEventListener('click', (e) => {
                    if (!navDropdown.contains(e.target)) {
                        navDropdown.classList.remove('open');
                        resumeDropdownBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                navDropdown.querySelectorAll('a').forEach(item => {
                    item.addEventListener('click', () => {
                        navDropdown.classList.remove('open');
                        resumeDropdownBtn.setAttribute('aria-expanded', 'false');
                    });
                });
            }

            // ===================================
            // SCROLLSPY (INTERSECTION OBSERVER)
            // ===================================
            const navLinks = document.querySelectorAll('.nav-link');
            
            // Map each unique in-page section matching a nav link href
            const sectionMap = new Map();
            navLinks.forEach(link => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                    const section = document.querySelector(targetId);
                    if (section && !sectionMap.has(targetId)) {
                        sectionMap.set(targetId, section);
                    }
                }
            });

            const spySections = Array.from(sectionMap.values());
            const resumeSections = ['skills', 'education', 'courses', 'experience', 'achievements'];

            function setActiveLink(sectionId) {
                const isResumeActive = resumeSections.includes(sectionId);

                // Highlight Resume dropdown button when a child section is active
                document.querySelectorAll('#resume-dropdown-btn, #mobile-dropdown-btn').forEach(btn => {
                    if (isResumeActive) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });

                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }

            if (spySections.length > 0) {
                // IntersectionObserver for high-performance section tracking
                // -80px top offset accounts for sticky navbar
                // -60% bottom offset triggers when the section enters the reading zone
                const scrollSpyObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActiveLink(entry.target.id);
                        }
                    });
                }, {
                    root: null,
                    rootMargin: '-80px 0px -60% 0px',
                    threshold: 0
                });

                spySections.forEach(sec => scrollSpyObserver.observe(sec));

                // Bottom of page detection (activates the final section when page cannot scroll further)
                window.addEventListener('scroll', () => {
                    const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 10);
                    if (atBottom) {
                        const lastSection = spySections[spySections.length - 1];
                        if (lastSection) {
                            setActiveLink(lastSection.id);
                        }
                    }
                }, { passive: true });

                // Smooth scrolling click handler with instant active update
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const targetId = link.getAttribute('href');
                        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                            const targetSection = document.querySelector(targetId);
                            if (targetSection) {
                                e.preventDefault();
                                targetSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                                setActiveLink(targetId.substring(1));
                                history.pushState(null, '', targetId);
                            }
                        }
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

                // Update highlighted section based on the selected category
                const categoryDetails = {
                    'all': {
                        title: 'All Skills',
                        desc: 'A comprehensive view of all my technical tools and technologies. Click individual cards for more details.',
                        icon: '<i class="fa-solid fa-layer-group text-2xl text-[#f6c47e]"></i>'
                    },
                    'frontend': {
                        title: 'Frontend Development',
                        desc: 'Building responsive and interactive user interfaces using HTML, CSS, JavaScript, and modern frameworks.',
                        icon: '<i class="fa-solid fa-desktop text-2xl text-[#38bdf8]"></i>'
                    },
                    'mobile': {
                        title: 'Mobile Development',
                        desc: 'Creating high-performance, cross-platform and native mobile applications with Kotlin, Compose, and React Native.',
                        icon: '<i class="fa-solid fa-mobile-screen text-2xl text-[#a3e635]"></i>'
                    },
                    'backend': {
                        title: 'Backend & API',
                        desc: 'Designing and integrating robust APIs, networking, and server-side logic.',
                        icon: '<i class="fa-solid fa-server text-2xl text-[#f97316]"></i>'
                    },
                    'cms': {
                        title: 'Tools & Collaboration',
                        desc: 'Version control, project management, communication, and collaborative workflow tools.',
                        icon: '<i class="fa-solid fa-toolbox text-2xl text-[#fcd34d]"></i>'
                    },
                    'other': {
                        title: 'Other Technical Skills',
                        desc: 'Problem-solving, UI/UX principles, algorithms, and soft skills essential for software engineering.',
                        icon: '<i class="fa-solid fa-brain text-2xl text-[#db2777]"></i>'
                    }
                };

                if (categoryDetails[category]) {
                    setHighlighted(
                        categoryDetails[category].title,
                        categoryDetails[category].desc,
                        categoryDetails[category].icon,
                        null
                    );
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

            // ===================================
            // 4. PORTFOLIO TAB FILTERING & SHOW MORE
            // ===================================
            const portfolioTabs = document.querySelectorAll('.portfolio-tab-btn');
            const portfolioGrid = document.getElementById('portfolio-grid');
            const portfolioItems = portfolioGrid ? Array.from(portfolioGrid.children).filter(el => el.classList.contains('work-card')) : [];
            const showMoreBtn = document.getElementById('show-more-portfolio-btn');

            let currentFilter = 'all';
            let itemsToShow = 9;
            const step = 9;

            function updatePortfolioDisplay() {
                if (!portfolioGrid) return;
                
                const filteredItems = portfolioItems.filter(item => {
                    const category = item.getAttribute('data-category');
                    return currentFilter === 'all' || category === currentFilter;
                });

                portfolioItems.forEach(item => item.style.display = 'none');

                filteredItems.forEach((item, index) => {
                    if (index < itemsToShow) {
                        item.style.display = 'block';
                    }
                });

                if (showMoreBtn) {
                    if (filteredItems.length > itemsToShow) {
                        showMoreBtn.style.display = 'inline-block';
                    } else {
                        showMoreBtn.style.display = 'none';
                    }
                }
            }

            if(portfolioTabs.length > 0 && portfolioItems.length > 0) {
                updatePortfolioDisplay();

                portfolioTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                        portfolioTabs.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');

                        currentFilter = this.getAttribute('data-filter');
                        itemsToShow = step;
                        updatePortfolioDisplay();
                    });
                });
            }

            if (showMoreBtn) {
                showMoreBtn.addEventListener('click', () => {
                    itemsToShow += step;
                    updatePortfolioDisplay();
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

