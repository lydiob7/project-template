const spanishContent = {
    footer: {
        copyright: 'Todos los derechos reservados',
        menuItems: {
            terms: 'Términos y Condiciones',
            privacyPolicy: 'Política de privacidad'
        }
    },
    landingPage: {
        descriptionTitle: 'Alguna descripción pertinente para esta plataforma',
        steps: [],
        authCard: {
            loginTitle: 'Inicio de Sesión',
            registerTitle: 'Registro',
            forgotPwdTitle: 'Recupera contraseña',
            goBackToLoginLink: 'Volver al Login',
            alreadyHaveAccountText: 'Ya tienes una cuenta?',
            alreadyHaveAccountLink: 'Inicia sesión',
            forgotPwdText: 'Has olvidado tu contraseña?',
            forgotPwdLink: 'Recupera contraseña',
            dontHaveAccountText: 'No tienes una cuenta?',
            dontHaveAccountLink: 'Registrate',
            loginForm: {
                emailLabel: 'Email',
                passwordLabel: 'Contraseña',
                submitBtn: 'Iniciar sesión',
                emailRequired: 'Debes introducir un email',
                validEmail: 'Debes introducir una dirección válida de email',
                passwordRequired: 'Debes introducir una contraseña'
            },
            forgotPwdForm: {
                emailLabel: 'Email',
                submitBtn: 'Enviar link',
                emailRequired: 'Debes introducir un email',
                validEmail: 'Debes introducir una dirección válida de email'
            },
            registerForm: {
                fullNameLabel: 'Nombre completo',
                emailLabel: 'Email',
                passwordLabel: 'Contraseña',
                confirmPwdLabel: 'Confirmar Contraseña',
                termsText: 'Acepto los',
                termsLink: 'Términos y Condiciones',
                submitBtn: 'Registrarse',
                nameRequired: 'Debes introducir tu nombre completo',
                emailRequired: 'Debes introducir un email',
                validEmail: 'Debes introducir una dirección válida de email',
                passwordRequired: 'Debes introducir una contraseña',
                validPassword: 'Contraseña demasiado corta - debe tener mínimo 8 caracteres',
                passwordMatch: 'Las contraseñas tienen que coincidir',
                termsRequired: 'Por favor acepta nuestros Términos y Condiciones'
            },
            mailConfirmationMessage: {
                title: 'Te enviamos un E-mail!',
                sentLinkTo: 'Enviamos un link a',
                yourEmailDefault: 'tu E-mail.',
                checkInbox:
                    'Chequea tu casilla de entrada y haz click en el link "Resetear contraseña" link to update your credentials.',
                didntReceiveEmailText: 'No recibiste el E-mail?',
                didntReceiveEmailLink: 'Re-enviar',
                goBackToLoginLink: 'Volver al Inicio de Sesión',
                mailResentMessage: 'El E-mail ha sido enviado nuevamente'
            }
        }
    },
    navigationMenu: {
        account: 'Cuenta',
        auth: 'Autenticación',
        error: 'Página de Error',
        forgotPassword: 'Recuperar contraseña',
        home: 'Inicio',
        login: 'Inicio de sesión',
        logout: 'Cerrar sesión',
        mailConfirmation: 'Confirmación de E-mail',
        otherPages: 'Otras páginas',
        profile: 'Perfil',
        register: 'Registro',
        settings: 'Configuración'
    },
    privacyPolicy: {
        title: 'Política de Privacidad',
        content: 'Acá es donde van a ir las políticas de privacidad',
        actionButton: 'Inicio'
    },
    profilePage: {
        editBtn: 'Editar',
        cancelBtn: 'Cancelar',
        saveBtn: 'Guardar',
        unsavedChangesMessage: 'Hay cambios sin guardar. Quieres abandonar la página?',
        unsavedChangesActionBtn: 'Abandonar',
        generalTab: {
            title: 'General',
            keyInformation: {
                title: 'Información principal',
                firstNameLabel: 'Nombre(s)',
                firstNamePlaceholder: 'Ej: Juan',
                lastNameLabel: 'Apellido(s)',
                lastNamePlaceholder: 'Ej: Perez',
                emailLabel: 'Email',
                emailPlaceholder: 'Ej: juan@perez.com',
                phoneLabel: 'Teléfono',
                phonePlaceholder: '+54 (221) 485 1875',
                countryLabel: 'País de residencia',
                countryPlaceholder: 'Ej: Argentina'
            },
            otherInformation: {
                title: 'Otros',
                professionLabel: 'Profesión/Rol',
                professionPlaceholder: 'Ej: Productor Musical'
            }
        },
        workTab: {
            title: 'Trabajo',
            workInformation: {
                workLabel: 'Profesión/Rol',
                workPlaceholder: 'Ej: Productor Musical'
            }
        },
        otherTab: {
            title: 'Otros',
            generalInformation: {
                title: 'General'
            },
            moreInformation: {
                title: 'Más'
            }
        }
    },
    settingsPage: {
        menu: {
            title: 'Configuración',
            profileLink: 'Editar Perfil',
            changePwdLink: 'Cambiar contraseña',
            deleteAccountLink: 'Eliminar cuenta'
        },
        changePasswordCard: {
            title: 'Cambiar tu contraseña',
            newPasswordLabel: 'Nueva contraseña',
            passwordConfirmLabel: 'Contraseña (Confirmar)',
            submitBtn: 'Cambiar mi contraseña',
            newPasswordRequired: 'Debes introducir una nueva contraseña',
            validPassword: 'Contraseña demasiado corta - debe tener mínimo 8 caracteres',
            passwordMatch: 'Las contraseñas tienen que coincidir'
        },
        deleteAccountCard: {
            title: 'Eliminar tu cuenta',
            deleteLabel: 'Escribí "Eliminar"',
            submitBtn: 'Eliminar cuenta',
            confirmRequired: 'Por favor escribí exactamente la palabra "Eliminar"',
            confirmationWord: ['eliminar']
        }
    },
    termsAndConditions: {
        title: 'Términos y Condiciones',
        content: 'Acá es dónde van a ir los términos y condiciones',
        actionButton: 'Inicio'
    }
};

export default spanishContent;
