# Smart Studios UI

Current version: v0.4.0

## About

This projects has UI Components to use on a React project with all the styles of Smart Studios and the basic structure with Redux and a basic routing for any App or Website. Is built over Material UI v4 and uses Material Icons as well as Redux Toolkit and react-router-dom for the routing.

## Requirements

You will need a node environment version 14 and React version 16 or above and basic knowledge of React, Redux, Axios and Routing.

## Getting Started

Clone this repository into your local environment and run this script on the console:

```
npm install
```

## Config files

### Routing

The routes are manages on _src/config/routesConfig.js_. You can use the same properties that the custom AppRoute component accepts (see below) and also a _redirectTo_ property that accepts a uri string for the internal route to redirect to.

### Navigation menus and submenus

The file _src/config/navigationConfig.js_ contains an object with the names and links for every section on the website. These are going to be shown on the Navigation Bar component as well as in the footer if needed and other sections.

### Theme

The theme provider is in _src/components/theme.js_. It wraps all the App and applies the default theme for Material UI + the customization made on _src/components/theme/theme.js_. By default the theme color scheme is light but it can be toggled to dark on the ui slice of the redux store.

# UI Components

## General Components

### AppRoute

This component is built over a Route component from react-router-dom, it adds a layout that can be disabled if needed and parse the path to have the PUBLIC*URL before the URI. You can also indicate a private route and it will check the user state from the auth slice on the redux store. If the mantainanceMode on the ui slice of the redux store is \_true* then all the routes will redirect to the mantainance page.

```
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
| layout         | boolean        | true        | You can manage the default layout on _src/layouts/LayoutDefault.js_ and the simplest layout on _src/layouts/NoLayout.js_. By default the _NoLayout.js_ file contains the footer and the ScrollTopBtn anyway |
| privateRoute   | boolean        | false       | If you want to make this route private turn this property to true, it will check the authentication from the auth slice of the store                                                                        |
| redirectRoute  | uri            | '/'         | Pass down a custom page path to redirect on a private route                                                                                                                                                 |
| footer         | boolean        | -           | You can disable the footer for the main layout here for each individual route                                                                                                                               |
| scrollBtn      | boolean        | -           | You can disable the scroll to top button for the main layout here for each individual route                                                                                                                 |
| noLayoutFooter | boolean        | -           | You can enable the footer for the simple layout here (when layout=false) for each individual route                                                                                                          |
| noLayoutBtn    | boolean        | -           | You can enable the scroll to top button for the simple layout here (when layout=false) for each individual route                                                                                            |

### AuthCard

This components wraps the Login or Signup form. It shows the app title and logo (from the ui slice of the store) and some text with a link to toggle within login/signup pages.

```
<AuthCard
    form="signup"
/>
```

| **Name** | **Type**            | **Default** | **Description**                                            |
| -------- | ------------------- | ----------- | ---------------------------------------------------------- |
| form     | 'login' \| 'signup' | 'login'     | You can choose wheter to show the login or the signup form |

### Breadcrumb

This component shows the title of the page with an icon on top, a description and a breadcrumb with internal links to the parent pages. It can also receive children to show below the description.

```
<Breadcrumb
    currentPgIcon={<Icon />}
    currentPgTitle="Current page title"
    parentPgTitle="Parent page"
    parentPgLink="/parent-page"
    divider="/"
>
    <div>
        Some children
    </div>
</Breadcrumb>
```

| **Name**       | **Type**                      | **Default** | **Description**                                            |
| -------------- | ----------------------------- | ----------- | ---------------------------------------------------------- |
| currentPgIcon  | svgIcon                       | -           | An icon to show at the top of the header                   |
| currentPgTitle | string                        | -           | Name of the current page                                   |
| parentPgTitle  | string                        | -           | Name of the parent section                                 |
| parentPgLink   | url                           | -           | Link to the parent section                                 |
| divider        | string                        | '-'         | Symbol to use to separate breadcrumb elements              |
| children       | ReactComponent \| HTMLElement | -           | React components or HTML Element to show after the heading |

### Button

This component is built over the Material UI Button and it only extends its properties. You can still use all the same props you would use on a Material UI Button.

```
<Button
    color="danger"
/>
```

| **Name** | **Type**                              | **Default** | **Description** |
| -------- | ------------------------------------- | ----------- | --------------- |
| color    | (All the MuiButton props) \| 'danger' | 'primary'   | -               |

### CheckboxWidget

This is a widget that shows a list of checkboxes with a label and some aditional information.

```
<CheckboxWidget
    title="Widget 1"
    items={[
        {text: 'checkbox1', active: true, number: 3},
        {text: 'checkbox2', active: false, number: 1},
        {text: 'checkbox3', active: false}
    ]}
    onChange={(ev) => console.log(ev.target.value)}
