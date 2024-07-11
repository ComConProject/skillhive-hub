<script setup lang="ts">

</script>

<template>
  <div class="w-full">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <a href="#" class="text-xl font-bold text-gray-800">Skillhive</a>
          <ul class="flex space-x-4">
            <li><a href="#" class="text-gray-600 hover:text-gray-800">Services</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-800">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="bg-blue-600 text-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">
          Get Your Work Done With Skillhive
        </h1>
        <p class="text-lg md:text-xl mb-8">
          The #1 freelance service for businesses
        </p>
        <a href="#" class="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold text-lg hover:bg-blue-700 hover:text-white transition duration-300">Get Started</a>
      </div>
    </header>

    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8">
          Why Choose Skillhive?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">
              Wide Range of Services
            </h3>
            <p class="text-gray-600">
              Explore various services ranging from graphic design to digital marketing.
            </p>
          </div>
          <!-- Feature 2 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">
              Quality Assurance
            </h3>
            <p class="text-gray-600">
              Get top-notch quality services from our pool of talented freelancers.
            </p>
          </div>
          <!-- Feature 3 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4">
              Affordable Prices
            </h3>
            <p class="text-gray-600">
              Access cost-effective solutions tailored to your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 Skillhive. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
