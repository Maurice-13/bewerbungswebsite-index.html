document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const scrollDownBtn = document.querySelector('.scroll-down-btn');
    const contentContainer = document.querySelector('.content-container');
    const mainNav = document.querySelector('.main-nav');
    const footer = document.querySelector('footer');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    const setContentContainerHeight = () => {
        const navHeight = mainNav.offsetHeight;
        const footerHeight = footer.offsetHeight;
        const viewportHeight = window.innerHeight;
        contentContainer.style.height = `${viewportHeight - navHeight - footerHeight}px`;
    };

    const showSection = (targetId, isScrollDown = false) => {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.transform = 'translateY(100%)';
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
            section.style.zIndex = '1';
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            if (targetId === 'hero-section' && !isScrollDown) {
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
                targetSection.style.visibility = 'visible';
                targetSection.style.zIndex = '3';
            } else if (isScrollDown) {
                window.scrollTo({
                    top: targetSection.offsetTop - mainNav.offsetHeight,
                    behavior: 'smooth'
                });
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
                targetSection.style.visibility = 'visible';
                targetSection.style.zIndex = '2';
            } else {
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.opacity = '1';
                targetSection.style.visibility = 'visible';
                targetSection.style.zIndex = '2';
            }
        }

        navLinks.forEach(link => {
            if (link.dataset.sectionId === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        if (targetSection && targetSection.scrollTop > 0) {
            targetSection.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.sectionId;
            showSection(targetId, false);
        });
    });

    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = scrollDownBtn.dataset.targetId;
            showSection(targetId, true);
        });
    }

    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === 'light') {
        disableDarkMode();
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'hero-section';
    showSection(initialSectionId, false);

    window.addEventListener('resize', setContentContainerHeight);
    setContentContainerHeight();
});