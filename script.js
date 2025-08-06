// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Set default to dark theme
document.documentElement.setAttribute('data-theme', 'dark');

// Get saved theme or keep dark as default
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme !== 'dark') {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
updateThemeIcon(savedTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateNavbarBackground();
});

// Function to update navbar background based on current theme
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    } else {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
        }
    }
}

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Mobile Navigation with Enhanced Animation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add pulse animation to hamburger
            hamburger.classList.add('pulse');
            setTimeout(() => {
                hamburger.classList.remove('pulse');
            }, 600);
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});



// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form is now handled by Google Forms
// The embedded Google Form handles its own submission and validation

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation
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

// Observe skill items for animation
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Scroll to top functionality
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(45deg, #4facfe, #00f2fe);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Floating Contact Button
const floatingContact = document.getElementById('floating-contact');

floatingContact.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
    floatingContact.classList.add('bounce');
    setTimeout(() => {
        floatingContact.classList.remove('bounce');
    }, 1000);
});

// Show/hide floating contact button on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        floatingContact.classList.add('show');
    } else {
        floatingContact.classList.remove('show');
    }
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Button Loading States and Ripple Effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add loading state
        const originalText = this.textContent;
        this.style.pointerEvents = 'none';
        this.textContent = 'Loading...';
        
        // Remove loading state after 2 seconds
        setTimeout(() => {
            this.textContent = originalText;
            this.style.pointerEvents = 'auto';
        }, 2000);
    });
});

// Add micro-interactions to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) scale(1)';
    });
});

// Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.carousel = document.getElementById('projects-carousel');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.totalProjects = document.querySelectorAll('.project-card').length;
        this.isMobile = window.innerWidth <= 768;
        this.visibleProjects = this.isMobile ? 1 : 3;
        this.totalSlides = this.isMobile ? this.totalProjects : Math.max(1, this.totalProjects - this.visibleProjects + 1);
        
        this.init();
        this.generateIndicators();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.updateButtons();
        this.addTouchSupport();
        this.handleResize();
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                this.visibleProjects = this.isMobile ? 1 : 3;
                this.totalSlides = this.isMobile ? this.totalProjects : Math.max(1, this.totalProjects - this.visibleProjects + 1);
                this.currentSlide = 0;
                this.generateIndicators();
                this.updateCarousel();
            }
        });
    }
    
    generateIndicators() {
        const indicatorsContainer = document.getElementById('carousel-indicators');
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.dataset.slide = i;
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
        
        this.indicators = document.querySelectorAll('.indicator');
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.updateCarousel();
        }
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const isMobile = window.innerWidth <= 768;
        
        let translateX;
        if (isMobile) {
            // Mobile: calculate based on actual card width + gap
            const cardWidth = window.innerWidth - 100; // Account for container padding
            const gap = 32; // 2rem gap
            translateX = -this.currentSlide * (cardWidth + gap);
        } else {
            // Desktop: existing logic
            const containerWidth = this.carousel.parentElement.offsetWidth;
            const cardWidth = 350 + 32;
            if (this.currentSlide === this.totalSlides - 1) {
                const totalCarouselWidth = this.totalProjects * cardWidth - 32;
                translateX = -(totalCarouselWidth - containerWidth);
            } else {
                translateX = -this.currentSlide * cardWidth;
            }
        }
        
        this.carousel.style.transform = `translateX(${translateX}px)`;
        
        this.updateIndicators();
        this.updateButtons();
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    updateButtons() {
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsCarousel();
});

// Advanced Search Functionality
class AdvancedSearch {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchClear = document.getElementById('search-clear');
        this.searchData = this.buildSearchIndex();
        this.suggestions = [ 'Python', 'RAG', 'LangChain', 'AI/ML', 'AWS', 'Ollama'];
        