/>
```

| **Name** | **Type**       | **Default** | **Description**                                  |
| -------- | -------------- | ----------- | ------------------------------------------------ |
| items    | CheckboxItem[] | -           | Main array of items to show as checkbox          |
| title    | string         | -           | Main title of the widget                         |
| onChange | function       | -           | Pass down the function to run on checkbox change |

**CheckboxItem**

| **Name** | **Type** | **Default** | **Description**                                                   |
| -------- | -------- | ----------- | ----------------------------------------------------------------- |
| text     | string   | -           | Label to show next to the checkbox                                |
| number   | number   | -           | You can show a small round label on the right to show quantities. |
| active   | boolean  | false       | Wether the checkbox is active or not by default.                  |

### ConfirmationModal

Modal component for any kind of confirmation

```
<ConfirmationModal
    actionButtonText="Remove"
    confirmationType="deletion",
    message="Do you want to delete this?",
    open={false},
    onClose={() => setModal(false)},
    onSubmit={() => console.log('done')},
/>
```

| **Name**         | **Type**              | **Default**                                              | **Description**                                                           |
| ---------------- | --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| actionButtonText | string                | 'Delete'                                                 | This is the text that will be rendered inside the confirmation button.    |
| confirmationType | 'delete' \| 'confirm' | 'delete'                                                 | This string will be shown on the modal title 'Confirm {confirmationType}' |
| message          | string                | 'Are you sure you want to delete permanently this item?' | Write a small question type text to show as content in the modal          |
| open             | boolean               | false                                                    | -                                                                         |
| onClose          | function              | -                                                        | Handle the modal closure from here.                                       |
| onSubmit         | function              | -                                                        | Indicate what you want to do after confirmation.                          |

### ContentCard

This is a simple wrapper component with a header and a title.

```
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
<Copyright
    rightsOwner="Smart Studios"
    rightsOwnerWebsite="https://smartstudios.io/"
    year="2021"
    versin="1.0.0"
/>
```

| **Name**           | **Type**         | **Default**    | **Description**                   |
| ------------------ | ---------------- | -------------- | --------------------------------- |
| rightsOwner        | string           | -              | App Owner's name                  |
| rightsOwnerWebsite | url              | -              | Url for the App Owner's website   |
| year               | string \| number | (Current year) | Last year of the copyrights claim |
| version            | string           | -              | App version                       |

### CopyrightMenu

This component holds the menu for the footer. It's a simple list with links.

```
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

### FormCard

This is a wrapper component for any Form. It uses react-hook-forms and yup validation and directly controls the toggable form components.

```
<FormCard
    className="card"
    defaultValues={{firstName: 'John', lastName: 'Doe'}}
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
/>
```

