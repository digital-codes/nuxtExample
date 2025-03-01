# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Production

Build the application for production:

```bash
# npm
npm run build

```

Locally preview production build:

```bash
# npm
npm run preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Utilities

## UI

[Nuxt UI](https://nuxt.com/modules/ui)

[Icons](https://nuxt.com/modules/icon)

with

  * material symbols
  * font awesome brands and solid
  * openmoji

> https://nuxt.com/modules/icon  
  npm i -D @iconify-json/openmoji  
  npm i -D @iconify-json/fa6-brands  
  npm i -D @iconify-json/fa6-solid

```
<Icon name="material-symbols:calendar-today" style="color: black" />  
<Icon name="fa6-brands:github" style="color: red;width:64px;height:64px;" />  
<Icon name="openmoji:flag-germany" style="width:64px;height:64px;" />  
<Icon name="openmoji:bullseye" style="width:32px;height:32px" />

```

[Theming](https://ui.nuxt.com/getting-started/theming)

> As this module uses Tailwind CSS under the hood, you can use any of the Tailwind CSS colors or your own custom colors or groups, such as brand.primary. By default, the primary color is green and the gray color is cool.  
When using custom colors or adding additional colors through the extend key in your tailwind.config.ts, you'll need to make sure to define all the shades from 50 to 950 as most of them are used in the components config defined in ui.config/ directory. You can generate your colors using tools such as https://uicolors.app/ for example.

> Config in tailwind.config.ts and app.config.ts  
Thanks to tailwind-merge, the ui prop is smartly merged with the config. This means you don't have to rewrite everything.

## 



# Notes

## SSG 
client only code can be wrapped in like:

```
// SSG only
if (!import.meta.dev && !import.meta.server) {
    watch(
        () => route.fullPath,
        (newPath, oldPath) => {
            if (import.meta.client && newPath !== oldPath) {
                window.location.reload(); // Only reload when navigating in SSG mode
            }
        }
    );
}
```

> \<ClientOnly> should also work



## Components from UI LIbraries

Don't include component *template* inside root *template*. Might cause hydration mismatches.


### Slots
Target slots with code like :

```
  <UCard>
    <template v-slot:header>
    header
  </template>
    sdknwelfnk card contetn
    <template v-slot:footer>
    footer
  </template>
  </UCard>

```


## Fonts

Somehow, setting 

> font-family: "Roboto"; 

isn't enough. Use 

> font-family: "Roboto", sans-serif; 

