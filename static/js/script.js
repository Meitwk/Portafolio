document.addEventListener('DOMContentLoaded', () => {

    // 1. FILTRADO DE PROYECTOS CORE
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

    // 2. MODAL DE PROYECTOS
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalRepo = document.getElementById('modalRepo');

    document.querySelectorAll('.view-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modalTitle.textContent = btn.getAttribute('data-title');
            modalDesc.textContent = btn.getAttribute('data-desc');
            modalTech.textContent = btn.getAttribute('data-tech');
            modalRepo.setAttribute('href', btn.getAttribute('data-repo'));
            projectModal.show();
        });
    });

    // 3. VALIDACIÓN DE FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        let valid = true;

        if (!nombre.value.trim()) {
            nombre.classList.add('is-invalid');
            valid = false;
        } else {
            nombre.classList.remove('is-invalid');
        }

        if (!email.value.includes('@')) {
            email.classList.add('is-invalid');
            valid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        if (mensaje.value.trim().length < 10) {
            mensaje.classList.add('is-invalid');
            valid = false;
        } else {
            mensaje.classList.remove('is-invalid');
        }

        if (valid) {
            formAlert.classList.remove('d-none');
            contactForm.reset();
            setTimeout(() => formAlert.classList.add('d-none'), 4000);
        }
    });

});