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
                
                // Note: Ensure tab buttons have class 'tab-btn'
                const allBtns = document.querySelectorAll('.tab-btn');
                allBtns.forEach(btn => {
                    btn.className = "tab-btn px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-[#2b2d32] text-gray-400 border border-gray-700 hover:border-[#f6c47e] hover:text-white cursor-pointer";
                });
                if (clickedBtn) {
                    clickedBtn.className = "tab-btn active px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-[#f6c47e] text-gray-900 shadow-[0_0_15px_rgba(246,196,126,0.4)] hover:bg-[#f6c47e] cursor-pointer";
                }
            }
        });