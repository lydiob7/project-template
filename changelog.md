### v0.7.0 (In progress)

-   Feature: Move all text to englishContent.js file.
-   Feature: Move socialLinks and general app information to different files.
-   Feature: Move text content to different folder.
-   Feature: Add isPreferredThemeCheckTriggered & isThemeToggable with reducers to uiSlice.
-   Feature: Add conditional rendering of theme Switch on Navbar for isThemeToggable.
-   Feature: Add check on themeProvider for isPreferredThemeCheckTriggered.
-   Feature: Add redux actions to change language and add it on copyright symbol and copyright year on footer.
-   Bugfix: Add default value for onSubmit on SignupForm.
-   Feature: Add terms checkbox on SignupForm.
-   Feature: Add default redirect routes in routes config.
-   Feature: Update auth roles and use them on user slice and internal pages.
-   Feature: Push to correct default page depending on role after login/register on landing page.
-   Feature: Create MainRouteRedirect on utils file.
-   Feature: Add Call Module.
-   Feature: Add Feedback Module.
-   Feature: Update theme.
-   Feature: Update button to accept more custom colors.
-   Feature: Export all components from a single file.
-   Feature: Export everything from a single file within config, layouts and utils folders.
-   Feature: Update AppRoute to redirect to default page when not authenticated.
-   Feature: Update Footer with hide options from uiSlice.
-   Update: Clean page components imports.
-   Feature: Add text provider on home page and translate to spanish.
-   Feature: Add language picker on navbar and option to disable language change.
-   Feature: Add language check component.
-   Feature: Add Modal component.
-   Feature: Add "roles" property on navigation file and support on Navbar and MenuButton components.
-   Feature: Provide text from store on error and mantainance page.
-   Feature: Update Menu Button to support roles.
-   Feature: Give margin top to Toast Message if header is fixed.
-   Feature: Change logo title to h1 for better semantics.
-   Feature: Change navigation tag to nav on Navbar for better semantics.
-   Feature: Add general classes for text sizes and weights.
-   Feature: Add Skip navigation link on Layout default.
-   Feature: Update Title component with proper tags for better semantics.
-   Feature: Update Landing page with correct semantic tag names.
-   Feature: Update Error, Mantainance, Terms, Privacy pages and Auth Card, MailConfirm and ForgotPassword components for better semantic tags.
-   Feature: Update tags on Profile and Settings pages and tabs for better semantics.

### v0.6.2

-   Bugfix: Pass down any other props to component on AppRoute.

### v0.6.1

-   Feature: Add Splash Screen on index.html

### v0.6.0

-   Feature: Add Login page.
-   Feature: Add Register page.
-   Feature: Add Profile page.
-   Feature: Add Settings page.
-   Feature: Add Change Password Tab.
-   Feature: Add Delete Account Tab.
-   Feature: Add Forgot Password Page.
-   Feature: Add Mail Confirmation Message Page.
-   Feature: Update Auth Card Component with forgot password and confirmation.
-   Feature: Add Terms & Conditions page.
-   Feature: Add Privacy Policy page.
-   Feature: Update navigation with new pages.
-   Feature: Add auth logic and auth redux store.
-   Feature: Add firebase service.
-   Feature: Update Results header with pagination.
-   Feature: Update main theme to support thin scrollbar on firefox.
