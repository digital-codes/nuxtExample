<!-- components/SiteHeader.vue -->
<template>
  <header class="bg-white border-b border-neutral-200">
    <UContainer class="flex items-center justify-between py-4">
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <!-- If you later add a logo image, drop it here -->
        <span class="text-xl font-bold tracking-tight text-brand-600">
          OK Lab Karlsruhe
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <NuxtLink
          to="/ueber"
          class="hover:text-brand-600 transition-colors"
        >
          Über uns
        </NuxtLink>
        <NuxtLink
          to="/projekte"
          class="hover:text-brand-600 transition-colors"
        >
          Projekte
        </NuxtLink>
        <NuxtLink
          to="/mitmachen"
          class="hover:text-brand-600 transition-colors"
        >
          Mitmachen
        </NuxtLink>

        <ULink
          href="https://codefor.de"
          target="_blank"
          class="inline-flex items-center gap-1 text-link-500 hover:text-link-600 transition-colors"
        >
          Code for Germany
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
        </ULink>
      </nav>

      <!-- Mobile menu button (simple version, you can enhance later) -->
      <div class="md:hidden">
        <UPopover mode="click">
          <UButton
            aria-label="Navigation öffnen"
            variant="ghost"
            icon="i-heroicons-bars-3"
          />

          <template #panel>
            <div class="flex flex-col gap-2 p-3 w-48 text-sm">
              <NuxtLink to="/ueber" class="py-1 hover:text-brand-600">
                Über uns
              </NuxtLink>
              <NuxtLink to="/projekte" class="py-1 hover:text-brand-600">
                Projekte
              </NuxtLink>
              <NuxtLink to="/mitmachen" class="py-1 hover:text-brand-600">
                Mitmachen
              </NuxtLink>
              <ULink
                href="https://codefor.de"
                target="_blank"
                class="py-1 text-link-500 hover:text-link-600"
              >
                Code for Germany
              </ULink>
            </div>
          </template>
        </UPopover>
      </div>
    </UContainer>
  </header>
</template>
