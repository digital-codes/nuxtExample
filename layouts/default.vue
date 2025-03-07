<template>
    <div class="layout" :class="{ dark: isDark }">
        <!-- Navigation -->
        <header class="p-4 flex justify-between items-center bg-white dark:bg-black text-black dark:text-white">

            <UContainer class="max-w-full p-4 navbar">
                <nav>
                    <UButton :icon="mopen ? 'material-symbols:close' : 'material-symbols:menu-open'" size="sm"
                        color="primary" square 
                        @click="mclick"
                        :aria-label="mopen ? t('close-menu') : t('open-menu')"/>
                    <USlideover v-model="mopen" 
                    :overlay="false"
                    side="left"
                    style="margin-top:4rem;"
                    >
                        <div>
                        <UVerticalNavigation :links="links" class="mt-3 md:mt-6"/>
                        </div>
                    </USlideover> 
            </nav>
            <div>
                <NuxtLink v-for="l in availableLocales" :key="l.code" :to="switchLocalePath(l.code)" :aria-label="'Switch to language ' + l.name">
                    <Icon :name="langIcon" style="width:32px;height:32px;" :alt="l.name"
                        class="dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                </NuxtLink>
            </div>
            <!-- Dark Mode Toggle -->
            <UButton
            @click="toggleDarkMode" 
    :icon="isDark ?  'material-symbols:light-mode' : 'material-symbols:dark-mode'"
    size="sm"
    color="primary"
    square
    variant="solid"
    :aria-label="isDark ?  t('light-mode') : t('dark-mode')"
  />             
            </UContainer>  
            
        </header>

        <!-- Page Content, pt-32 for fixed header -->
        <main class="p-6 pt-32">
            <slot />
        </main>
        <!-- Footer -->
        <footer class="p-4 text-center">
            &copy; {{ new Date().getFullYear() }} My Website
            <img src="~/assets/img/okl.svg" alt="Logo" class="h-6 inline-block  footer-logo" />
            <div class="bg-white dark:bg-black">
            <Icon name="material-symbols:menu" alt="Open menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:menu-open" alt="Open menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:close" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:list" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:view-list" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:join" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:person-add" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:group-add" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:event" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:toggle-on" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:toggle-off" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:check-box" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                <Icon name="material-symbols:check-box-outline-blank" alt="Close menu"
                    class="w-8 md:w-10 h-8 md:h-10 dark:bg-white dark:shadow-none shadow shadow-cool-500" />
                </div>

        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const langIcon = computed(() => locale.value != "de" ? "openmoji:flag-germany" : "openmoji:flag-united-kingdom")

const links = computed(() => [{
    label: 'Profile',
    avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
}, {
    label: t("home"),
    icon: 'i-material-symbols-home',
    to: locale.value == "de" ? "/" : "/en"
}, {
    label: t("projectlist"),
    icon: 'i-heroicons-chart-bar',
    to: locale.value == "de" ? "/projectlist" : "/en/projectlist"
}, {
    label: t("contact"),
    icon: 'i-openmoji-bullseye',
    to: locale.value == "de" ? "/contact" : "/en/contact"
}])

const mopen = ref(false);
const mclick = () => {
    console.log("Click");
    mopen.value = !mopen.value;
}

const navClick = (item) => {
    console.log("Nav Click", item);
    mopen.value = false;
}


const mounted = ref(false);

const minimized = ref(false);

const isDark = ref(false);

const router = useRouter();
const route = useRoute();

router.afterEach(() => {
    console.log("After each");
    mopen.value = false;
});

const { locale, locales, loadLocaleMessages } = useI18n();
const switchLocalePath = useSwitchLocalePath()

console.log("Current locale:", locale.value);
console.log("Available locales:", locales.value);

const availableLocales = computed(() => {
    return locales.value.filter(i => i.code !== locale.value)
})

const colorMode = useColorMode()
console.log(colorMode.preference)

watch(locale, async (newLocale, oldLocale) => {

    const currentRoute = router.currentRoute.value.path;
    console.log("Current route:", currentRoute, newLocale);
    const newPath = newLocale !== 'de' ? `/${newLocale}${currentRoute}` : currentRoute == "" ? "/" : currentRoute;
    console.log("New path:", newPath);
    await navigateTo({ path: newPath })
    //router.push(newPath);
});

/*
watch(locale, async (newLocale, oldLocale) => {
    // when locale changes, load new locale messages here
    // otherwise new messages will be requested from router push but are not yet loaded
    // race condition, see nuxt docs for more info
    // https://i18n.nuxtjs.org/docs/api/vue-i18n#loadlocalemessages
    await loadLocaleMessages(newLocale); // ✅ Update i18n locale
    let currentRoute = router.currentRoute.value.path;

    if (oldLocale !== 'de' && currentRoute.startsWith(`/${oldLocale}`)) {
        currentRoute = currentRoute.replace(`/${oldLocale}`, '');
    }
    console.log("Current route:", currentRoute, newLocale);
    const newPath = newLocale !== 'de' ? `/${newLocale}${currentRoute}` : currentRoute == "" ? "/" : currentRoute;
    console.log("New path:", newPath);
    await navigateTo({ path: newPath })
    //router.push(newPath);
});
*/
const toggleDarkMode = () => {
    console.log(colorMode.preference)
    if (colorMode.preference === 'dark') {
        setMode("light");
        isDark.value = false;
    } else {
        setMode("dark");
        isDark.value = true;
    }
    console.log("Dark mode is now", colorMode.preference == "dark" ? "enabled" : "disabled");
};
const setMode = (mode) => {
    console.log("Setting mode:", mode)
    if (mode === 'light') {
        colorMode.preference = 'light'
        document.documentElement.setAttribute("data-theme", "light");
        document.body.classList.toggle("dark", false);
    } else {
        colorMode.preference = 'dark'
        document.documentElement.setAttribute("data-theme", "dark");
        document.body.classList.toggle("dark", true);
    }
    console.log("Dark mode is now", mode == "dark" ? "enabled" : "disabled");
};

// Enable reload ONLY in SSG (static mode)
/* 
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
*/


onMounted(() => {
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const colorMode = useColorMode()
    isDark.value = savedTheme === "dark";
    setMode(colorMode.preference)
    mounted.value = true;
    console.log("Mounted", savedTheme);
});
</script>

<style scoped lang="scss">
/* Light and Dark Mode Using CSS Variables */

.navbar {
    position: fixed;
    display:flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    background-color: yellow;
    z-index: 1000;
}

.slideMenu {
    margin-top:7rem;
}

.layout {
    background-color: var(--primary);
    color: var(--secondary);
    min-height: 100vh;
}

header {
    background-color: var(--header-bg);
    padding: 1rem;
}

a {
    text-decoration: none;
    font-weight: bold;
    color: inherit;
}

a:hover {
    text-decoration: underline;
}
</style>