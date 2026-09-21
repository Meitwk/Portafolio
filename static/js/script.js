document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRADO DE PROYECTOS
    const filterButtons = document.querySelectorAll('#project-filters .btn-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 2. AGRANDAR IMAGEN EN VENTANA FLOTANTE (LIGHTBOX)
    const imageModalElement = document.getElementById('imageViewerModal');
    if (imageModalElement) {
        const imageViewerModal = new bootstrap.Modal(imageModalElement);
        const imageViewerSrc = document.getElementById('imageViewerSrc');
        const imageViewerTitle = document.getElementById('imageViewerTitle');

        document.querySelectorAll('.project-img-box').forEach(box => {
            box.addEventListener('click', () => {
                const img = box.querySelector('img');
                if (img) {
                    imageViewerSrc.src = img.src;
                    imageViewerTitle.textContent = img.alt || 'Vista previa del proyecto';
                    imageViewerModal.show();
                }
            });
        });
    }

    // 3. MODAL DE DETALLES DEL PROYECTO (BOTÓN DETALLES)
    const projectModalElement = document.getElementById('projectModal');
    if (projectModalElement) {
        const projectModal = new bootstrap.Modal(projectModalElement);
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalTech = document.getElementById('modalTech'); // Corrección: se agregó 'const'
        const modalRepo = document.getElementById('modalRepo');
        const modalDemo = document.getElementById('modalDemo');

        document.querySelectorAll('.open-modal-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalTitle.textContent = btn.getAttribute('data-title') || '';
                modalDesc.textContent = btn.getAttribute('data-desc') || '';
                
                if (modalTech) {
                    modalTech.textContent = btn.getAttribute('data-tech') || '';
                }
                
                if (modalRepo) {
                    modalRepo.setAttribute('href', btn.getAttribute('data-repo') || '#');
                }

                const demoUrl = btn.getAttribute('data-demo');
                if (modalDemo) {
                    if (demoUrl) {
                        modalDemo.setAttribute('href', demoUrl);
                        modalDemo.style.display = 'inline-block';
                    } else {
                        modalDemo.style.display = 'none';
                    }
                }

                projectModal.show();
            });
        });
    }

    // 4. VALIDACIÓN DE FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const mensaje = document.getElementById('mensaje');
            let valid = true;

            if (nombre && !nombre.value.trim()) {
                nombre.classList.add('is-invalid');
                valid = false;
            } else if (nombre) {
                nombre.classList.remove('is-invalid');
            }

            if (email && !email.value.includes('@')) {
                email.classList.add('is-invalid');
                valid = false;
            } else if (email) {
                email.classList.remove('is-invalid');
            }

            if (mensaje && mensaje.value.trim().length < 10) {
                mensaje.classList.add('is-invalid');
                valid = false;
            } else if (mensaje) {
                mensaje.classList.remove('is-invalid');
            }

            if (valid && formAlert) {
                formAlert.classList.remove('d-none');
                contactForm.reset();
                setTimeout(() => formAlert.classList.add('d-none'), 4000);
            }
        });
    }

});