| **Name**       | **Type**                                             | **Default** | **Description**                                                                                                                                                                                  |
| -------------- | ---------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| className      | string                                               | -           | Class name to be passed down to wrapper element                                                                                                                                                  |
| defaultValues  | object                                               | -           | Object with default values for the form                                                                                                                                                          |
| formMode       | string (react-hook-forms valid property for useForm) | 'onChange'  | This option allows you to configure the validation strategy before user submit the form (onSubmit event). Read more on [react-hook-forms documentation](https://react-hook-form.com/api/useform) |
| inputFields \* | FormInput[]                                          | -           | Array of objects with the form Component and their props.                                                                                                                                        |
| onSubmit       | function                                             | -           | Function to trigger on submit                                                                                                                                                                    |
| schema         | object                                               | -           | Object with the shape for Yup validation                                                                                                                                                         |
| style          | object                                               | -           | Valid style object to be passed down to wrapper element.                                                                                                                                         |
| title          | string                                               | -           | Title for the card                                                                                                                                                                               |

**FormInput**

| **Name**  | **Type**     | **Default** | **Description**                         |
| --------- | ------------ | ----------- | --------------------------------------- |
| Component | ReactElement | -           | Use any of the toggable form Components |

_(The rest of properties are the same as the React Component used except for control, onSubmit and handleSubmit that are passed down by default from the FormCard Component)_

### ImageModal

This is a Modal to display an Image or a PDF file.

```
<ImageModal
    imageUrl="https://someimage.jpg/
    onClose={() => setIsModalVisible(false)}
    open={isModalVisible}
/>

```

| **Name** | **Type** | **Default** | **Description**                            |
| -------- | -------- | ----------- | ------------------------------------------ |
| imageUrl | 'string' | -           | Url string for the image or pdf to display |
| onClose  | function | -           | Function to call on modal close            |
| open     | boolean  | false       | Visibility state for the modal component.  |

### ItemCard

This component displays a rectangle card with an image on top, a title, description and a button to an external website.

```
<ItemCard
    item={{
        id: 1
        logo: 'images/logo.svg'
        categories: [{
            logo: <Icon />
            title: "Category 1"
        }]
        title: "Item 1"
        abstract: "This is a description"
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
| id         | string \| number | -           | Object id to recreate path                     |
| logo       | imgUrl           | -           | Image to display on the header of the card     |
| categories | Category[]       | -           | List of categories to show on top of the title |
| title      | string           | -           | Main title of the item                         |
| abstract   | string           | -           | Small description for the item                 |
| url        | url              | -           | External url to link in the bottom button      |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| logo     | svgIcon  | -           | Category icon   |
| title    | string   | -           | Category title  |

### ItemHorizontal

This component displays a horizontal rectangle with an image on the left, a title, description and a button to an external website.

```
<ItemHorizontal
    item={{
        id: 1
        logo: 'images/logo.svg'
        categories: [{
            logo: <Icon />
            title: "Category 1"
        }]
        title: "Item 1"
        abstract: "This is a description"
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
| id         | string \| number | -           | Object id to recreate path                     |
| logo       | imgUrl           | -           | Image to display on the header of the card     |
| categories | Category[]       | -           | List of categories to show on top of the title |
| title      | string           | -           | Main title of the item                         |
| abstract   | string           | -           | Small description for the item                 |
| url        | url              | -           | External url to link in the bottom button      |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| logo     | svgIcon  | -           | Category icon   |
| title    | string   | -           | Category title  |

### LoginForm

<!-- TODO -->

Description

```
<LoginForm

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### Logo

This is the main Logo of the page. It can contain an image with a brand name or just the name. It's built to be used on the top navigation bar.

```
<Logo
    imageSrc="/images/logo.svg"
    title="Smart Studios UI"
/>
```

| **Name** | **Type** | **Default** | **Description**        |
| -------- | -------- | ----------- | ---------------------- |
| imageSrc | imgUrl   | -           | Url for the brand logo |
| title    | string   | -           | Brand title            |

### MenuButton

<!-- TODO -->

Description

```
<MenuButton

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### PageHeader

This is a page header with title, description, a category and two buttons

```
<PageHeader
   categories={[
       {
           title: 'Category 1'
       }
   ]}
    title="Page 1"
    abstract="Small description"
    websiteURL="https://some-url.com/"
    primaryBtn={false}
    primaryBtnText='Primary button'
    secondaryBtn={false}
    secondaryBtnText='Secondary button'
/>
```

| **Name**         | **Type**   | **Default**     | **Description**                            |
| ---------------- | ---------- | --------------- | ------------------------------------------ |
| categories       | Category[] | -               | List of categories to show above the title |
| title            | string     | -               | Page title                                 |
| abstract         | string     | -               | Small description to show below the title  |
| websiteURL       | string     | -               | Main external link for the primary button  |
| primaryBtn       | boolean    | true            | Indicate false to hide primary button      |
| primaryBtnText   | string     | 'Visit Website' | Primary button text                        |
| secondaryBtn     | boolean    | true            | Indicate false to hide secondary button    |
| secondaryBtnText | string     | 'Report'        | Secondary button text                      |

**Category**

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| title    | string   | -           | Category title  |

### ResultsHeader

This component is a horizontal bar to be displayed on top of a results list. It has a pagination on the left and a view mode control on the right.

```
<ResultsHeader
    pagination={{
        firstIndex: number,
        lastIndex: number,
        totalResults: number
    }}
    viewMode={viewMode: 'list' | 'grid'}
    onGridViewClick={function}
    onListViewClick={function}
/>
```

| **Name**        | **Type**         | **Default** | **Description**                                    |
| --------------- | ---------------- | ----------- | -------------------------------------------------- |
| pagination      | Pagination       | -           | Number of items, first and last index being shown  |
| viewMode        | 'list' \| 'grid' | 'list'      | Current view mode                                  |
| onGridViewClick | function         | -           | Method to handle the 'on click' of the grid button |
| onListViewClick | function         | -           | Method to handle the 'on click' of the list button |

**Pagination**

| **Name**     | **Type** | **Default** | **Description**                              |
| ------------ | -------- | ----------- | -------------------------------------------- |
| firstIndex   | number   | 0           | Index of the first item on the results table |
| lastIndex    | number   | 0           | Index of the last item on the results table  |
| totalResults | number   | 0           | Number of total results in the search        |

### ScrollTopBtn

This component can be used directly on the layout. It's a button only showing when the window is scrolled more than 90% and it scrolls to the top of the page.

```
<ScrollTopBtn />
```

### SearchInput

This component is a custom search bar.

```
<SearchInput
    placeholder="What are you looking for?"
    onChange={() => doSomething()}
    onSubmit={() => doSomethingElse()}
    searchIcon={false}
    searchBtn={true}
    searchBtnText="Submit"
/>
```

| **Name**      | **Type**          | **Default** | **Description**                                                                                              |
| ------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| placeholder   | string \| boolean | 'Search...' | Text to be displayed inside the search input. You can also disable the placeholder by passing down a _false_ |
| onChange      | function          | -           | Method to apply on input change                                                                              |
| onSubmit      | function          | -           | Method to apply on form submit                                                                               |
| searchIcon    | boolean           | true        | Indicate false to disable the Looking glass icon inside the input area                                       |
| searchBtn     | boolean           | true        | Indicate false to hide the submit button (it can still be submitted on enter)                                |
| searchBtnText | string            | 'Search'    | Text to show on the submit button                                                                            |

### SignupForm

<!-- TODO -->

Description

```
<SignupForm

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### SimpleCard

This is a simple square card that displays an icon, a title and a button. The whole component can be used as a link.

```
<SimpleCard
    title="Item"
    btnText="Learn more"
    img="/images/background.jpg"
    icon={<Icon />}
    href="/some-path"
/>
```

| **Name** | **Type** | **Default** | **Description**                             |
| -------- | -------- | ----------- | ------------------------------------------- |
| title    | string   | -           | Title for the card                          |
| btnText  | string   | -           | Text to be displayed inside the card button |
| img      | imgUrl   | -           | Path to the img on the background           |
| icon     | svgIcon  | -           | Icon to be displayed on top of the name     |
| href     | uri      | -           | Path to some internal page                  |

### SmallCard

This is a small card only showing an icon and a title.

```
<SmallCard
    item={{
        url: "/some-path"
        icon: <Icon />
        title: "Item"
    }}
/>
```

| **Name** | **Type** | **Default** | **Description**          |
| -------- | -------- | ----------- | ------------------------ |
| item     | Item     | -           | Item to show in the card |

**Item**

| **Name** | **Type** | **Default** | **Description**                         |
| -------- | -------- | ----------- | --------------------------------------- |
| url      | uri      | -           | Path to some internal page              |
| icon     | svgIcon  | -           | Icon to be displayed on top of the name |
| title    | string   | -           | Title for the card                      |

### SocialProfile

This is a simple list with social media icons and links to external websites.

```
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

### TagsWidget

<!-- TODO -->

Description

```
<TagsWidget

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### Title

This is a simple component with a title and subtitle for any page or section header

```
<Title
    className="title"
    title={string}
    size="small"
    style={{margin: '0 auto'}}
    subtitle={string}
    subtitleSize="large"
/>
```

| **Name**     | **Type**           | **Default** | **Description**                                           |
| ------------ | ------------------ | ----------- | --------------------------------------------------------- |
| className    | string             | -           | Class name to be passed down to external div              |
| title        | string             | -           | Section/Page title                                        |
| size         | 'small' \| 'large' | 'large'     | Size for title typography component                       |
| style        | object             | -           | Any compatible style object to be applied to external div |
| subtitle     | string             | -           | Section/Page description                                  |
| subtitleSize | 'large' \| 'small' | 'small'     | Size for subtitle typography component                    |

### TitleDecoration

This is a simple component for a title underline decoration

```
<TitleDecoration
    className="custom-decoration"
/>
```

| **Name**  | **Type** | **Default** | **Description**                                 |
| --------- | -------- | ----------- | ----------------------------------------------- |
| className | string   | -           | This will be passed down to the wrapper element |

### ToggableArrayInput

This is a form component that accepts a comma separated string value and display all the separate values on different ways (type property). It has an edit mode that turns the component into a TextField.
It is meant to be used inside a react-hook-form context.

```
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
It is meant to be used inside a react-hook-form context.

<!-- !TODO -->

```
<ToggableAutocomplete

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| -        | -        | -           | -               |

### ToggableInput

This is a form component that accepts a string value and display it on different ways (type property). It has an edit mode that turns the component into a TextField.
It is meant to be used inside a react-hook-form context.

```
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

<!-- TODO -->

This is a form component

```
<ToggablePicker

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| -        | -        | -           | -               |

### ToggableSelect

<!-- TODO -->

In construction
It is meant to be used inside a react-hook-form context.

```
<ToggableSelect

/>
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| -        | -        | -           | -               |

### WidgetWrapper

This is a component to place around the widgets.

```
<WidgetWrapper>
    <SomeWidget>
</WidgetWrapper>
```

| **Name** | **Type**                      | **Default** | **Description**                                       |
| -------- | ----------------------------- | ----------- | ----------------------------------------------------- |
| children | ReactComponent \| HTMLElement | -           | These elements will be displayed inside the component |

## Composite Components

### Error

This is a default page for any incorrect route. It includes an image and a link button to the home page.

```
<Error
    errorimg="/images/custom-image.svg"
/>
```

| **Name** | **Type** | **Default**       | **Description**                            |
| -------- | -------- | ----------------- | ------------------------------------------ |
| errorimg | imgUrl   | '/images/404.svg' | You can choose a custom image to show here |

### Footer

Contains a Copyright claim, a social media menu and a footer menu (everything is supplied by the store and can be configured from the main text content file, the menu from the navigationConfig file)

```
<Footer />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### GeneralHeader

Contains a navigation bar and the Logo (name and logo are supplied by the store and can be configured from the main text content file, the navigation menu from the navigationConfig file)

```
<GeneralHeader />
```

| **Name** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |

### ItemsList

```
<ItemsList
    viewMode='grid'
    items={[
        {
            id: 1
            logo: 'images/logo.svg'
            categories: [{
                logo: <Icon />
                title: "Category 1"
            }]
            title: "Item 1"
            abstract: "This is a description"
            url: "https://some-address.com/"
        }
    ]}
/>
```

| **Name** | **Type**         | **Default** | **Description**               |
| -------- | ---------------- | ----------- | ----------------------------- |
| viewMode | 'list' \| 'grid' | 'list'      | Current view mode             |
| items    | string           | -           | List of items to be displayed |

Item (see Item params on ItemHorizontal above)

### LayoutDefault

This component wraps by default all the routes, you can add the components that will be displayed in all the pages. Remember you can also disable the layout on each individual route. On that case the NoLayout component will be used instead.

```
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

### Mantainance

This is a default page for the mantainance route. It includes an image and a link button to the creator website (you can update this on the main text content file).

```
<Mantainance
    mantainanceimg="/images/custom-image.svg"
/>
```

| **Name**       | **Type** | **Default**               | **Description**                            |
| -------------- | -------- | ------------------------- | ------------------------------------------ |
| mantainanceimg | imgUrl   | '/images/mantainance.svg' | You can choose a custom image to show here |

### Navbar

Contains a collapsable menu with the App title (content is supplied from the main text content file and the navigationConfig file)

```
<Navbar
    appTitle="Smart Studios UI"
    menuItems={[
        {
            title: 'Section 1'
            path: '/section1'
            dropdown: [
                {
                    title: 'Sub Section 1',
                    path: '/section1/subsection1'
                }
            ]
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
| title    | string    | -           | Link name                  |
| path     | uri       | -           | Path to some internal page |
| dropdown | Submenu[] | -           | List of submenus           |

**Submenu**

| **Name** | **Type** | **Default** | **Description**            |
| -------- | -------- | ----------- | -------------------------- |
| title    | string   | -           | Link name                  |
| path     | uri      | -           | Path to some internal page |

### NoLayout

This component wraps the routes that explicitly has a layout={false}, you can add the components that will be displayed in these cases. By default it contains the footer and a ScrollTopBtn that you can disable.

```
<LayoutDefault
    footer={true}
    scrollBtn={true}
>
    <Component />
</LayoutDefault>
```

| **Name** | **Type** | **Default** | **Description** |
| children | ReactComponent \| HTMLElement | - | Component that will be rendered inside the layout |
| footer | boolean | false | You can enable here the footer |
| scrollBtn | boolean | false | You can enable here the scroll to top button |

### RoutesSwitch

This component gets the routes array from the _routesConfig.js_ file and returns a react-router-dom Switch with all the appropriate routes.

```
<RoutesSwitch />
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

This reducer manages the authentication status and user data.

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
        url: string,
        method: 'post' | 'get' | 'put' | 'patch' | 'delete',
        data: any,
        onStart: reduxAction,
        onSuccess: reduxAction,
        onError: reduxAction
    })
);
```