        this.init();
    }
    
    init() {
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showSuggestions());
        this.searchClear.addEventListener('click', () => this.clearSearch());
        
        // Add click-to-close functionality for search icon
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                if (this.searchResults.classList.contains('show')) {
                    this.clearSearch();
                } else {
                    this.searchInput.focus();
                }
            });
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideResults();
            }
        });
        
        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    buildSearchIndex() {
        const data = {
            projects: [
                {
                    title: 'StudyBuddy – An Open Source Alternative to Google’s NotebookLM',
                    description: 'StudyBuddy addresses the challenge of extracting insights from static PDFs by enabling interactive, AI‑powered learning. Designed for students and researchers, it provides contextual Q&A, smart summaries, and topic modeling. Built with FastAPI, FAISS, and Ollama‑powered LLMs, it transforms documents into a secure, open‑source knowledge companion.',
                    technologies: ['LangChain', 'FAISS', 'ollama', 'Python', 'FastAPI','Docling'],
                    section: 'projects'
                },
                {
                    title: 'संवाद : Your Smart Hindi RAG Chatbot',
                    description: 'Sanvad solves the gap in Hindi AI chat systems by enabling contextual Q&A on custom documents. Built with LangChain, FAISS, and Sarvam‑m LLM, it retrieves precise information and delivers accurate Hindi responses. With a plug‑and‑play architecture, Sanvad empowers multilingual document intelligence across local and cloud environments.',
                    technologies: ['Sarvam‑m LLM', 'FAISS', 'LangChain', 'Flask', 'Hugging Face','Streamlit'],
                    section: 'projects'
                },
                {
                    title: 'CodeBuddy : AI-Powered Code & HTML Generator',
                    description: 'CodeBuddy addresses the challenge of converting design layouts into functional code by automating design‑to‑code workflows. Built with LangChain, EasyOCR, and CodeLlama, it extracts layout details from images and generates HTML, Python, SQL, or other languages. This open‑source tool streamlines development, empowering faster, smarter, and customizable code generation.',
                    technologies: ['Langchain', 'Ollama', 'Codellama', 'EasyOCR', 'Streamlit'],
                    section: 'projects'
                },
                {
                    title: 'QwenStack-RAG',
                    description: 'QwenStack‑RAG demonstrates how to transform documents into conversational knowledge using the full Qwen AI stack. It combines Qwen3 embeddings for semantic search, a reranker for passage prioritization, and a 4B LLM for fluent answers. Orchestrated with LangChain, ChromaDB, and Gradio, it delivers scalable, end‑to‑end Wikipedia QA and enterprise search.',
                    technologies: ['Langchain', 'ChromaDB', 'Ollama', 'Gradio', 'Qwen3-Embedding & Reranker'],
                    section: 'projects'
                },
                {
                    title: 'Model Context Protocol (MCP): Standardizing LLM‑Tool Integration',
                    description: 'Model Context Protocol (MCP) solves the challenge of connecting LLMs to real‑world tools by providing a standardized interface for APIs, databases, and services. Acting as a translator layer, MCP abstracts integration complexity, enabling scalable, extensible AI assistants that seamlessly perform tasks beyond text generation in enterprise and developer workflows.',
                    technologies: ['Langchain', 'Python', 'Ollama', 'langchain-mcp-adapters'],
                    section: 'projects'
                },
                {
                    title: 'AI PowerDeck: Your Dynamic Presentation Partner',
                    description: 'AI PowerDeck solves the challenge of creating presentations by using Generative AI and LLMs to automatically design dynamic, context‑aware slides. It enables users to generate compelling, topic‑driven presentations with ease and efficiency, transforming manual slide creation into an intelligent, automated process for education, business, and professional use.',
                    technologies: ['Langchain', 'Python', 'CTransformers', 'Streamlit'],
                    section: 'projects'
                }
                
            ],
            skills: [
                { name: 'Python', category: 'Programming Languages', section: 'skills' },
                { name: 'SQL (MySQL, MSSQL Server)', category: 'Programming Languages', section: 'skills' },
                { name: 'Machine Learning', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'Deep Learning', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'Neural Networks', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'Pandas', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'Data Visualization', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'Exploratory Data Analysis (EDA)', category: 'Machine Learning & Data Science', section: 'skills' },
                { name: 'NLP', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'Transformers', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'Hugging Face', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'Multilingual NLP (Translation, Transcription, Synthesis)', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'BERT', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'SBERT', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'OCR', category: 'Natural Language Processing (NLP)', section: 'skills' },
                { name: 'LLMs (Large Language Models)', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'RAG (Retrieval Augmented Generation)', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'LangChain', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'LangGraph', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'CrewAI', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'Agentic AI', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'LlamaIndex', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'ChromaDB', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'Qdrant', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'FAISS', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'LLMOps', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'Ollama', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'OpenAI', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'Finetuning LLMs', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'PEFT & LoRA', category: 'Generative AI & LLMs', section: 'skills' },
                { name: 'Chatbot Development', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'Workflow Orchestration', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'Prompt Engineering', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'Context Engineering', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'MCP (Model Context Protocol)', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'A2A (Agent to Agent Protocol)', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'Langflow', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'n8n', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'CrewAI', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'Autogen', category: 'AI-Powered Chatbots, Agents & Workflow Automation', section: 'skills' },
                { name: 'FastAPI', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'FlaskAPI', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'Microservices', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'Git', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'GitHub', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'GitLab', category: 'Microservices, Backend & Version Control', section: 'skills' },
                { name: 'LLMOps', category: 'Cloud & Deployment', section: 'skills' },
                { name: 'AWS', category: 'Cloud & Deployment', section: 'skills' },
                { name: 'AWS Bedrock', category: 'Cloud & Deployment', section: 'skills' },
                { name: 'Azure Cloud', category: 'Cloud & Deployment', section: 'skills' },
                { name: 'Azure AI', category: 'Cloud & Deployment', section: 'skills' },
                { name: 'Google Vertex', category: 'Cloud & Deployment', section: 'skills' }
            ],
            experience: [
                {
                    title: 'Associate Consultant (GenerativeAI/Data Science/Software Development)',
                    company: 'Kiya.ai',
                    description: 'I have engineered Generative AI platforms that reduced deployment time by 60%, scaled to 2,500+ users, and boosted automation by 50% through RAG chatbots and LLM workflows. I also designed FinTech AI pipelines improving anomaly detection accuracy by 35% and developed a multilingual UPI app supporting 12+ languages for secure, scalable digital banking.',
                    section: 'experience'
                },
                {
                    title: 'Data Scientist',
                    company: 'Kiya.ai',
                    description: 'As a Data Scientist, I transformed chatbots into RAG‑powered Generative AI assistants, improving response accuracy by 25%, workflow efficiency by 40%, and reducing latency with LangChain, LlamaIndex, and vector databases. I also engineered NLP pipelines and integrated AI solutions across Web2, Web3, and Metaverse, collaborating with 25+ engineers to cut release cycles by 30%.',
                    section: 'experience'
                },
                {
                    title: 'Research Analyst Intern',
                    company: 'Findem',
                    description: 'Improved candidate classification accuracy by 15% through AI‑driven automation, engineered Python workflows boosting preprocessing by 40%, and drove 15% higher lead conversions with targeted outreach.',
                    section: 'experience'
                }
            ]
        };
        
        return data;
    }
    
    handleSearch(query) {
        if (query.length === 0) {
            this.searchClear.classList.remove('show');
            this.hideResults();
            return;
        }
        
        this.searchClear.classList.add('show');
        const results = this.performSearch(query);
        this.displayResults(results, query);
    }
    
    performSearch(query) {
        const searchTerm = query.toLowerCase();
        const results = { projects: [], skills: [], experience: [] };
        
        // Search projects
        this.searchData.projects.forEach(project => {
            const score = this.calculateRelevance(searchTerm, project);
            if (score > 0) {
                results.projects.push({ ...project, score });
            }
        });
        
        // Search skills
        this.searchData.skills.forEach(skill => {
            if (skill.name.toLowerCase().includes(searchTerm) || 
                skill.category.toLowerCase().includes(searchTerm)) {
                results.skills.push(skill);
            }
        });
        
        // Search experience
        this.searchData.experience.forEach(exp => {
            if (exp.title.toLowerCase().includes(searchTerm) || 
                exp.company.toLowerCase().includes(searchTerm) ||
                exp.description.toLowerCase().includes(searchTerm)) {
                results.experience.push(exp);
            }
        });
        
        // Sort projects by relevance
        results.projects.sort((a, b) => b.score - a.score);
        
        return results;
    }
    
    calculateRelevance(searchTerm, project) {
        let score = 0;
        
        // Title match (highest weight)
        if (project.title.toLowerCase().includes(searchTerm)) score += 10;
        
        // Description match
        if (project.description.toLowerCase().includes(searchTerm)) score += 5;
        
        // Technology match
        project.technologies.forEach(tech => {
            if (tech.toLowerCase().includes(searchTerm)) score += 3;
        });
        
        return score;
    }
    
    displayResults(results, query) {
        let html = '';
        
        // Show suggestions if query is short
        if (query.length <= 2) {
            html += this.generateSuggestions(query);
        }
        
        // Display results by category
        if (results.projects.length > 0) {
            html += this.generateCategoryResults('Projects', results.projects, query);
        }
        
        if (results.skills.length > 0) {
            html += this.generateCategoryResults('Skills', results.skills, query);
        }
        
        if (results.experience.length > 0) {
            html += this.generateCategoryResults('Experience', results.experience, query);
        }
        
        if (html === '' && query.length > 2) {
            html = '<div class="search-no-results">No results found for "' + query + '"</div>';
        }
        
        this.searchResults.innerHTML = html;
        this.showResults();
        this.attachResultListeners();
    }
    
    generateSuggestions(query) {
        const matchingSuggestions = this.suggestions.filter(s => 
            s.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        
        if (matchingSuggestions.length === 0) return '';
        
        let html = '<div class="search-suggestions">';
        matchingSuggestions.forEach(suggestion => {
            html += `<span class="search-suggestion" data-suggestion="${suggestion}">${suggestion}</span>`;
        });
        html += '</div>';
        
        return html;
    }
    
    generateCategoryResults(category, items, query) {
        let html = `<div class="search-category">`;
        html += `<div class="search-category-title">${category}</div>`;
        
        items.slice(0, 3).forEach(item => {
            const title = item.title || item.name;
            const description = item.description || item.company || item.category;
            
            html += `<div class="search-item" data-section="${item.section}">`;
            html += `<div class="search-item-title">${this.highlightText(title, query)}</div>`;
            if (description) {
                html += `<div class="search-item-description">${this.highlightText(description, query)}</div>`;
            }
            html += `</div>`;
        });
        
        html += '</div>';
        return html;
    }
    
    highlightText(text, query) {
        if (query.length < 2) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }
    
    attachResultListeners() {
        // Handle suggestion clicks
        document.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                this.searchInput.value = suggestion.dataset.suggestion;
                this.handleSearch(suggestion.dataset.suggestion);
            });
        });
        
        // Handle result clicks
        document.querySelectorAll('.search-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.navigateToSection(section);
                this.clearSearch();
            });
        });
    }
    
    navigateToSection(section) {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showSuggestions() {
        if (this.searchInput.value.length === 0) {
            const html = this.generateSuggestions('');
            this.searchResults.innerHTML = html;
            this.showResults();
            this.attachResultListeners();
        }
    }
    
    showResults() {
        this.searchResults.classList.add('show');
    }
    
    hideResults() {
        this.searchResults.classList.remove('show');
    }
    
    clearSearch() {
        this.searchInput.value = '';
        this.searchClear.classList.remove('show');
        this.hideResults();
        this.searchInput.blur(); // Dismiss mobile keyboard
    }
    
    handleKeyboard(e) {
        // ESC key to close
        if (e.key === 'Escape') {
            this.clearSearch();
            this.searchInput.blur();
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedSearch();
});

// Console greeting
console.log(`
🚀 Welcome to Ishaan Kohli's Portfolio!
📧 Contact: ishaankohli14@gmail.com
🌐 LinkedIn: https://linkedin.com/in/kohli-ishaan/
💻 GitHub: https://github.com/Ginga1402

Thanks for checking out my portfolio! 
Feel free to reach out if you'd like to work together.
`);

