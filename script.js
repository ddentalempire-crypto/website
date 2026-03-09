document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items if needed (optional)
            // faqItems.forEach(i => {
            //     if (i !== item) i.classList.remove('active');
            // });

            item.classList.toggle('active');

            // Toggle icon
            const icon = question.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Fade-in on scroll
    const fadeItems = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeItems.forEach(item => {
        observer.observe(item);
    });

    // Simple sticky header adjustment
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        const logo = document.querySelector('.logo img');
        const headerContainer = header.querySelector('.container');

        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
            headerContainer.style.height = '70px';
            logo.style.height = '50px';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.8)';
            headerContainer.style.height = '100px';
            logo.style.height = '80px';
        }
    });
});
