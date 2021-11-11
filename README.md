# Smart Studios UI

Current version: v0.2.0

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
    exact
    path="/"
    component={Home}
    layout={false}
    footer={false}
    scrollBtn={false}
    noLayoutFooter={true}
    noLayoutBtn={true}
    privateRoute={true}
    redirectRoute="/some-public-uri"
/>
```

| **Name**       | **Type**       | **Default** | **Description**                                                                                                                                                                                             |
| -------------- | -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exact          | boolean        | false       | Use if you want the path to be exact (see react-router-dom documentation)                                                                                                                                   |
| path           | uri            | -           | Use the relative path for each page (see react-router-dom documentation)                                                                                                                                    |
| component\*    | ReactComponent | -           | A React Component to be rendered when the location match the path (see react-router-dom documentation)                                                                                                      |
| layout         | boolean        | true        | You can manage the default layout on _src/layouts/LayoutDefault.js_ and the simplest layout on _src/layouts/NoLayout.js_. By default the _NoLayout.js_ file contains the footer and the ScrollTopBtn anyway |
| privateRoute   | boolean        | false       | If you want to make this route private turn this property to true, it will check the authentication from the auth slice of the store                                                                        |
| redirectRoute  | uri            | '/'         | Pass down a custom page path to redirect on a private route                                                                                                                                                 |
| footer         | boolean        | -           | You can disable the footer for the main layout here for each individual route                                                                                                                               |
| scrollBtn      | boolean        | -           | You can disable the scroll to top button for the main layout here for each individual route                                                                                                                 |
| noLayoutFooter | boolean        | -           | You can enable the footer for the simple layout here (when layout=false) for each individual route                                                                                                          |
| noLayoutBtn    | boolean        | -           | You can enable the scroll to top button for the simple layout here (when layout=false) for each individual route                                                                                            |

### Breadcrumb

This component shows the title of the page with an icon on top, a description and a breadcrumb with internal links to the parent pages. It can also receive children to show below the description.

```
<Breadcrumb
    CurrentPgIcon={<Icon />}
    CurrentPgTitle="Current page title"
    MenuPgTitle="Parent page"
    MenuPgLink="/parent-page"
    img="/images/image.jpg"
>
    <div>
        Some children
    </div>
</Breadcrumb>
```

| **Name**       | **Type**                      | **Default** | **Description**                                            |
| -------------- | ----------------------------- | ----------- | ---------------------------------------------------------- |
| CurrentPgIcon  | svgIcon                       | -           | An icon to show at the top of the header                   |
| CurrentPgTitle | string                        | -           | Name of the current page                                   |
| MenuPgTitle    | string                        | -           | Name of the parent section                                 |
| MenuPgLink     | url                           | -           | Link to the parent section                                 |
| img            | imgUrl                        | -           | Url for a background image                                 |
| children       | ReactComponent \| HTMLElement | -           | React components or HTML Element to show after the heading |

### Copyright

This is the copyright claim, it contains a copyright symbol, the name of the rights owner and the last year for the copyrights. It's built to be used on the footer of the page.

```
<Copyright
    rightsOwner="Smart Studios"
    rightsOwnerWebsite="https://smartstudios.io/"
    year="2021"
/>
```

| **Name**           | **Type**         | **Default**    | **Description**                   |
| ------------------ | ---------------- | -------------- | --------------------------------- |
| rightsOwner        | string           | -              | App Owner's name                  |
| rightsOwnerWebsite | url              | -              | Url for the App Owner's website   |
| year               | string \| number | (Current year) | Last year of the copyrights claim |

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

| **Name**      | **Type** | **Default** | **Description**                                                               |
| ------------- | -------- | ----------- | ----------------------------------------------------------------------------- |
| placeholder   | string   | -           | Text to be displayed inside the search input                                  |
| onChange      | function | -           | Method to apply on input change                                               |
| onSubmit      | function | -           | Method to apply on form submit                                                |
| searchIcon    | boolean  | true        | Indicate false to disable the Looking glass icon inside the input area        |
| searchBtn     | boolean  | true        | Indicate false to hide the submit button (it can still be submitted on enter) |
| searchBtnText | string   | 'Search'    | Text to show on the submit button                                             |

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

### Title

This is a simple component with a title and subtitle for any page or section header

```
<Title
    title={string}
    subtitle={string}
/>
```

| **Name** | **Type** | **Default** | **Description**          |
| -------- | -------- | ----------- | ------------------------ |
| title    | string   | -           | Section/Page title       |
| subtitle | string   | -           | Section/Page description |

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
