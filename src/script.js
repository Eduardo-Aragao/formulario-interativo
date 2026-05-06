document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const formMessage = document.getElementById('form_message');
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last_name');
    const birthdateInput = document.getElementById('birthdate');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm_password');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderWrapper = document.getElementById('gender_inputs');

    const createErrorElement = (element) => {
        const next = element.nextElementSibling;
        if (next && next.classList.contains('error-message')) {
            return next;
        }

        const error = document.createElement('small');
        error.className = 'error-message';
        element.parentNode.insertBefore(error, element.nextSibling);
        return error;
    };

    const showError = (input, message) => {
        const wrapper = input.closest('.input-field');
        if (!wrapper) return;
        const errorElement = createErrorElement(wrapper);
        errorElement.textContent = message;
        wrapper.classList.add('error');
    };

    const clearError = (input) => {
        const wrapper = input.closest('.input-field');
        if (!wrapper) return;
        const errorElement = wrapper.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        wrapper.classList.remove('error');
    };

    const showGenderError = (message) => {
        const errorElement = createErrorElement(genderWrapper);
        errorElement.textContent = message;
    };

    const clearGenderError = () => {
        const errorElement = genderWrapper.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    };

    const clearFormMessage = () => {
        formMessage.textContent = '';
        formMessage.className = 'form-message hidden';
    };

    const setFormMessage = (message, isSuccess) => {
        formMessage.textContent = message;
        formMessage.className = `form-message ${isSuccess ? 'success' : 'error'}`;
    };

    const getGenderValue = () => {
        const selectedGender = Array.from(genderInputs).find((input) => input.checked);
        return selectedGender ? selectedGender.value : '';
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const calculateAge = (birthdateValue) => {
        if (!birthdateValue) return 0;
        const birthDate = new Date(birthdateValue);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age -= 1;
        }
        return age;
    };

    const validateForm = () => {
        let valid = true;

        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Informe seu primeiro nome.');
            valid = false;
        } else {
            clearError(nameInput);
        }

        if (lastNameInput.value.trim().length < 2) {
            showError(lastNameInput, 'Informe seu sobrenome.');
            valid = false;
        } else {
            clearError(lastNameInput);
        }

        if (!birthdateInput.value) {
            showError(birthdateInput, 'Informe a sua data de nascimento.');
            valid = false;
        } else if (calculateAge(birthdateInput.value) < 13) {
            showError(birthdateInput, 'É necessário ter pelo menos 13 anos.');
            valid = false;
        } else {
            clearError(birthdateInput);
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, 'Informe o e-mail.');
            valid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Digite um e-mail válido.');
            valid = false;
        } else {
            clearError(emailInput);
        }

        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'A senha deve ter pelo menos 6 caracteres.');
            valid = false;
        } else {
            clearError(passwordInput);
        }

        if (confirmInput.value !== passwordInput.value || confirmInput.value.length === 0) {
            showError(confirmInput, 'As senhas precisam ser iguais.');
            valid = false;
        } else {
            clearError(confirmInput);
        }

        if (!getGenderValue()) {
            showGenderError('Selecione um gênero.');
            valid = false;
        } else {
            clearGenderError();
        }

        return valid;
    };

    const resetValidationStates = () => {
        [nameInput, lastNameInput, birthdateInput, emailInput, passwordInput, confirmInput].forEach(clearError);
        clearGenderError();
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearFormMessage();

        if (validateForm()) {
            setFormMessage('Conta criada com sucesso!', true);
            form.reset();
            resetValidationStates();
        } else {
            setFormMessage('Corrija os campos em vermelho antes de continuar.', false);
        }
    });

    [nameInput, lastNameInput, birthdateInput, emailInput, passwordInput, confirmInput].forEach((input) => {
        input.addEventListener('input', () => {
            clearError(input);
            clearFormMessage();
        });
    });

    genderInputs.forEach((input) => {
        input.addEventListener('change', () => {
            clearGenderError();
            clearFormMessage();
        });
    });
});
