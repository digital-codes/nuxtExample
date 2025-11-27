<!-- components/SiteFooter.vue -->
<template>
  <footer class="footer-oklab">
    <UContainer>
      <div class="grid gap-8 md:grid-cols-4 mb-8">
        <!-- Rechtliches -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-neutral-900">
            Rechtliches
          </h3>
          <ul class="space-y-1">
            <li>
              <NuxtLink to="/impressum" class="hover:text-brand-600">
                Impressum
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/datenschutz" class="hover:text-brand-600">
                Datenschutz
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/grundsaetze" class="hover:text-brand-600">
                Grundsätze
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Werkzeugkoffer -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-neutral-900">
            Werkzeugkoffer
          </h3>
          <ul class="space-y-1">
            <li>
              <ULink
                href="https://github.com/okfde"
                target="_blank"
                class="hover:text-brand-600"
              >
                Github OKF (extern)
              </ULink>
            </li>
            <li>
              <ULink
                href="https://opendatahandbook.org"
                target="_blank"
                class="hover:text-brand-600"
              >
                opendatahandbook.org
              </ULink>
            </li>
            <li>
              <ULink
                href="https://abc.codefor.de"
                target="_blank"
                class="hover:text-brand-600"
              >
                ABC der Offenheit
              </ULink>
            </li>
          </ul>
        </div>

        <!-- Über uns -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-neutral-900">
            Über uns
          </h3>
          <ul class="space-y-1">
            <li>
              <NuxtLink to="/projekte" class="hover:text-brand-600">
                Projekte
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mitmachen" class="hover:text-brand-600">
                Mitmachen
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Folge uns -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-neutral-900">
            Folge uns!
          </h3>
          <p class="text-sm text-neutral-700 mb-3">
            Bleib auf dem Laufenden zu Terminen, Projekten und Civic Tech
            in Karlsruhe.
          </p>
          <!-- Placeholder for social links -->
          <div class="flex gap-3">
            <!-- Add real URLs/icons if you have them -->
            <UButton
              variant="ghost"
              size="xs"
              icon="i-simple-icons-github"
              aria-label="Github"
            />
            <UButton
              variant="ghost"
              size="xs"
              icon="i-simple-icons-mastodon"
              aria-label="Mastodon"
            />
          </div>
        </div>
      </div>

      <div class="border-t border-neutral-200 pt-4 text-xs text-neutral-600 flex flex-wrap gap-2 items-center justify-between">
        <span>
          © {{ new Date().getFullYear() }} OK Lab Karlsruhe
        </span>
        <span>
          Diese Seite wurde erstellt mit Nuxt, Nuxt UI und Tailwind CSS.
        </span>
      </div>
    </UContainer>
  </footer>
</template>
