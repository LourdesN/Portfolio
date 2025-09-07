function myFunction() {
    let x = document.getElementById("mynav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

 // Certification data with your actual certifications
        const certifications = [
            {
                id: 1,
                title: "PLP Certification",
                issuer: "Power Learn Project",
                year: "2024",
                description: "Comprehensive software development certification covering full-stack technologies",
                image: "PLP Academy certificate.jpg", 
                issuerLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqlpeRJapdEL4unH7Zu--7ppzrb2Qm7_BMAvkyMJD-MedT2YznAPy2xjI3lQp3kMGqQ&usqp=CAU", 
                badgeIcon: "fas fa-graduation-cap"
            },
            {
                id: 2,
                title: "Code4You Certification",
                issuer: "Code4You Academy",
                year: "2023",
                description: "Advanced programming and software engineering certification",
                image: "Code4You Certificate.jpg", 
                issuerLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmeHGgYmUh1Fj2yIAcGY3KvcUywUu4nlvSSqSWrl84X28GWITDhWHQi-apw02rIgMxLQ&usqp=CAU",
            }
        ];

        // Carousel state
        let currentSlide = 0;
        let slideInterval;
        const slidesToShow = 2; // Show 2 certifications at a time
        const slideDuration = 4000; // 4 seconds

        // Initialize carousel
        function initCarousel() {
            const track = document.getElementById('certification-track');
            const dotsContainer = document.getElementById('progress-dots');
            
            // Clear existing content
            track.innerHTML = '';
            dotsContainer.innerHTML = '';
            
            // Calculate total slides
            const totalSlides = Math.ceil(certifications.length / slidesToShow);
            
            // Create certification cards
            certifications.forEach((cert, index) => {
                const card = document.createElement('div');
                card.className = 'certification-card';
                card.innerHTML = `
                    <div class="relative">
                        <img 
                            src="${cert.image}" 
                            alt="${cert.title} Certificate" 
                            class="certification-image"
                            loading="lazy"
                            onerror="this.src='https://picsum.photos/350/200?random=${index + 1}'"
                        >
                        <div class="certification-badge">
                            <i class="${cert.badgeIcon}"></i>
                        </div>
                    </div>
                    <div class="p-6 text-center">
                        <img 
                            src="${cert.issuerLogo}" 
                            alt="${cert.issuer} Logo" 
                            class="issuer-logo"
                            onerror="this.style.display='none'"
                        >
                        <h3 class="font-bold text-xl text-gray-800 mb-3">${cert.title}</h3>
                        <p class="text-sm text-gray-600 mb-2 font-medium">${cert.issuer}</p>
                        <p class="text-xs text-gray-500 mb-4">Issued: ${cert.year}</p>
                        <p class="text-sm text-gray-700 leading-relaxed mb-4">${cert.description}</p>
                        <div class="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-medium inline-block">
                            Verified Certification
                        </div>
                    </div>
                `;
                track.appendChild(card);
            });
            
            // Create progress dots
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = i === 0 ? 'progress-dot active' : 'progress-dot';
                dot.onclick = () => goToSlide(i);
                dotsContainer.appendChild(dot);
            }
            
            // Start auto-sliding
            startAutoSlide();
        }

        // Navigate to specific slide
        function goToSlide(slideIndex) {
            const totalSlides = Math.ceil(certifications.length / slidesToShow);
            currentSlide = (slideIndex + totalSlides) % totalSlides;
            
            const track = document.getElementById('certification-track');
            const slideWidth = track.children[0].offsetWidth + 30; // width + gap
            track.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`;
            
            // Update active dot
            document.querySelectorAll('.progress-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Reset auto-slide timer
            resetAutoSlide();
        }

        // Next slide
        function nextSlide() {
            const totalSlides = Math.ceil(certifications.length / slidesToShow);
            goToSlide(currentSlide + 1);
        }

        // Previous slide
        function prevSlide() {
            const totalSlides = Math.ceil(certifications.length / slidesToShow);
            goToSlide(currentSlide - 1);
        }

        // Start auto-sliding
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        // Reset auto-slide timer
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        // Pause auto-slide on hover
        document.querySelector('.certification-slider').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        // Resume auto-slide when mouse leaves
        document.querySelector('.certification-slider').addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Initialize on load
        document.addEventListener('DOMContentLoaded', () => {
            initCarousel();
            
            // Responsive adjustments
            function handleResize() {
                const track = document.getElementById('certification-track');
                if (track.children[0]) {
                    const slideWidth = track.children[0].offsetWidth + 30;
                    track.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`;
                }
            }
            
            window.addEventListener('resize', handleResize);
        });
