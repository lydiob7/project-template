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
                submitBtn: 'Send reset link',
                emailRequired: 'Debes introducir un email',
                validEmail: 'Debes introducir una dirección válida de email'
            },
            registerForm: {
                fullNameLabel: 'Full name',
                emailLabel: 'Email',
                passwordLabel: 'Password',
                confirmPwdLabel: 'Confirm Password',
                termsText: 'I Accept the',
                termsLink: 'Terms & Conditions',
                submitBtn: 'Register',
                nameRequired: 'You must enter display name',
                emailRequired: 'You must enter an email',
                validEmail: 'You must enter a valid email',
                passwordRequired: 'Debes introducir una contraseña',
                validPassword: 'Password is too short - should be 8 chars minimum.',
                passwordMatch: 'Passwords must match',
                termsRequired: 'Please accept our Terms & Conditions'
            },
            mailConfirmationMessage: {
                title: 'We sent you an E-mail!',
                sentLinkTo: 'We have sent a link to',
                yourEmailDefault: 'your E-mail.',
                checkInbox: 'Check your inbox and click on the "Reset password" link to update your credentials.',
                didntReceiveEmailText: "Didn't receive the E-mail?",
                didntReceiveEmailLink: 'Re-send',
                goBackToLoginLink: 'Go back to Login',
                mailResentMessage: 'The E-mail has been re-sent'
            }
        }
    },
    navigationMenu: {
        account: 'Account',
        auth: 'Auth',
        error: 'Error Page',
        forgotPassword: 'Forgot Password',
        home: 'Home',
        login: 'Login',
        logout: 'Logout',
        mailConfirmation: 'Mail Confirmation',
        otherPages: 'Other Pages',
        profile: 'Profile',
        register: 'Register',
        settings: 'Account Settings'
    },
    privacyPolicy: {
        title: 'Privacy Policy',
        content: 'This is where the privacy policy will go',
        actionButton: 'Home'
    },
    profilePage: {
        editBtn: 'Edit',
        cancelBtn: 'Cancel',
        saveBtn: 'Save',
        unsavedChangesMessage: 'There are Some Unsaved Changes. Do you want to go Away?',
        unsavedChangesActionBtn: 'Leave',
        generalTab: {
            title: 'General',
            keyInformation: {
                title: 'Key Information',
                firstNameLabel: 'First Name(s)',
                firstNamePlaceholder: 'Eg: John',
                lastNameLabel: 'Last Name(s)',
                lastNamePlaceholder: 'Eg: Doe',
                emailLabel: 'Email',
                emailPlaceholder: 'Eg: john@doe.com',
                phoneLabel: 'Phone number',
                phonePlaceholder: '+39 (351) 548 1875',
                countryLabel: 'Country of residence',
                countryPlaceholder: 'Eg: Malta'
            },
            otherInformation: {
                title: 'Other',
                professionLabel: 'Profession/Role',
                professionPlaceholder: 'Eg: Product Manager'
            }
        },
        workTab: {
            title: 'Work',
            workInformation: {
                workLabel: 'Profession/Role',
                workPlaceholder: 'Eg: Product Manager'
            }
        },
        otherTab: {
            title: 'Other',
            generalInformation: {
                title: 'General'
            },
            moreInformation: {
                title: 'More'
            }
        }
    },
    settingsPage: {
        menu: {
            title: 'Settings',
            profileLink: 'Edit Profile',
            changePwdLink: 'Change Password',
            deleteAccountLink: 'Delete Account'
        },
        changePasswordCard: {
            title: 'Change your password',
            newPasswordLabel: 'New Password',
            passwordConfirmLabel: 'Password (Confirm)',
            submitBtn: 'Change my password',
            newPasswordRequired: 'Please enter your new password.',
            validPassword: 'Password is too short - should be 8 chars minimum.',
            passwordMatch: 'Passwords must match.'
        },
        deleteAccountCard: {
            title: 'Delete your account',
            deleteLabel: 'Write "Delete"',
            submitBtn: 'Delete Account',
            confirmRequired: 'Please write exactly the word "Delete".',
            confirmationWord: 'delete'
        }
    },
    termsAndConditions: {
        title: 'Terms & Conditions',
        content: 'This is where the terms and conditions will go',
        actionButton: 'Home'
    }
};

export default spanishContent;
