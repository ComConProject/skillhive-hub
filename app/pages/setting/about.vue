<script setup lang="ts">

</script>

<template>
  <UCard class="prose prose-base">
    <div>
      <h1>About Us</h1>
      <p>
        This research paper is a part of the curriculum in the Faculty of Engineering, Department of Computer Engineering and Information Technology, Major in Computer Engineering at the National University of Laos.
      </p>

      <p class="">
        The purpose of this study is to design The Online Freelance Services Marketplace Platform to collect and gather data for finding online service jobs such as graphic design, web development, and others. Currently, there is no centralized system for online job services in Laos, which makes information searching complicated and time-consuming. This research aims to collect data on online job services, making access easier, improving convenience, speeding up the process, and reducing the time users spend searching for information.
      </p>

      <p>
        The Online Freelance Services Marketplace Platform utilizes Visual Studio Code, HTML, CSS, JavaScript, NuxtJS, PostgreSQL, and Supabase in its development.
      </p>

      <p>
        Through research and development, The Online Freelance Services Marketplace Platform is developed following the system development process by integrating NuxtJS technology with Supabase. This modern technology enables the creation of a centralized and convenient online job service system, making it easier to search for information.
      </p>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <div class="flex flex-col">
          <h4>Developed by</h4>
          <ul>
            <li>
              <NuxtLinkLocale to="https://github.com/iamsouliya" target="_blank">
                Souliya Thammavong
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="https://www.facebook.com/psouk.tommi" target="_blank">
                Souksakhone Sengaloune
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="https://www.facebook.com/tavanh.plst" target="_blank">
                Tavanh Lardsachan
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </UCard>
</template>
