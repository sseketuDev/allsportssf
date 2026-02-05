document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const budgetForm = document.getElementById('budgetForm');
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const serviceCards = document.querySelectorAll('.service-card');
    const contactItems = document.querySelectorAll('.contact-item');
    const budgetFormEl = document.querySelector('.budget-form');
    const socialMedia = document.querySelector('.social-media');
    const contactMap = document.querySelector('.contact-map');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const backToTop = document.getElementById('backToTop');
    const cartFloat = document.getElementById('cartFloat');
    const cartToggle = document.querySelector('.cart-toggle');
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    const sendWhatsAppBtn = document.getElementById('sendWhatsApp');
    const clearCartBtn = document.getElementById('clearCart');
    const statNumbers = document.querySelectorAll('.stat-number');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const teamsSlider = document.querySelector('.teams-slider');

    // Variables globales
    let cart = JSON.parse(localStorage.getItem('allsports_cart')) || [];
    let cartTotal = 0;
    
    // Número de WhatsApp (reemplaza con tu número real)
    const whatsappNumber = "56988593440"; // Formato: código país + número sin +
    
    // Inicializar carrito
    updateCart();

    // Menú toggle para móviles
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Animación del icono
        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'rotate(0)';
        }, 300);
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Header con scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Header con efecto de scroll
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Botón volver arriba
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Efecto parallax
        const parallaxElements = document.querySelectorAll('.hero-shape');
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Animaciones al hacer scroll
        animateOnScroll();
    });

    // Botón volver arriba
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Animación del botón
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Filtro de productos por categoría
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Animación del botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Remover clase active de todos los botones
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filtrar productos
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contador animado de estadísticas
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }, 20);
    }

    // Formulario de presupuesto
    budgetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validación básica
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff5252';
                isValid = false;
            } else {
                field.style.borderColor = '#26a269';
            }
        });
        
        if (isValid) {
            // Mostrar estado de carga
            const submitBtn = this.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            btnText.textContent = 'Enviando...';
            btnLoader.style.display = 'flex';
            submitBtn.disabled = true;
            
            // Simular envío del formulario
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mostrar modal de éxito
            successModal.style.display = 'flex';
            
            // Resetear formulario
            this.reset();
            
            // Restaurar botón
            btnText.textContent = 'Enviar Solicitud';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Resetear bordes
            requiredFields.forEach(field => {
                field.style.borderColor = '';
            });
        } else {
            // Mostrar mensaje de error
            showNotification('Por favor, completa todos los campos requeridos.', 'error');
        }
    });

    // Cerrar modal
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Sistema de carrito
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productCategory = productCard.getAttribute('data-category');
            const productTag = productCard.querySelector('.product-tag').textContent;
            
            // Extraer precio numérico
            const priceText = productPrice.replace(/[^0-9.]/g, '');
            const price = priceText ? parseFloat(priceText) : 0;
            
            // Agregar al carrito
            cart.push({
                id: Date.now() + Math.random(),
                name: productName,
                price: price,
                category: productCategory,
                tag: productTag
            });
            
            // Guardar en localStorage
            saveCartToStorage();
            
            // Actualizar carrito
            updateCart();
            
            // Mostrar notificación
            showNotification(`${productName} agregado al carrito`, 'success');
            
            // Animación del botón
            this.innerHTML = '<i class="fas fa-check"></i> Agregado';
            this.style.background = '#26a269';
            this.style.color = 'white';
            this.style.borderColor = '#26a269';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> ' + 
                    (productPrice.includes('Cotizar') ? 'Cotizar' : 'Agregar');
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 1500);
        });
    });

    // Vaciar carrito
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                cart = [];
                saveCartToStorage();
                updateCart();
                showNotification('Carrito vaciado', 'info');
            }
        });
    }

    // Actualizar carrito
    function updateCart() {
        // Actualizar contador
        cartCount.textContent = cart.length;
        
        // Actualizar total
        cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmount.textContent = '$' + cartTotal.toLocaleString('es-CL');
        
        // Actualizar lista de items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cart.forEach((item) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h5>${item.name}</h5>
                        <p>${item.tag} • ${item.category}</p>
                    </div>
                    <span class="cart-item-price">${item.price > 0 ? '$' + item.price.toLocaleString('es-CL') : 'Consultar'}</span>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Agregar event listeners a los botones de eliminar
            document.querySelectorAll('.cart-item-remove').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-id');
                    removeFromCart(itemId);
                });
            });
        }
    }

    // Eliminar item del carrito
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id != itemId);
        saveCartToStorage();
        updateCart();
        showNotification('Producto eliminado del carrito', 'info');
    }

    // Guardar carrito en localStorage
    function saveCartToStorage() {
        localStorage.setItem('allsports_cart', JSON.stringify(cart));
    }

    // Enviar cotización por WhatsApp
    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Agrega productos al carrito primero', 'error');
                return;
            }
            
            // Crear mensaje para WhatsApp
            const message = createWhatsAppMessage();
            
            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Crear URL de WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Abrir WhatsApp en nueva pestaña
            window.open(whatsappURL, '_blank');
            
            // Mostrar confirmación
            showNotification('Redirigiendo a WhatsApp...', 'success');
            
            // Opcional: Limpiar carrito después de enviar
            setTimeout(() => {
                cart = [];
                saveCartToStorage();
                updateCart();
            }, 3000);
        });
    }

    // Crear mensaje para WhatsApp
    function createWhatsAppMessage() {
        let message = "¡Hola AllSports SF! 👋\n\n";
        message += "Me gustaría solicitar una cotización para los siguientes productos:\n\n";
        
        // Agregar productos
        cart.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `   • Categoría: ${item.category}\n`;
            message += `   • Precio: ${item.price > 0 ? '$' + item.price.toLocaleString('es-CL') : 'A cotizar'}\n`;
            message += `   • Tipo: ${item.tag}\n\n`;
        });
        
        // Agregar total
        message += `*TOTAL ESTIMADO: $${cartTotal.toLocaleString('es-CL')}*\n\n`;
        
        // Información de contacto
        message += "📋 *Información de contacto:*\n";
        message += "Por favor, contáctenme para coordinar los detalles de la compra.\n\n";
        
        // Información adicional
        message += "📍 *Ubicación:* San Felipe, V Región\n";
        message += "⚽ *Para:* Equipo/Club Deportivo\n\n";
        
        message += "¡Gracias! Espero su respuesta. 😊";
        
        return message;
    }

    // Mostrar notificación
    function showNotification(text, type = 'info') {
        // Remover notificación anterior si existe
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.classList.add('fade-out');
            setTimeout(() => existingNotification.remove(), 300);
        }
        
        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        
        // Icono según tipo
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'info') icon = 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${text}</span>
        `;
        
        // Estilos según tipo
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #26a269, #1a5fb4)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ff5252, #ff7800)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #6c757d, #343a40)';
        }
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Control deslizante de equipos
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            teamsSlider.scrollLeft -= 300;
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });

        nextBtn.addEventListener('click', function() {
            teamsSlider.scrollLeft += 300;
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Animaciones al hacer scroll
    function animateOnScroll() {
        // Animación de títulos y subtítulos
        sectionTitles.forEach(title => {
            if (isElementInViewport(title) && !title.classList.contains('animate')) {
                title.classList.add('animate');
            }
        });
        
        sectionSubtitles.forEach(subtitle => {
            if (isElementInViewport(subtitle) && !subtitle.classList.contains('animate')) {
                subtitle.classList.add('animate');
            }
        });
        
        // Animación de tarjetas de servicio
        serviceCards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animate')) {
                card.style.transitionDelay = `${index * 0.1}s`;
                card.classList.add('animate');
            }
        });
        
        // Animación de tarjetas de producto
        productCards.forEach((card, index) => {
            if (isElementInViewport(card) && !card.classList.contains('animate')) {
                card.style.transitionDelay = `${index * 0.1}s`;
                card.classList.add('animate');
            }
        });
        
        // Animación de items de contacto
        contactItems.forEach((item, index) => {
            if (isElementInViewport(item) && !item.classList.contains('animate')) {
                item.style.transitionDelay = `${index * 0.1}s`;
                item.classList.add('animate');
            }
        });
        
        // Animación del formulario
        if (budgetFormEl && isElementInViewport(budgetFormEl) && !budgetFormEl.classList.contains('animate')) {
            budgetFormEl.classList.add('animate');
        }
        
        // Animación de redes sociales
        if (socialMedia && isElementInViewport(socialMedia) && !socialMedia.classList.contains('animate')) {
            socialMedia.classList.add('animate');
        }
        
        // Animación del mapa de contacto
        if (contactMap && isElementInViewport(contactMap) && !contactMap.classList.contains('animate')) {
            contactMap.classList.add('animate');
        }
        
        // Animación de contadores de estadísticas
        statNumbers.forEach(stat => {
            if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        });
    }

    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Efecto de escritura para el hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const highlightedText = heroTitle.querySelector('.highlight').textContent;
        const restOfText = originalText.split(highlightedText).join('');
        
        // Resetear para la animación
        heroTitle.innerHTML = '';
        
        // Animar el texto
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < restOfText.length) {
                heroTitle.innerHTML += restOfText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                // Agregar el texto resaltado con animación
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'highlight';
                highlightSpan.textContent = highlightedText;
                highlightSpan.style.opacity = '0';
                highlightSpan.style.transform = 'scale(0.8)';
                heroTitle.appendChild(highlightSpan);
                
                // Animar el texto resaltado
                setTimeout(() => {
                    highlightSpan.style.transition = 'all 0.5s ease-out';
                    highlightSpan.style.opacity = '1';
                    highlightSpan.style.transform = 'scale(1)';
                }, 300);
            }
        }
        
        // Iniciar animación después de un breve delay
        setTimeout(typeWriter, 500);
    }

    // Efectos hover en tarjetas de equipo
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.team-logo');
            logo.style.transform = 'scale(1.1) rotate(15deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.team-logo');
            logo.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Efectos hover en tarjetas de producto
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.product-image');
            image.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.product-image');
            image.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Newsletter del footer
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            
            if (input.value.trim()) {
                // Animación de éxito
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = '#26a269';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    button.style.background = '';
                    input.value = '';
                }, 2000);
            }
        });
    }

    // Inicializar animaciones al cargar la página
    animateOnScroll();

    // Inicializar contadores
    setTimeout(() => {
        statNumbers.forEach(stat => {
            if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        });
    }, 1000);
});

// Prevenir envío de formularios por defecto
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM' && !e.target.classList.contains('budget-form')) {
        e.preventDefault();
    }
});