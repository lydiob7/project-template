# Smart Studios UI

Current version: v0.1.0

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

### Navigation menus and submenus

The file src/config/navigationConfig.js contains an object with the names and links for every section on the website. These are going to be shown on the Navigation Bar component as well as in the footer if needed and other sections.

### Theme

The theme provider is in src/components/theme. It wraps all the App and applies the default theme for Material UI + the customization made on src/components/theme/theme.js

# UI Components

## General Components

### AppRoute

<i>This component is built over a Route component from react-router-dom, it adds a layout if needed and parse the path to have the PUBLIC_URL before the URI</i>

```
<AppRoute
    exact={boolean}
    path={uri}
    component={ReactComponent}
    layout={ReactComponent}
/>
```

### Breadcrumb

```
<Breadcrumb
    CurrentPgIcon={svgIcon}
    CurrentPgTitle={string}
    MenuPgTitle={string}
    MenuPgLink={url}
    ParentCategory={idNumber}
    img={imgUrl}
>
    <div>
        Some children
    </div>
</Breadcrumb>
```

### Copyright

<i>By default the year is the current year</i>

```
<Copyright
    rightsOwner={string}
    rightsOwnerWebsite={url}
    year={number | string}
/>
```

### CopyrightMenu

```
interface Menu {
    path: url
    title: string
}

<CopyrightMenu menus={Menu[]} />
```

### ItemCard

```
interface Item {
    id: number | string
    logo: imageUrl
    categories: [{
        logo: svgIcon
        title: string
    }]
    title: string
    abstract: string
    url: string
}

<ItemCard item={Item} />
```

### ItemHorizontal

```
interface Item {
    id: number | string
    logo: imageUrl
    categories: [{
        logo: svgIcon
        title: string
    }]
    title: string
    abstract: string
    url: string
}

<ItemHorizontal item={Item} />
```

### Logo

```
<Logo
    imageSrc={imgUrl}
    title={string}
/>
```

### ResultsHeader

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

### ScrollTopBtn

<i>This component can be used directly on the layout</i>

```
<ScrollTopBtn />
```

### SearchInput

<i>By default it has a button with the text "Search" and a looking glass icon within the input</i>

```
<SearchInput
    placeholder={string}
    onChange={function}
    onSubmit={function}
    searchIcon={boolean}
    searchBtn={boolean}
    searchBtnText={string}
/>
```

### SimpleCard

```
<SimpleCard
    title={string}
    btnText={string}
    img={imgUrl}
    icon={svgIcon}
    href={url}
/>
```

### SmallCard

```
interface Item {
    url: url
    icon: svgIcon
    title: string
}

<SmallCard item={Item} />
```

### SocialProfile

```
interface SocialLink {
    icon: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
    url: url
}

<SocialProfile socials={SocialLink[]} />
```

### Title

```
<Title
    title={string}
    subtitle={string}
/>
```

## Composite Components

### Footer

<i>Contains a Copyright claim, a social media menu and a footer menu (everything is supplied by the store and can be configured from the main text content file, the menu from the navigationConfig file)</i>

```
<Footer />
```

### GeneralHeader

<i>Contains a navigation bar and the Logo (name and logo are supplied by the store and can be configured from the main text content file, the navigation menu from the navigationConfig file)</i>

```
<GeneralHeader />
```

### ItemsList

```
interface Item {
    id: number | string
    logo: imageUrl
    categories: [{
        logo: svgIcon
        title: string
    }]
    title: string
    abstract: string
    url: string
}

<ItemsList viewMode={viewMode: 'list' | 'grid'} items={Item[]} />
```

### Navbar

<i>Contains a collapsable menu with the App title (content is supplied from the main text content file and the navigationConfig file)</i>

```
interface MenuItem {
    title: string
    path: url
    dropdown: [
        {
            title: string,
            path: url
        }
    ]
}

<Navbar appTitle={string} menuItems={MenuItem[]} />
```

# Redux Store

## Configuration

The store contains a main file called <i>configureStore.js</i> which provides a function that is called in the App component and injects the middlewares.

## Reducers

The main reducer file is called <i>reducer.js</i> and combines the entities reducer and the ui reducer.

### UI Reducer

This is the reducer slice responsible for injecting all the text in the app. It has a sidebar with a menu, the app general information, the main content and the footer data.

### Auth Reducer

This reducer manages the authentication status and user data.

### Custom Reducers

On the entities file you can add as many reducers as you need. There is a <i>customReducer.js</i> file as an example.

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
