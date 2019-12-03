# LORIS REACT

*Loris React is helpful.*
Almost every react project involves creating some sort of library of components.
The number of ways that you can structure and organise your code is limited mostly 
by your imagination. Loris React has an opinion on how to do this and it'll take care 
of all the leg work for you.

The concept is simple, a 'library' directory that houses all your components, grouped 
into a selection of sub directories. Loris also makes some assumptions, the most 
important one is probably that it expects you to be using [Sass](https://sass-lang.com/, "sass-lang") for your styling code. I might change this in future so you can opt in to Sass, but for now, it's Sass 
all the way.

### Atomic design
The organisation of loris components is based on atomic design principles. You can 
create a directory of protons, atoms, molecules, organisms and layouts (sorry this 
one doesn't quite fit the naming pattern..!). By default, loris recommends atoms, 
molecules and organisms.

**Atoms** are small units of reusable UI, typical examples would be Button, Title, 
Image. **Molecules** bring two or more atoms together, so a Card molecule might comprise 
Title, Text and a couple of Button atoms. **Organisms** bring two or more molecules, or 
a combinaton of molecules and atoms together, so a Hero organism might comprise an 
Image atom and a Card molecule.

---

## Getting started
Either install loris-react globally or run the commands using npx. The examples below 
assuming a global installation, but you can read more about npx [here](https://www.npmjs.com/package/npx, "npx")

`npm i -g loris-react` installs loris-react globally, so you can run it from anywhere in 
your command line. Once it's installed you can run `loris-react` to see some introductory 
information and a list of available commands.

### Commands
#### Setup
```
loris-react setup
```

This is the first command you'll want to run for a new project. You should run this from the 
directory where you want to your component library to be generated. Loris will check the location 
with you before it does anything, so just say no and cd into the right place before running 
the command again if you need to.

Next, you can choose which directories you want to be included in your library. Let's assume you 
have a src directory where all your application code is stored, you run `loris-react setup` and 
accept all the defaults, loris will scaffold the following file structure for you:

```
src/
|-- /library
|--|-- /01-atoms
|--|--|-- index.js
|--|-- /02-protons
|--|--|-- index.js
|--|-- /03-organisms
|--|--|-- index.js
|--| index.js
|--| library.scss
```


*library/index.js* - this file imports and exports all of your components from each atomic 
directory. This means consuming your components is really easy, something like this (image 
we're working in src/HomePage.js):
```
// src/HomePage.js

import React from 'react'
// import components from your loris-react
// component library. Adjust the file path
// to the library as required
import { HeroBanner, PageTitle, Button } from './library'
```

*library/library.scss* - this file imports all of the sass partials in your components. For 
your component styles to make it into your app code, you'll need to import this file somewhere.
Let's assume you have an index.scss file in your project root that gets imported in the entry point 
js file:
```
// /index.scss

@import './src/styles/global-styles.scss';
// load all of your loris component styles
@import './src/library/library.scss';
```
From here on in, you can create your components manually if you want, but loris will write 
the boilerplate for you if you ask it to.

#### New
```
loris-react new
```

This command generates a new React Component. Loris assumes you're using modern react features 
like hooks, so all components will be created as functional components, but you can obviously 
rewrite any of this code and use classes if you'd prefer.

**What happens when I generate a new component with the CLI?**
Loris will create a folder within the desired components directory (atoms, molecules etc). You 
can choose which files to include (more information on these later) and loris will generate 
them for you.
On top of this, loris will write your new component to that directory's index.js, to the 
library's index.js and (if you chose to include a sass file) it will write an import 
statement to the library/library.scss file.

So let's suppose you ran the command, chose to creat the component in library/01-atoms and 
gave it the name "Button", you would now have something like this:

```
src/
|-- /library
|--|-- /01-atoms
|--|--|-- /Button
|--|--|--|-- Button.js
|--|--|--|-- data.js
|--|--|--|-- _button.scss
|--|--|--|-- button.test.js
|--|--|-- index.js
|--|-- /02-protons
|--|--|-- index.js
|--|-- /03-organisms
|--|--|-- index.js
|--| index.js
|--| library.scss
```

The files *library/01-atoms/index.js* && *library/index.js* will now include an import statement for Button and 
an export object that includes Button. The file *library/library.scss* will now include an import statement for 
01-atoms/Button/button.
