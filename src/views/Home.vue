<template>
  <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Choose Your Direct Mail Solution
      </h2>
      <p class="mt-4 text-xl text-gray-500">
        Select the mailing service that best fits your needs
      </p>
    </div>

    <div class="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <!-- EDDM Card -->
      <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">Every Door Direct Mail</h3>
          <p class="mt-2 text-gray-600">Target entire carrier routes without a mailing list</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> No mailing list required
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Lower postage rates
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Geographic targeting
            </li>
          </ul>
          <router-link 
            to="/eddm/map"
            class="mt-6 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Start EDDM Campaign
          </router-link>
        </div>
      </div>

      <!-- Targeted Mail Card -->
      <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">Targeted Direct Mail</h3>
          <p class="mt-2 text-gray-600">Reach specific audiences with precision targeting</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Demographic targeting
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Custom mailing lists
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Higher response rates
            </li>
          </ul>
          <router-link 
            to="/targeted/map"
            class="mt-6 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Start Targeted Campaign
          </router-link>
        </div>
      </div>

      <!-- New Mover Card -->
      <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">New Mover Mailer</h3>
          <p class="mt-2 text-gray-600">Connect with people who just moved to your area</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Weekly updates
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> High response rates
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Automated campaigns
            </li>
          </ul>
          <router-link 
            to="/new-mover/map"
            class="mt-6 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Start New Mover Campaign
          </router-link>
        </div>
      </div>

      <!-- Radius 50 Card -->
      <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">Radius 50</h3>
          <p class="mt-2 text-gray-600">Target the 50 closest homes to your location</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Precise local targeting
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> High response rates
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Perfect for local services
            </li>
          </ul>
          <router-link 
            to="/radius-50/setup"
            class="mt-6 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Start Radius 50 Campaign
          </router-link>
        </div>
      </div>

      <!-- Birthday Mailer Card -->
      <div class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">Birthday Mailer</h3>
          <p class="mt-2 text-gray-600">Send personalized birthday greetings to your target audience</p>
          <ul class="mt-4 space-y-2">
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Automated scheduling
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Personalized messages
            </li>
            <li class="flex items-center text-gray-600">
              <span class="mr-2">✓</span> Geographic targeting
            </li>
          </ul>
          <router-link 
            to="/birthday/map"
            class="mt-6 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Start Birthday Campaign
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional setup needed
</script>