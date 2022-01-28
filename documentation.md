# Smart Studios UI - Documentation

[Project description](/README.md)

## Table of Contents

- [Smart Studios UI - Documentation](#smart-studios-ui---documentation)
  - [Table of Contents](#table-of-contents)
  - [Config files](#config-files)
    - [Routing](#routing)
    - [Navigation menus and submenus](#navigation-menus-and-submenus)
    - [Theme](#theme)
  - [Auth module](#auth-module)
- [UI Components](#ui-components)
  - [General Components](#general-components)
    - [AppRoute](#approute)
    - [Auth](#auth)
    - [AuthCard](#authcard)
    - [AuthUserCard](#authusercard)
    - [AuthUserSmallCard](#authusersmallcard)
    - [Breadcrumb](#breadcrumb)
    - [Button](#button)
    - [ChangePasswordTab](#changepasswordtab)
    - [CheckboxWidget](#checkboxwidget)
    - [ConfirmationModal](#confirmationmodal)
    - [ContentCard](#contentcard)
    - [Copyright](#copyright)
    - [CopyrightMenu](#copyrightmenu)
    - [DeleteAccountTab](#deleteaccounttab)
    - [ForgotPassword](#forgotpassword)
    - [FormCard](#formcard)
    - [GeneralSettingsTab](#generalsettingstab)
    - [ImageModal](#imagemodal)
    - [ItemCard](#itemcard)
    - [ItemHorizontal](#itemhorizontal)
    - [KeyInfoTab](#keyinfotab)
    - [Loader](#loader)
    - [LoginForm](#loginform)
    - [Logo](#logo)
    - [MailConfirmPage](#mailconfirmpage)
    - [MenuButton](#menubutton)
    - [OtherGeneralTab](#othergeneraltab)
    - [PageHeader](#pageheader)
    - [ReportItemModal](#reportitemmodal)
    - [ResultsHeader](#resultsheader)
    - [ScrollTopBtn](#scrolltopbtn)
    - [SearchInput](#searchinput)
    - [SignupForm](#signupform)
    - [SimpleCard](#simplecard)
    - [SmallCard](#smallcard)
    - [SocialProfile](#socialprofile)
    - [Switch](#switch)
    - [TagsWidget](#tagswidget)
    - [Title](#title)
    - [TitleDecoration](#titledecoration)
    - [ToastMessage](#toastmessage)
    - [ToggableArrayInput](#toggablearrayinput)
    - [ToggableAutocomplete](#toggableautocomplete)
    - [ToggableInput](#toggableinput)
    - [ToggablePicker](#toggablepicker)
    - [ToggableSelect](#toggableselect)
    - [WidgetWrapper](#widgetwrapper)
  - [Composite Components](#composite-components)
    - [Footer](#footer)
    - [GeneralHeader](#generalheader)
    - [ItemsList](#itemslist)
    - [LayoutDefault](#layoutdefault)
    - [Navbar](#navbar)
    - [NoLayout](#nolayout)
    - [RoutesSwitch](#routesswitch)
- [Pages](#pages)
    - [ErrorPage](#errorpage)
    - [LandingPage](#landingpage)
    - [MainainancePage](#mainainancepage)
    - [PrivacyPolicy](#privacypolicy)
    - [ProfilePage](#profilepage)
    - [SettingsPage](#settingspage)
    - [SplashScreen](#splashscreen)
    - [TermsAndConditions](#termsandconditions)
- [Redux Store](#redux-store)
  - [Configuration](#configuration)
  - [Reducers](#reducers)
    - [UI Reducer](#ui-reducer)
    - [Auth Reducer](#auth-reducer)
    - [Messages Reducer](#messages-reducer)
    - [Custom Reducers](#custom-reducers)
  - [Middlewares](#middlewares)
    - [API Middleware](#api-middleware)
- [Services](#services)
  - [Firebase](#firebase)

## Config files

### Routing

The routes are manages on _src/config/routesConfig.js_. You can use the same properties that the custom AppRoute component accepts (see below) and also a _redirectTo_ property that accepts a uri string for the internal route to redirect to.

### Navigation menus and submenus

The file _src/config/navigationConfig.js_ contains an object with the names and links for every section on the website. These are going to be shown on the Navigation Bar component as well as in the footer if needed and other sections.

### Theme

The theme provider is in _src/components/theme.js_. It wraps all the App and applies the default theme for Material UI + the customization made on _src/components/theme/theme.js_. By default the theme color scheme is the same as the user preferred color scheme but it can be toggled on the ui slice of the redux store. If you want to remove the user scheme check it can be done on _src/components/themeProvider.js_.

## Auth module

The auth module contains a file with all the roles supported and a main file (_auth/Auth.js_) which wrapps the entire app.

This Auth component is in charge to initialize firebase (or any other service implemented), check if the user is logged in and update the auth store if the user is authenticated.

While it does all this it renders a [Splash Screen](#splashscreen) with a spinner. To make the loading of this initial page faster there is a copy of the same Splash Screen inside the _index.html_ file. If you want to customize it remember to update both the html file as the React Component.

# UI Components

## General Components

### AppRoute

This component is built over a Route component from react-router-dom, it adds a layout that can be disabled if needed and parse the path to have the PUBLIC*URL before the URI. You can also indicate a private route and it will check the user state from the auth slice on the redux store. If the mantainanceMode on the ui slice of the redux store is \_true* then all the routes will redirect to the mantainance page.

```
import AppRoute from 'utils/AppRoute';

<AppRoute
    component={Home}
    footer={false}
    layout={false}
    noLayoutBtn={true}
    noLayoutFooter={true}
    privateRoute={true}
    redirectRoute="/some-public-uri"
    scrollBtn={false}
/>
```

| **Name**       | **Type**       | **Default** | **Description**                                                                                                                                                                                             |
| -------------- | -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| component\*    | ReactComponent | -           | A React Component to be rendered when the location match the path (see react-router-dom documentation)                                                                                                      |
| footer         | boolean        | -           | You can disable the footer for the main layout here for each individual route                                                                                                                               |
| layout         | boolean        | true        | You can manage the default layout on _src/layouts/LayoutDefault.js_ and the simplest layout on _src/layouts/NoLayout.js_. By default the _NoLayout.js_ file contains the footer and the ScrollTopBtn anyway |
| noLayoutFooter | boolean        | -           | You can enable the footer for the simple layout here (when layout=false) for each individual route                                                                                                          |
| noLayoutBtn    | boolean        | -           | You can enable the scroll to top button for the simple layout here (when layout=false) for each individual route                                                                                            |
| privateRoute   | boolean        | false       | If you want to make this route private turn this property to true, it will check the authentication from the auth slice of the store                                                                        |
| redirectRoute  | uri            | '/'         | Pass down a custom page path to redirect on a private route                                                                                                                                                 |
| scrollBtn      | boolean        | -           | You can disable the scroll to top button for the main layout here for each individual route                                                                                                                 |

### Auth

This components wraps the the whole application. It provides an authentication check and displays a [Splash Screen](#splashscreen) while it's doing it.

```
import { Auth } from './auth';

<Auth>
    <RoutesSwitch />
</Auth>
```

| **Name** | **Type**                 | **Default** | **Description**                               |
| -------- | ------------------------ | ----------- | --------------------------------------------- |
| children | ReactNode \| HTMLElement | -           | Pass all the routes inside of this component. |

### AuthCard

This components wraps the Login or Signup form. It shows the app title and logo (from the ui slice of the store) and some text with a link to toggle within [login](#loginform)/[signup](#signupform)/[forgot-password](#forgotpassword) pages.

```
import AuthCard from 'components/cards/AuthCard';

<AuthCard
    form="signup"
    onSubmit={(values) => authenticate(values)}
/>
```

| **Name** | **Type**                            | **Default** | **Description**                                                             |
| -------- | ----------------------------------- | ----------- | --------------------------------------------------------------------------- |
| form     | 'login' \| 'signup' \| 'forgot-pwd' | 'login'     | You can choose wheter to show the login, signup or the forgot password form |
| onSubmit | function                            | -           | Function that will be triggered on submit                                   |

### AuthUserCard

This is a component that takes de user information from the user slice of the redux store and displays the profile picture, name and email. You can also choose to show some links on the bottom of the card.

```
import AuthUserCard from 'components/cards/AuthUserCard';

<AuthUserCard
    items=[{
        path: '/profile',
        title: 'Profile page'
    }]
/>
```

| **Name** | **Type**  | **Default** | **Description**                                                              |
| -------- | --------- | ----------- | ---------------------------------------------------------------------------- |
| items    | NavItem[] | -           | List of navigation items to be displayed as links at the bottom of the card. |

**NavItem**

| **Name** | **Type**   | **Default** | **Description**                     |
| -------- | ---------- | ----------- | ----------------------------------- |
| path     | url \| uri | -           | Url to be redirected on item click  |
| title    | string     | -           | Text to be used for navigation item |

### AuthUserSmallCard

This is a component that takes de user information from the user slice of the redux store and displays the profile picture, name and email in a compact fashion. You can choose an action to trigger on click (thought to be used as a dropdown menu button)

```
import AuthUserSmallCard from 'components/cards/AuthUserSmallCard';

<AuthUserSmallCard
    onClick={() => openModal()}
/>
```

| **Name** | **Type** | **Default** | **Description**                         |
| -------- | -------- | ----------- | --------------------------------------- |
| onClick  | function | -           | Function to be triggered on card click. |

### Breadcrumb

This component shows the title of the page with an icon on top, a description and a breadcrumb with internal links to the parent pages. It can also receive children to show below the description.

```
import Breadcrumb from 'components/headings/Breadcrumb';

<Breadcrumb
    currentPgIcon={<Icon />}
    currentPgTitle="Current page title"
    divider="/"
    parentPgLink="/parent-page"
    parentPgTitle="Parent page"
>
    <div>
        Some children
    </div>
</Breadcrumb>
```

| **Name**       | **Type**                      | **Default** | **Description**                                            |
| -------------- | ----------------------------- | ----------- | ---------------------------------------------------------- |
| children       | ReactComponent \| HTMLElement | -           | React components or HTML Element to show after the heading |
| currentPgIcon  | svgIcon                       | -           | An icon to show at the top of the header                   |
| currentPgTitle | string                        | -           | Name of the current page                                   |
| divider        | string                        | '-'         | Symbol to use to separate breadcrumb elements              |
| parentPgLink   | url                           | -           | Link to the parent section                                 |
| parentPgTitle  | string                        | -           | Name of the parent section                                 |

### Button

This component is built over the Material UI Button and it only extends its properties. You can still use all the same props you would use on a Material UI Button.

```
import Button from 'components/common/Button';

<Button
    color="danger"
/>
```

| **Name** | **Type**                              | **Default** | **Description** |
| -------- | ------------------------------------- | ----------- | --------------- |
| color    | (All the MuiButton props) \| 'danger' | 'primary'   | -               |

### ChangePasswordTab

This is a component that displays two password fields to renew the user credentials.

```
import ChangePasswordTab from 'components/profile/ChangePasswordTab';

<ChangePasswordTab
    onSubmit={(password) => changePassword(password)}
/>
```

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| onSubmit | function | -           | Function that will be triggered on submit |

### CheckboxWidget

This is a widget that shows a list of checkboxes with a label and some aditional information.

```
import CheckboxWidget from 'components/widgets/CheckboxWidget';

<CheckboxWidget
    items={[
        {text: 'checkbox1', active: true, number: 3},
        {text: 'checkbox2', active: false, number: 1},
        {text: 'checkbox3', active: false}
    ]}
    onChange={(ev) => console.log(ev.target.value)}
    title="Widget 1"
/>
```

| **Name** | **Type**       | **Default** | **Description**                                  |
| -------- | -------------- | ----------- | ------------------------------------------------ |
| items    | CheckboxItem[] | -           | Main array of items to show as checkbox          |
| onChange | function       | -           | Pass down the function to run on checkbox change |
| title    | string         | -           | Main title of the widget                         |

**CheckboxItem**

| **Name** | **Type** | **Default** | **Description**                                                   |
| -------- | -------- | ----------- | ----------------------------------------------------------------- |
| active   | boolean  | false       | Wether the checkbox is active or not by default.                  |
| number   | number   | -           | You can show a small round label on the right to show quantities. |
| text     | string   | -           | Label to show next to the checkbox                                |

### ConfirmationModal

Modal component for any kind of confirmation

```
import ConfirmationModal from 'components/modals/ConfirmationModal';

<ConfirmationModal
    actionButtonText="Remove"
    confirmationType="deletion",
    message="Do you want to delete this?",
    onClose={() => setModal(false)},
    onSubmit={() => console.log('done')},
    open={false},
/>
```

| **Name**         | **Type**              | **Default**                                              | **Description**                                                           |
| ---------------- | --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| actionButtonText | string                | 'Delete'                                                 | This is the text that will be rendered inside the confirmation button.    |
| confirmationType | 'delete' \| 'confirm' | 'delete'                                                 | This string will be shown on the modal title 'Confirm {confirmationType}' |
| message          | string                | 'Are you sure you want to delete permanently this item?' | Write a small question type text to show as content in the modal          |
| onClose          | function              | -                                                        | Handle the modal closure from here.                                       |
| onSubmit         | function              | -                                                        | Indicate what you want to do after confirmation.                          |
| open             | boolean               | false                                                    | -                                                                         |

### ContentCard

This is a simple wrapper component with a header and a title.

```
import ContentCard from 'components/cards/ContentCard';

<ContentCard
    className="card"
    style={{margin: '0 auto'}}
    title="Card title"
>
    <SomeChild />
</ContentCard>
```

| **Name**  | **Type**                      | **Default** | **Description**                                          |
| --------- | ----------------------------- | ----------- | -------------------------------------------------------- |
| className | string                        | -           | Class name to be passed down to wrapper element          |
| children  | ReactComponent \| HTMLElement | -           | Components to be rendered inside the card                |
| style     | object                        | -           | Valid style object to be passed down to wrapper element. |
| title     | string                        | -           | Title for the card                                       |

### Copyright

This is the copyright claim, it contains a copyright symbol, the name of the rights owner and the last year for the copyrights. It's built to be used on the footer of the page.

```
import Copyright from 'components/common/footer/Copyright';

<Copyright
    rightsOwner="Smart Studios"
    rightsOwnerWebsite="https://smartstudios.io/"
    version="1.0.0"
    year="2021"
/>
```

| **Name**           | **Type**         | **Default**    | **Description**                   |
| ------------------ | ---------------- | -------------- | --------------------------------- |
| rightsOwner        | string           | -              | App Owner's name                  |
| rightsOwnerWebsite | url              | -              | Url for the App Owner's website   |
| version            | string           | -              | App version                       |
| year               | string \| number | (Current year) | Last year of the copyrights claim |

### CopyrightMenu

This component holds the menu for the footer. It's a simple list with links.

```
import CopyrightMenu from 'components/common/footer/CopyrightMenu';

<CopyrightMenu
    menus={[
        {
            path="/section1",
            title="Section 1"
        }
    ]}
/>
```

| **Name** | **Type**   | **Default** | **Description**    |
| -------- | ---------- | ----------- | ------------------ |
| menus    | MenuItem[] | -           | List of menu items |

**MenuItem**

| **Name** | **Type** | **Default** | **Description**         |
| -------- | -------- | ----------- | ----------------------- |
| path     | uri      | -           | Menu item internal path |
| title    | string   | -           | Menu item title         |

### DeleteAccountTab

This is a component that displays a text field to delete the user account. By default you have to type "delete" to trigger the submit button.

```
import DeleteAccountTab from 'components/profile/DeleteAccountTab';

<DeleteAccountTab
    onSubmit={() => deleteUserAccount(userId)}
/>
```

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| onSubmit | function | -           | Function that will be triggered on submit |

### ForgotPassword

This is a component that shows a Forgot Password form with an email field and a submit button.

```
import ForgotPassword from 'pages/account/ForgotPassword';

<ForgotPassword
    onSubmit={(email) => sendResetLink(email)}
/>
```

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| onSubmit | function | -           | Function that will be triggered on submit |

### FormCard

This is a wrapper component for any Form. It uses react-hook-forms and yup validation and directly controls the toggable form components.

```
import FormCard from 'components/cards/FormCard';

<FormCard
    className="card"
    formMode="onSubmit"
    inputFields={[
        {
            Component: ToggableInput,
            label: 'input'
            name: 'input'
            required: true,
        }
    ]}
    onSubmit={handleSubmit}
    schema={{firstName: yup.string().required(), lastName: yup.string()}}
    style={{margin: '0 auto'}}
    title="Card title"
    values={{ firstName: 'John', lastName: 'Doe' }}
/>
```

| **Name**       | **Type**                                             | **Default** | **Description**                                                                                                                                                                                  |
| -------------- | ---------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className      | string                                               | -           | Class name to be passed down to wrapper element                                                                                                                                                  |
| formMode       | string (react-hook-forms valid property for useForm) | 'onChange'  | This option allows you to configure the validation strategy before user submit the form (onSubmit event). Read more on [react-hook-forms documentation](https://react-hook-form.com/api/useform) |
| inputFields \* | FormInput[]                                          | -           | Array of objects with the form Component and their props.                                                                                                                                        |
| onSubmit       | function                                             | -           | Function to trigger on submit                                                                                                                                                                    |
| schema         | object                                               | -           | Object with the shape for Yup validation                                                                                                                                                         |
| style          | object                                               | -           | Valid style object to be passed down to wrapper element.                                                                                                                                         |
| title          | string                                               | -           | Title for the card                                                                                                                                                                               |
| values         | object                                               | -           | Object with default values for the form                                                                                                                                                          |

**FormInput**

| **Name**  | **Type**     | **Default** | **Description**                         |
| --------- | ------------ | ----------- | --------------------------------------- |
| Component | ReactElement | -           | Use any of the toggable form Components |

_(The rest of properties are the same as the React Component used except for control, onSubmit and handleSubmit that are passed down by default from the FormCard Component)_

### GeneralSettingsTab

This is a component that displays a menu on the left to change between the change password and delete account components that will be displayed on the right side. Also it has a link to the Profile Page.

```
import GeneralSettingsTab from 'components/profile/GeneralSettingsTab';

<GeneralSettingsTab />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### ImageModal

This is a Modal to display an Image or a PDF file.

```
import ImageModal from 'components/modals/ImageModal';

<ImageModal
    imageUrl="https://someimage.jpg/
    onClose={() => setIsModalVisible(false)}
    open={isModalVisible}
/>

```

| **Name** | **Type** | **Default** | **Description**                            |
| -------- | -------- | ----------- | ------------------------------------------ |
| imageUrl | string   | -           | Url string for the image or pdf to display |
| onClose  | function | -           | Function to call on modal close            |
| open     | boolean  | false       | Visibility state for the modal component.  |

### ItemCard

This component displays a rectangle card with an image on top, a title, description and a button to an external website.

```
import ItemCard from 'components/cards/ItemCard';

<ItemCard
    item={{
        abstract: "This is a description"
        id: 1
        categories: [{
            logo: <Icon />
            title: "Category 1"
        }]
        logo: 'images/logo.svg'
        title: "Item 1"
        url: "https://some-address.com/"
    }}
/>
```

| **Name** | **Type** | **Default** | **Description**                             |
| -------- | -------- | ----------- | ------------------------------------------- |
| item     | Item     | -           | Item object with title and image to display |

**Item**

| **Name**   | **Type**         | **Default** | **Description**                                |
| ---------- | ---------------- | ----------- | ---------------------------------------------- |
| abstract   | string           | -           | Small description for the item                 |
| categories | Category[]       | -           | List of categories to show on top of the title |
| id         | string \| number | -           | Object id to recreate path                     |
| logo       | imgUrl           | -           | Image to display on the header of the card     |
| title      | string           | -           | Main title of the item                         |
| url        | url              | -           | External url to link in the bottom button      |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| logo     | svgIcon  | -           | Category icon   |
| title    | string   | -           | Category title  |

### ItemHorizontal

This component displays a horizontal rectangle with an image on the left, a title, description and a button to an external website.

```
import ItemHorizontal from 'components/cards/ItemHorizontal';

<ItemHorizontal
    item={{
        abstract: "This is a description"
        id: 1
        categories: [{
            logo: <Icon />
            title: "Category 1"
        }]
        logo: 'images/logo.svg'
        title: "Item 1"
        url: "https://some-address.com/"
    }}
/>
```

| **Name** | **Type** | **Default** | **Description**                             |
| -------- | -------- | ----------- | ------------------------------------------- |
| item     | Item     | -           | Item object with title and image to display |

**Item**

| **Name**   | **Type**         | **Default** | **Description**                                |
| ---------- | ---------------- | ----------- | ---------------------------------------------- |
| abstract   | string           | -           | Small description for the item                 |
| categories | Category[]       | -           | List of categories to show on top of the title |
| id         | string \| number | -           | Object id to recreate path                     |
| logo       | imgUrl           | -           | Image to display on the header of the card     |
| title      | string           | -           | Main title of the item                         |
| url        | url              | -           | External url to link in the bottom button      |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| logo     | svgIcon  | -           | Category icon   |
| title    | string   | -           | Category title  |

### KeyInfoTab

This is a component that displays the main user information. It has a "Key information" and "Work" cards with text fields.

```
import KeyInfoTab from 'components/profile/KeyInfoTab';

<KeyInfoTab
    setIsDataChanged={() => setIsDataChanged(true)}
/>
```

| **Name**         | **Type** | **Default** | **Description**                                                   |
| ---------------- | -------- | ----------- | ----------------------------------------------------------------- |
| setIsDataChanged | function | -           | Function to be called when the data on any of the fields changes. |

### Loader

This is a component that displays a spinner.

```
import Loader from 'components/common/Loader';

<Loader
   loading={false}
/>
```

| **Name** | **Type** | **Default** | **Description**              |
| -------- | -------- | ----------- | ---------------------------- |
| loading  | boolean  | true        | Pass down the loading state. |

### LoginForm

This is a component that shows a Login form with email and password fields and a submit button.

```
import LoginForm from 'components/forms/LoginForm';

<LoginForm
    onSubmit={(values) => authenticate(values)}
/>
```

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| onSubmit | function | -           | Function that will be triggered on submit |

### Logo

This is the main Logo of the page. It can contain an image with a brand name or just the name. It's built to be used on the top navigation bar.

```
import Logo from 'components/common/Logo';

<Logo
    imageSrc="/images/logo.svg"
    title="Smart Studios UI"
/>
```

| **Name** | **Type** | **Default** | **Description**        |
| -------- | -------- | ----------- | ---------------------- |
| imageSrc | imgUrl   | -           | Url for the brand logo |
| title    | string   | -           | Brand title            |

### MailConfirmPage

This is the mail confirmation tab for the "forgot password" flow. You can indicate a function to re send the e-mail.

```
import MailConfirmPage from 'pages/account/MailConfirmPage';

<MailConfirmPage
    onSubmit={() => {console.log('Mail sent!')}}
/>
```

| **Name** | **Type** | **Default** | **Description**                                           |
| -------- | -------- | ----------- | --------------------------------------------------------- |
| onSumbit | function | -           | You can pass down a function to call to resend the e-mail |

### MenuButton

This is a component that takes a title and a list of navigation items and displays them as a dropdown menu.

```
import MenuButton from 'components/menus/MenuButton';

<MenuButton
    items=[]
>
    Something
</MenuButton>
```

| **Name** | **Type**  | **Default** | **Description**                                              |
| -------- | --------- | ----------- | ------------------------------------------------------------ |
| children | string    | -           | Text to be displayed on the button element.                  |
| items    | NavItem[] | -           | List of navigation items to be displayed as a dropdown menu. |

**NavItem**

| **Name** | **Type**   | **Default** | **Description**                        |
| -------- | ---------- | ----------- | -------------------------------------- |
| path     | url \| uri | -           | Url to be redirected on click.         |
| title    | string     | -           | Text to be displayed on the menu item. |

### OtherGeneralTab

This is a component that displays a some more information for the user. It has a "General" and "Media" cards with text fields.

```
import OtherGeneralTab from 'components/profile/OtherGeneralTab';

<OtherGeneralTab
    setIsDataChanged={() => setIsDataChanged(true)}
/>
```

| **Name**         | **Type** | **Default** | **Description**                                                   |
| ---------------- | -------- | ----------- | ----------------------------------------------------------------- |
| setIsDataChanged | function | -           | Function to be called when the data on any of the fields changes. |

### PageHeader

This is a page header with title, description, a category and two buttons

```
import PageHeader from 'components/headings/PageHeader';

<PageHeader
    abstract="Small description"
   categories={[
       {
           title: 'Category 1'
       }
   ]}
    primaryBtn={false}
    primaryBtnText='Primary button'
    secondaryBtn={false}
    secondaryBtnText='Secondary button'
    title="Page 1"
    websiteURL="https://some-url.com/"
/>
```

| **Name**         | **Type**   | **Default**     | **Description**                            |
| ---------------- | ---------- | --------------- | ------------------------------------------ |
| abstract         | string     | -               | Small description to show below the title  |
| categories       | Category[] | -               | List of categories to show above the title |
| primaryBtn       | boolean    | true            | Indicate false to hide primary button      |
| primaryBtnText   | string     | 'Visit Website' | Primary button text                        |
| secondaryBtn     | boolean    | true            | Indicate false to hide secondary button    |
| secondaryBtnText | string     | 'Report'        | Secondary button text                      |
| title            | string     | -               | Page title                                 |
| websiteURL       | string     | -               | Main external link for the primary button  |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| title    | string   | -           | Category title  |

### ReportItemModal

This component is a modal with a text input and two buttons to confirm or cancel.

```
import ReportItemModal from 'components/modals/ReportItemModal';

<ReportItemModal
    open={false}
    onClose={() => setIsReportModalOpen(false)}
/>
```

| **Name** | **Type** | **Default** | **Description**                                |
| -------- | -------- | ----------- | ---------------------------------------------- |
| open     | boolean  | -           | Pass down the modal open state.                |
| onClose  | function | -           | Pass down the function to call on modal close. |

### ResultsHeader

This component is a horizontal bar to be displayed on top of a results list. It has a pagination on the left and a view mode control on the right.

```
import ResultsHeader from 'components/common/ResultsHeader';

<ResultsHeader
    onGridViewClick={function}
    onListViewClick={function}
    pagination={{
        firstIndex: number,
        lastIndex: number,
        totalResults: number
    }}
    viewMode={viewMode: 'list' | 'grid'}
/>
```

| **Name**        | **Type**         | **Default** | **Description**                                    |
| --------------- | ---------------- | ----------- | -------------------------------------------------- |
| onGridViewClick | function         | -           | Method to handle the 'on click' of the grid button |
| onListViewClick | function         | -           | Method to handle the 'on click' of the list button |
| pagination      | Pagination       | -           | Number of items, first and last index being shown  |
| viewMode        | 'list' \| 'grid' | 'list'      | Current view mode                                  |

**Pagination**

| **Name**     | **Type** | **Default** | **Description**                              |
| ------------ | -------- | ----------- | -------------------------------------------- |
| firstIndex   | number   | 0           | Index of the first item on the results table |
| lastIndex    | number   | 0           | Index of the last item on the results table  |
| totalResults | number   | 0           | Number of total results in the search        |

### ScrollTopBtn

This component can be used directly on the layout. It's a button only showing when the window is scrolled more than 90% and it scrolls to the top of the page.

```
import ScrollTopBtn from 'components/common/ScrollTopBtn';

<ScrollTopBtn />
```

### SearchInput

This component is a custom search bar.

```
import SearchInput from 'components/forms/SearchInput';

<SearchInput
    onChange={() => doSomething()}
    onSubmit={() => doSomethingElse()}
    placeholder="What are you looking for?"
    searchBtn={true}
    searchBtnText="Submit"
    searchIcon={false}
/>
```

| **Name**      | **Type**          | **Default** | **Description**                                                                                              |
| ------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| onChange      | function          | -           | Method to apply on input change                                                                              |
| onSubmit      | function          | -           | Method to apply on form submit                                                                               |
| placeholder   | string \| boolean | 'Search...' | Text to be displayed inside the search input. You can also disable the placeholder by passing down a _false_ |
| searchBtn     | boolean           | true        | Indicate false to hide the submit button (it can still be submitted on enter)                                |
| searchBtnText | string            | 'Search'    | Text to show on the submit button                                                                            |
| searchIcon    | boolean           | true        | Indicate false to disable the Looking glass icon inside the input area                                       |

### SignupForm

This is a component that shows a Signup form with full name, email, password and password confirmation fields and a submit button.

```
import SignupForm from 'components/forms/SignupForm';

<SignupForm
    onSubmit={(values) => authenticate(values)}
/>
```

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| onSubmit | function | -           | Function that will be triggered on submit |

### SimpleCard

This is a simple square card that displays an icon, a title and a button. The whole component can be used as a link.

```
import SimpleCard from 'components/cards/SimpleCard';

<SimpleCard
    btnText="Learn more"
    href="/some-path"
    icon={<Icon />}
    img="/images/background.jpg"
    title="Item"
/>
```

| **Name** | **Type** | **Default** | **Description**                             |
| -------- | -------- | ----------- | ------------------------------------------- |
| btnText  | string   | -           | Text to be displayed inside the card button |
| href     | uri      | -           | Path to some internal page                  |
| icon     | svgIcon  | -           | Icon to be displayed on top of the name     |
| img      | imgUrl   | -           | Path to the img on the background           |
| title    | string   | -           | Title for the card                          |

### SmallCard

This is a small card only showing an icon and a title.

```
import SmallCard from 'components/cards/SmallCard';

<SmallCard
    item={{
        icon: <Icon />
        title: "Item"
        url: "/some-path"
    }}
/>
```

| **Name** | **Type** | **Default** | **Description**          |
| -------- | -------- | ----------- | ------------------------ |
| item     | Item     | -           | Item to show in the card |

**Item**

| **Name** | **Type** | **Default** | **Description**                         |
| -------- | -------- | ----------- | --------------------------------------- |
| icon     | svgIcon  | -           | Icon to be displayed on top of the name |
| title    | string   | -           | Title for the card                      |
| url      | uri      | -           | Path to some internal page              |

### SocialProfile

This is a simple list with social media icons and links to external websites.

```
import SocialProfile from 'components/other/account/SocialProfile';

<SocialProfile
    socials={[
        {
            icon: 'facebook',
            url: 'https://facebook.com/my-profile/'
        }
    ]}
/>
```

| **Name** | **Type**     | **Default** | **Description**      |
| -------- | ------------ | ----------- | -------------------- |
| socials  | SocialLink[] | -           | List of social media |

**SocialLink**

| **Name** | **Type**                                             | **Default** | **Description**                  |
| -------- | ---------------------------------------------------- | ----------- | -------------------------------- |
| icon     | 'facebook' \| 'twitter' \| 'instagram' \| 'linkedin' | -           | Icon to be displayed on the list |
| url      | url                                                  | -           | External website                 |

### Switch

This is a custom switch component.

```
import Switch from 'components/common/Switch';

<Switch
    checked={true}
/>
```

_**This component only extends the Switch component from MUI so it support the same properties than the other one.**_ [Oficial documentation](https://v4.mui.com/components/switches/#switch)

### TagsWidget

This is a simple Widget that renders a tag cloud.

```
import TagsWidget from 'components/widgets/TagsWidget';

<TagsWidget
    tagList=[
        { url: 'https://www.something.com/', text: 'Tag1' },
        { url: 'https://www.something.com/', text: 'Tag2' }
    ]
    title="Widget title"
/>
```

| **Name** | **Type** | **Default** | **Description**                     |
| -------- | -------- | ----------- | ----------------------------------- |
| tagList  | Tag[]    | -           | List of tags to be displayed        |
| title    | string   | -           | Title to be displayed on the Widget |

**Tag**

| **Name** | **Type** | **Default** | **Description**                   |
| -------- | -------- | ----------- | --------------------------------- |
| text     | string   | -           | Tag text content                  |
| url      | string   | -           | Url to be redirected on tag click |

### Title

This is a simple component with a title and subtitle for any page or section header

```
import Title from 'components/headings/Title';

<Title
    className="title"
    size="small"
    style={{margin: '0 auto'}}
    subtitle={string}
    subtitleSize="large"
    title={string}
/>
```

| **Name**     | **Type**           | **Default** | **Description**                                           |
| ------------ | ------------------ | ----------- | --------------------------------------------------------- |
| className    | string             | -           | Class name to be passed down to external div              |
| size         | 'small' \| 'large' | 'large'     | Size for title typography component                       |
| style        | object             | -           | Any compatible style object to be applied to external div |
| subtitle     | string             | -           | Section/Page description                                  |
| subtitleSize | 'large' \| 'small' | 'small'     | Size for subtitle typography component                    |
| title        | string             | -           | Section/Page title                                        |

### TitleDecoration

This is a simple component for a title underline decoration

```
import TitleDecoration from 'components/headings/TitleDecoration';

<TitleDecoration
    className="custom-decoration"
/>
```

| **Name**  | **Type** | **Default** | **Description**                                 |
| --------- | -------- | ----------- | ----------------------------------------------- |
| className | string   | -           | This will be passed down to the wrapper element |

### ToastMessage

This component is mounted by default on the LayoutDefault and NoLayout Components and displays a message passed down from the messageSlice of the redux store. To trigger a message dispatch a _showMessage()_ action and give it as payload an object with a _message_ and a _variant (optional)_ properties. Eg: _dispatch(showMessage({message: 'My message', variant: 'info'}))_

```
import ToastMessage from 'components/common/ToastMessage';

<ToastMessage />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### ToggableArrayInput

This is a form component that accepts a comma separated string value and display all the separate values on different ways (type property). It has an edit mode that turns the component into a TextField.
It is meant to be used inside a react-hook-form context.

```
import ToggableArrayInput from 'components/forms/ToggableArrayInput';

<ToggableArrayInput
    control={control}
    handleSubmit={handleSubmit}
    InputLabelProps={{color: 'primary'}}
    label="Label"
    multiline={true}
    name="input"
    onSubmit ={onSubmit}
    placeholder="Placeholder"
    required={true}
    requiredLength={3}
    style={{margin: '0 auto'}}
    type="chip"
    value="this, this, and that"
/>
```

| **Name**        | **Type**             | **Default** | **Description**                                                                                                                         |
| --------------- | -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| control         | object               | -           | react-hook-form control from useForm                                                                                                    |
| handleSubmit    | function             | -           | react-hook-form function from useForm                                                                                                   |
| InputLabelProps | object               | -           | Props applied to the InputLabel element. Read more on [MUI documentation](https://v4.mui.com/api/input-label/)                          |
| label           | string               | -           | Label to be rendered on top of the TextField or value.                                                                                  |
| multiline       | boolean              | false       | You can choose if the TextField is going to be multiline or not                                                                         |
| name            | string               | -           | Name to control the field                                                                                                               |
| onSubmit        | function             | -           | You can customize the function that will be triggered on submit.                                                                        |
| placeholder     | string               | -           | Placeholder to be rendered inside the TextField component                                                                               |
| required        | boolean              | false       | If you wish to indicate this field as required it will show a red asterisk next to the label and a red border if no value               |
| requiredLength  | number               | 1           | If required you can indicate the minimum length of the array.                                                                           |
| style           | object               | -           | Any valid style object to be passed down to wrapper element                                                                             |
| type            | 'chip' \| 'location' | -           | This is how the values are going to be displayed, as chips, locations, etc. If you leave this empty it will be a regular list component |
| value           | string               | -           | Pass down the controlled value for the input.                                                                                           |

### ToggableAutocomplete

This is a form component that accepts an array value and display it on different ways (type property). It has an edit mode that turns the component into a Autocomplete component.

```
import ToggableAutocomplete from 'components/forms/ToggableAutocomplete';

<ToggableAutocomplete
    addOption={(value) => pushToDatabase(value)}
    label="Label"
    name="autocomplete-input"
    options=[
        { title: 'First Option' },
        { title: 'Second Option' }
    ]
    onSubmit ={onSubmit}
    placeholder="Placeholder"
    required={true}
    requiredLength={3}
    style={{margin: '0 auto'}}
    type="chip"
    value=["this", "this, "and that"]
/>
```

| **Name**       | **Type**             | **Default** | **Description**                                                                                                                         |
| -------------- | -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| addOption      | function             | -           | Function to trigger for adding new options.                                                                                             |
| label          | string               | -           | Label to be rendered on top of the TextField or value.                                                                                  |
| name \*        | string               | -           | Name to control the field                                                                                                               |
| options        | Option[]             | -           | Array of options to show in the select.                                                                                                 |
| onSubmit       | function             | -           | You can customize the function that will be triggered on submit.                                                                        |
| placeholder    | string               | -           | Placeholder to be rendered inside the Autocomplete component                                                                            |
| required       | boolean              | false       | If you wish to indicate this field as required it will show a red asterisk next to the label and a red border if no value               |
| requiredLength | number               | 1           | If required you can indicate the minimum length of the array.                                                                           |
| style          | object               | -           | Any valid style object to be passed down to wrapper element                                                                             |
| type           | 'chip' \| 'location' | -           | This is how the values are going to be displayed, as chips, locations, etc. If you leave this empty it will be a regular list component |
| value          | array                | -           | Pass down the controlled values for the autocomplete.                                                                                   |

**Option**

| **Name** | **Type** | **Default** | **Description**                                                                          |
| -------- | -------- | ----------- | ---------------------------------------------------------------------------------------- |
| title    | string   | -           | Text to display within the Autocomplete menu and pass as title in the addOption function |

### ToggableInput

This is a form component that accepts a string value and display it on different ways (type property). It has an edit mode that turns the component into a TextField.
It is meant to be used inside a react-hook-form context.

```
import ToggableInput from 'components/forms/ToggableInput';

<ToggableInput
    adornment="$"
    control={control}
    handleSubmit={handleSubmit}
    InputLabelProps={{ color: 'primary'}}
    label="Label"
    multiline={true}
    name="Input"
    onSubmit={onSubmit}
    placeholder="Placeholder"
    required={true}
    style={{margin: '0 auto'}}
    type="link"
    value="Something"
/>
```

| **Name**        | **Type**                                           | **Default** | **Description**                                                                                                                             |
| --------------- | -------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| adornment       | string                                             | -           | You can add an adorment to be rendered at the start of the input                                                                            |
| control         | object                                             | -           | react-hook-form control from useForm                                                                                                        |
| handleSubmit    | function                                           | -           | react-hook-form function from useForm                                                                                                       |
| InputLabelProps | object                                             | -           | Props applied to the InputLabel element. Read more on [MUI documentation](https://v4.mui.com/api/input-label/)                              |
| label           | string                                             | -           | Label to be rendered on top of the TextField or value.                                                                                      |
| multiline       | boolean                                            | false       | You can choose if the TextField is going to be multiline or not                                                                             |
| name            | string                                             | -           | Name to control the field                                                                                                                   |
| onSubmit        | function                                           | -           | You can customize the function that will be triggered on submit.                                                                            |
| placeholder     | string                                             | -           | Placeholder to be rendered inside the TextField component                                                                                   |
| required        | boolean                                            | false       | If you wish to indicate this field as required it will show a red asterisk next to the label and a red border if no value                   |
| style           | object                                             | -           | Any valid style object to be passed down to wrapper element                                                                                 |
| type            | 'email' \| 'date' \| 'link' \| 'location' \| 'tel' | -           | This is how the value is going to be displayed, as a link, location, etc. If you leave this empty it will be a regular Typography component |
| value           | string                                             | -           | Pass down the controlled value for the input.                                                                                               |

### ToggablePicker

This is a form component that accepts a image or pdf url and display it on a modal. It has a picker button to upload the file and accepts a function to delete such file.

```
import ToggablePicker from 'components/forms/ToggablePicker';

<ToggablePicker
    allValues={{
        oneProp: 'Something,
        anotherProp: ['array of', 'something']
    }}
    label="Picker"
    name="picker"
    onFileChange={async (value) => {
        const url = await pushToCloud(value)}
        return url;
        }
    onRemoveFile={() => removeFromCloud()}
    onSubmit={(value) => doSomething(value)}
    required={true}
    style={{ margin: '0 auto' }}
    value="https://www.somesite.com/image.jpg"
/>
```

| **Name**     | **Type** | **Default** | **Description**                                                                                                           |
| ------------ | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| allValues    | object   | -           | Object with all the values of the form (without this the submit function will return only the url of the file submitted)  |
| label        | string   | -           | Label to be rendered on top of the TextField or value.                                                                    |
| name \*      | string   | -           | Name to control the field                                                                                                 |
| onFileChange | function | -           | This function will be triggered on change of the picker input.                                                            |
| onRemoveFile | function | -           | This function will be triggered on click of the remove button.                                                            |
| onSubmit     | function | -           | You can customize the function that will be triggered on submit.                                                          |
| required     | boolean  | false       | If you wish to indicate this field as required it will show a red asterisk next to the label and a red border if no value |
| style        | object   | -           | Any valid style object to be passed down to wrapper element                                                               |
| value        | url      | -           | Pass down the url to show in the modal.                                                                                   |

### ToggableSelect

This is a form component that accepts a string or array value and display it on different ways (type property). It has an edit mode that turns the component into a Select component.
It is meant to be used inside a react-hook-form context.

```
import ToggableSelect from 'components/forms/ToggableSelect';

<ToggableSelect
    control={control}
    handleSubmit={handleSubmit}
    label="Label"
    multiple={true}
    name="input"
    options=[
        { title: 'First Option', value: 1 },
        { title: 'Second Option', value: 2 }
    ]
    onSubmit ={onSubmit}
    required={true}
    requiredLength={3}
    style={{margin: '0 auto'}}
    type="chip"
    value=["this", "this, "and that"]
/>
```

| **Name**       | **Type**             | **Default** | **Description**                                                                                                                         |
| -------------- | -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| control        | object               | -           | react-hook-form control from useForm                                                                                                    |
| handleSubmit   | function             | -           | react-hook-form function from useForm                                                                                                   |
| label          | string               | -           | Label to be rendered on top of the TextField or value.                                                                                  |
| multiple       | boolean              | false       | You can choose if the Select component accepts multiple values or just one                                                              |
| name           | string               | -           | Name to control the field                                                                                                               |
| options        | Option[]             | -           | Array of options to show in the select.                                                                                                 |
| onSubmit       | function             | -           | You can customize the function that will be triggered on submit.                                                                        |
| required       | boolean              | false       | If you wish to indicate this field as required it will show a red asterisk next to the label and a red border if no value               |
| requiredLength | number               | 1           | If required you can indicate the minimum length of the array.                                                                           |
| style          | object               | -           | Any valid style object to be passed down to wrapper element                                                                             |
| type           | 'chip' \| 'location' | -           | This is how the values are going to be displayed, as chips, locations, etc. If you leave this empty it will be a regular list component |
| value          | string \| array      | -           | Pass down the controlled value for the input, make sure to pass down an array if you choose to make the select "multiple".              |

**Option**

| **Name** | **Type** | **Default** | **Description**                           |
| -------- | -------- | ----------- | ----------------------------------------- |
| title    | string   | -           | Text to display within the Select menu    |
| value    | any      | -           | Value to pass down to the submit function |

### WidgetWrapper

This is a component to place around the widgets.

```
import WidgetWrapper from 'components/widgets/WidgetWrapper';

<WidgetWrapper>
    <SomeWidget>
</WidgetWrapper>
```

| **Name** | **Type**                      | **Default** | **Description**                                       |
| -------- | ----------------------------- | ----------- | ----------------------------------------------------- |
| children | ReactComponent \| HTMLElement | -           | These elements will be displayed inside the component |

## Composite Components

### Footer

Contains a Copyright claim, a social media menu and a footer menu (everything is supplied by the store and can be configured from the main text content file, the menu from the navigationConfig file). It also renders the version of the App from the _.env_ file (you should create your own environmental variables, check _.env.example_ for the default variables).

```
import Footer from 'components/common/footer/Footer';

<Footer />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### GeneralHeader

Contains a navigation bar and the Logo (name and logo are supplied by the store and can be configured from the main text content file, the navigation menu from the navigationConfig file)

```
import GeneralHeader from 'components/headings/GeneralHeader';

<GeneralHeader />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### ItemsList

```
import ItemsList from 'components/listings/ItemsList';

<ItemsList
    items={[
        {
            abstract: "This is a description"
            categories: [{
                logo: <Icon />
                title: "Category 1"
            }]
            id: 1
            logo: 'images/logo.svg'
            title: "Item 1"
            url: "https://some-address.com/"
        }
    ]}
    viewMode='grid'
/>
```

| **Name** | **Type**         | **Default** | **Description**               |
| -------- | ---------------- | ----------- | ----------------------------- |
| items    | string           | -           | List of items to be displayed |
| viewMode | 'list' \| 'grid' | 'list'      | Current view mode             |

**Item** (see Item params on ItemHorizontal above)

### LayoutDefault

This component wraps by default all the routes, you can add the components that will be displayed in all the pages. Remember you can also disable the layout on each individual route. On that case the NoLayout component will be used instead.

```
import LayoutDefault from 'layouts/LayoutDefault';

<LayoutDefault
    footer={false}
    scrollBtn={false}
>
    <Component />
</LayoutDefault>
```

| **Name**  | **Type**                      | **Default** | **Description**                                                   |
| --------- | ----------------------------- | ----------- | ----------------------------------------------------------------- |
| children  | ReactComponent \| HTMLElement | ----------- | These are the components that will be displayed inside the layout |
| footer    | boolean                       | true        | You can disable the footer on each individual route               |
| scrollBtn | boolean                       | true        | You can disable the scroll button on each individual page         |

### Navbar

Contains a collapsable menu with the App title (content is supplied from the main text content file and the navigationConfig file)

```
import Navbar from 'components/common/Navbar'

<Navbar
    appTitle="Smart Studios UI"
    menuItems={[
        {
            dropdown: [
                {
                    title: 'Sub Section 1',
                    path: '/section1/subsection1'
                }
            ],
            path: '/section1',
            title: 'Section 1'
        }
    ]}
/>
```

| **Name**  | **Type**   | **Default** | **Description**            |
| --------- | ---------- | ----------- | -------------------------- |
| appTitle  | string     | -           | Brand name                 |
| menuItems | MenuItem[] | -           | List of menus and submenus |

**MenuItem**

| **Name** | **Type**  | **Default** | **Description**            |
| -------- | --------- | ----------- | -------------------------- |
| dropdown | Submenu[] | -           | List of submenus           |
| path     | uri       | -           | Path to some internal page |
| title    | string    | -           | Link name                  |

**Submenu**

| **Name** | **Type** | **Default** | **Description**            |
| -------- | -------- | ----------- | -------------------------- |
| path     | uri      | -           | Path to some internal page |
| title    | string   | -           | Link name                  |

### NoLayout

This component wraps the routes that explicitly has a layout={false}, you can add the components that will be displayed in these cases. By default it contains the footer and a ScrollTopBtn that you can disable.

```
import NoLayout from 'layouts/NoLayout';

<NoLayout
    footer={true}
    scrollBtn={true}
>
    <Component />
</NoLayout>
```

| **Name**  | **Type**                      | **Default** | **Description**                                   |
| --------- | ----------------------------- | ----------- | ------------------------------------------------- |
| children  | ReactComponent \| HTMLElement | -           | Component that will be rendered inside the layout |
| footer    | boolean                       | false       | You can enable here the footer                    |
| scrollBtn | boolean                       | false       | You can enable here the scroll to top button      |

### RoutesSwitch

This component gets the routes array from the _routesConfig.js_ file and returns a react-router-dom Switch with all the appropriate routes.

```
import RoutesSwitch from 'utils/RoutesSwitch'

<RoutesSwitch />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

# Pages

### ErrorPage

This is a default page for any incorrect route. It includes an image and a link button to the home page.

```
import ErrorPage from 'pages/others/ErrorPage';

<ErrorPage
    errorimg="/images/custom-image.svg"
/>
```

| **Name** | **Type** | **Default**       | **Description**                            |
| -------- | -------- | ----------------- | ------------------------------------------ |
| errorimg | imgUrl   | '/images/404.svg' | You can choose a custom image to show here |

### LandingPage

This is a default page for any incorrect route. It includes an image and a link button to the home page.

```
import LandingPage from 'pages/others/LandingPage';

<LandingPage
    form="login"
/>
```

| **Name** | **Type**                                                   | **Default** | **Description**                                                                                                                           |
| -------- | ---------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| form     | 'signup' \| 'login' \| 'forgot-pwd' \| 'mail-confirmation' | 'signup'    | Here you can choose which tab to display on the right side of the page. You can also pass it down as a property on the routesConfig file. |

### MainainancePage

This is a default page for the mantainance mode. It includes a customizable image.

```
import MantainancePage from 'pages/others/MantainancePage';

<MainainancePage
    mantainanceimg="/images/custom-image.svg"
/>
```

| **Name**       | **Type** | **Default**               | **Description**                            |
| -------------- | -------- | ------------------------- | ------------------------------------------ |
| mantainanceimg | imgUrl   | '/images/mantainance.svg' | You can choose a custom image to show here |

### PrivacyPolicy

This is the default privacy policy page. It takes the information to display form the main text content file.

```
import PrivacyPolicy from 'pages/others/PrivacyPolicy';

<PrivacyPolicy />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### ProfilePage

This is the default profile page. It renders the User image, name, email or occupation, a default background image (found on _assets/images/_) and two tabs with basic information.

```
import ProfilePage from 'pages/account/ProfilePage';

<ProfilePage />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### SettingsPage

This is the default account settings page. It renders the User image, name, email or occupation, a default background image (found on _assets/images/_), a link to the profile and two tabs, one for changing the password and one to delete the account.

```
import SettingsPage from 'pages/account/SettingsPage';

<SettingsPage />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### SplashScreen

This is a Screen component which is displayed while the Auth component checks for the service connection and authentication.

```
import SplashScreen from 'components/common/SplashScreen';

<SplashScreen />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### TermsAndConditions

This is the default terms & conditions page. It takes the information to display form the main text content file.

```
import TermsAndConditions from 'pages/others/TermsAndConditions';

<TermsAndConditions />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

# Redux Store

## Configuration

The store contains a main file called _configureStore.js_ which provides a function that is called in the App component and injects the middlewares.

## Reducers

The main reducer file is called _reducer.js_ and combines the entities reducer and the ui reducer.

### UI Reducer

This is the reducer slice responsible for injecting all the text in the app. It has a sidebar with a menu, the app general information, the main content and the footer data. Furthermore it manages the theme color, you can toggle the theme between _'light'_ and _'dark'_. You can also set the _mantainanceMode_ in which case all the routes will be redirected to the mantainance page.

### Auth Reducer

The auth store is the only one that is separate from the rest of the redux store. It is implemented on _auth/store/_ and divided by login, register and user reducers.

The Register slice only manages the signup and success or error state.

The Login slice manages the login itself, success and error state, plus a delete account (call to firebase service, if you implement another service you need to change it).

The User slice has a couple of methods to update the user settings and information plus a logout function (call to firebase service).

### Messages Reducer

This reducer manages the status messages and their content. To trigger a message dispatch a _showMessage()_ action and give it as payload an object with a _message_ and a _variant (optional)_ properties. Eg: _dispatch(showMessage({message: 'My message', variant: 'info'}))_

### Custom Reducers

On the entities file you can add as many reducers as you need. There is a _customReducer.js_ file as an example.

## Middlewares

### API Middleware

This middleware takes care of choosing the api url, calling an action in the beginning of the process, making the ajax call with axios and call another action at the end, either a success or a failure.
Example:

```
dispatch(
    apiCallBegan({
        apiId: 'main' | 'secondary' | 'default',
        data: any,
        method: 'post' | 'get' | 'put' | 'patch' | 'delete',
        onError: reduxAction,
        onStart: reduxAction,
        onSuccess: reduxAction,
        url: string
    })
);
```

# Services

## Firebase

The Smart Studios UI is set up to use firebase by default. You need to provide the firebase project details (set up firestore on firebase console) on your own _.env_ file (there is an example of what variables you need on _.env.example_).

On _/services/firebaseService/firebaseService.js_ you will find the main Class with all the methods to call firebase. It is all set up with basic user data methods (get, update and delete user) plus changing and reseting password, file and image upload (you need to set up firebase storage) and a logout method.

The authentication services are directly implemented within the auth module.
