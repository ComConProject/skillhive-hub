<script setup lang="ts">
interface Props {
  description?: string | null
}

withDefaults(defineProps<Props>(), {
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quas minus amet veniam. Labore aut inventore laudantium minima impedit veniam voluptate accusantium sequi accusamus dolorum vero eos illo eveniet natus dignissimos sunt animi, reprehenderit nemo facere. Repudiandae, ad veniam. Facilis provident omnis dolorem veniam excepturi, vel velit quasi, maiores repellat voluptatem fugiat perspiciatis dicta nesciunt tenetur porro illo? Voluptates accusantium ad maxime autem voluptate dolores tempora debitis aut. Veniam ab aut sed fuga at, sapiente eum animi sunt tempora temporibus saepe perspiciatis itaque aperiam cumque amet facere praesentium adipisci optio! Ipsa quod odit possimus. Sunt facere magnam cumque quia soluta laudantium repellat? Illo, nostrum dolores. Enim magni praesentium tenetur labore quia, magnam aperiam! Asperiores, corrupti unde praesentium velit architecto minima eligendi quis, possimus libero incidunt adipisci inventore excepturi nihil nostrum. Deleniti, ratione ipsum? Magnam voluptas ipsa nemo ipsam, perferendis aliquam earum alias? Possimus iure similique repudiandae in quo at ad?',
})
</script>

<template>
  <div class="w-full">
    <div class="text-xl font-bold text-slate-800 mb-4">
      {{ $t('gig.briefly_description') }}
    </div>
    <p>
      {{ description }}
    </p>
  </div>
</template>
