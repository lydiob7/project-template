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

## UI Components

### General Components

#### Logo

#### Page Title

#### Breadcrumb

#### Search bar

#### Listing results bar (w/ view mode)

#### Simple card

#### Horizontal card with image

#### Vertical card with image

#### Social media menu

#### Copyright claim

#### Footer menu (terms&conditions, privacy policy, etc)

### Composite Components

#### Navigation Bar

#### Listings with view mode

#### Footer

## Redux Store
