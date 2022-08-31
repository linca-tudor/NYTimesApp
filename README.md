# NYTimesApp
## _An app that uses the New York Times API_


## Features

- List the latest bestsellers from the New York Times database
- Access a detailed screen for any listed book
- Show any known purchase links for any listed book

NYTimesApp is a lightweight project that represents my first contact with the development process of a mobile app using the React Native Framework

## Tech

This app uses the following:

- [ReactNative] - "An open source JavaScript Mobile framework specially designed to build native mobile apps for iOS and Android."
- [Expo] - "Developer tooling and NPM libraries built on top of React-Native."
- [NYTimesAPI] - "The Books API provides information about book reviews and The New York Times Best Sellers lists."
- [Watchman] - "It exists to watch files and record when they change."

## Installation

NYTimesApp requires [Node.js](https://nodejs.org/) v16+ and [React.js](https://reactnative.dev/docs/0.68/environment-setup) v68.2 to run.

Clone this repository

```sh
gh repo clone https://github.com/linca-tudor/NYTimesApp
```

Navigate to the folder where the repository has been cloned and install the dependencies and devDependencies

```sh
cd nytimesapp
npm i
```

The server can now be started with:

```sh
npm expo start
```

## Modules

NYTimesApp is currently based on the following modules.
Instructions on how to use them in your own application are linked below.

| Module | Documentation |
| ------ | ------ |
| expo-app-loading | [AppLoading][expo-app-loading] |
| expo-font | [Font][expo-font] |
| expo-linear-gradient | [LinearGradient][expo-linear-gradient] |
| @react-navigation | [ReactNavigation][react-navigation] |

## Application Screens

### Homepage

The [Homepage][Booklist] consists of a **SectionList** component that displays the bestselling books shown on New York Times. The data is fetched from the API, filtered to select only the Title, Author and Cover Photo from the server response.

<img src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Booklist.gif" width="300"/>

### Book Details Screen

Upon clicking on any SectionList item, the app will redirect the screen a [detailed view][Booklist2BookDetailsScreen] of the selected book. The data is filtered from the bestsellers list itself, this time also getting information regarding the book Description, and purchase links.

<img src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Booklist2BookDetailsScreen.gif" width="300"/>

The [purchase links][BuyLinks] are displayed using a **modal** that is triggered by the "Purchase Book" button. The modal itself renders a **Flatlist** component that offers pressable buttons which redirect the user to the respective URL.
The redirect is managed by using the *openURL* method of the Linking core module.

<img src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/BuyLinks.gif" width="300"/>

### Search Screen
  
On the second tab of the navigation menu a [Search Screen][Search] was implemented. It uses **SearchBar** component and a **Flatlist** component do display the search results. The Search Bar is implemented using a **TextInput** component such that when the user enters any characters in the text field, the state of the input field changes, and that triggers a search based on the typed characters. To limit the number of search requests, the function that handles the input update is being debounced using the similarily named method from the *"lodash"* module. 
  
<img src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Search.gif" width="300"/>
  
Similarly to the Homepage list items, the search results can also be clicked, revealing the detailed view for that particular result. 
  
  ## Navigation
  
  The app uses a general **Tab** navigator, and each screen from the tab uses a **Stack** navigator. The tabs function as independent parts of the same app, the results or information displayed on one screen not being affected by changing said screen. 

<img src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/ScreenIndependence.gif" width="300" />
  
This is done by having in the App.js component the main *AppNavigation* functional component switching between the Stack navigator, as shown here:
  
```javascript
const Tab = createBottomTabNavigator();
export const AppNavigator = () => (
<Tab.Navigator 
/* Tab.Navigator options and styling */
>
  <Tab.Screen name="Booklist" component={BookListNavigator} />
  <Tab.Screen name="Search" component={SearchScreenNavigator} />
</Tab.Navigator>
 );
```
  Each screen has then their own internal navigator:
  
  ### Homepage (BookList) 
  
  ```javascript
const Stack = createStackNavigator();
<Stack.Navigator
  initialRouteName={Routes.BookListScreen}
  /* Options */
>
  <Stack.Screen
    name={Routes.BookListScreen}
    component={BookListScreen}
    /* Options */
  />
  <Stack.Screen
    name={Routes.BookDetailsScreen}
    component={BookDetails}
    /* Options */
  />
</Stack.Navigator>;
  ```
  
  ### Search
  
  ```javascript
const Stack = createStackNavigator();
<Stack.Navigator
  initialRouteName={Routes.SearchScreen}
  /* Options */
>
  <Stack.Screen
    name={Routes.SearchScreen}
    component={SearchScreen}
    /* Options */
  />
  <Stack.Screen
    name={Routes.BookDetailsScreen}
    component={BookDetails}
    /* Options */
  />
</Stack.Navigator>;
  ```
  
## User Experience
  
  To make the user experience as seamless as possible, there have been implemented placeholder visual elements to aid the user to better navigate to the wished screen and/or action. Such elements are: 
  
  - gradients at list end to suggest scrolling
  - search file icon to suggest that searching happens in that screen
  - missing file icons when search returns no result
  - loading animation when fetching data
  
  | Homepage Loading Animation | Element Loading Animation | Search Bar Interaction |
  | :------------------------: | :-----------------------: | :--------------------: |
  | <img style="display: block; margin-left: auto; margin-right: auto; width: 250" src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/LoadingBooklist.gif"/> | <img style="display: block; margin-left: auto; margin-right: auto; width: 250" src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/LoadingAnimation.gif"/> | <img style="display: block; margin-left: auto; margin-right: auto; width: 250" src="https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/SearchBarCloseButton.gif"/> |
  
## Further improvements
  
### Sharing and *deep links*
  
Right now the app only manages hyperlinks from within the app to the outside world. It would be a great thing to implement a share button that cand generate a *deep link* that would enable the person that has been sent a particular book link to open the app and automaticallt navigate to said book

### Caching fetched data
 
Currently, every time data is needed a *fetch()* is called. During the app development I discovered that the NY Times API recommends a sleep period of 6 seconds beteween calls to ensure that the request quota per 60 seconds is not exceeded. Although the input text handler function is debounced using lodash.debounce, there still are occasions where the app becomes unresponsivness due to the server refusing to answer requests. A method for caching the fetched data and only refreshing it on manual refresh gesture and app restart neets to be implemented. This way the search field can also be sped up, thus providing a more fluid user experience.

## Conclusions

As my first React Native project, the learning curve was steep. Altough many steps along the way proved to be fairly intuitive, the development process has not taken place without certain insecure moments. Following this project I am planning to work more to further increase the depth of my knowledge in the following areas of interest: 
 - Passing data from one component to another using *Props*
 - Component *State* and proper component lifecycle management (*useRef, useState, useEffect, useCallback*) 
 - File structure and naming convention
 - Separating function from interface; logic should not be done in visual components
  
  

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [NYTimesAPI]: <https://developer.nytimes.com/>
   [Expo]: <https://expo.dev/home>
   [node.js]: <http://nodejs.org>
   [ReactNative]: <https://reactnative.dev/>
   [Watchman]: <https://facebook.github.io/watchman/>

   [expo-app-loading]: <https://docs.expo.dev/versions/latest/sdk/app-loading/>
   [expo-font]: <https://docs.expo.dev/versions/latest/sdk/font/>
   [expo-linear-gradient]: <https://docs.expo.dev/versions/latest/sdk/linear-gradient/>
   [react-navigation]: <https://reactnavigation.org/docs/getting-started/>
   
   [Booklist]: <https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Booklist.gif>
   [Booklist2BookDetailsScreen]: <https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Booklist2BookDetailsScreen.gif>
   [BuyLinks]: <https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/BuyLinks.gif>
   [Search]: <https://github.com/linca-tudor/NYTimesApp/blob/master/assets/gifs/Search.gif>
