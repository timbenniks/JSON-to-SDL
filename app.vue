<script setup lang="ts">
import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema/lib";
import { useClipboard } from "@vueuse/core";

const source = ref();
const sdl = ref();
const err = ref(false);

function resetForm() {
  err.value = false;
  sdl.value = "";
  source.value = "";
}

function getSDL() {
  try {
    JSON.parse(source.value);
    err.value = false;
    sdl.value = jsonToSchema({ jsonInput: source.value }).value;
  } catch (error) {
    sdl.value = "There seems to be an error in your JSON. Please try again.";
    err.value = true;
  }
}

const { text, copied, isSupported, copy } = useClipboard();
</script>
<template>
  <main class="p-12 mx-auto max-w-screen-xl">
    <h1
      class="text-[#081026] font-title font-bold text-4xl tracking-tight leading-5 mb-10"
    >
      JSON to SDL converter
    </h1>
    <p class="leading-7 text-xl mb-10 text-[#2D3A5F]">
      This interface allows you to paste any JSON object and we will convert it
      to GraphQL's SDL format. <br />Read more in the
      <a
        href="https://hygraph.com/docs/guides/schema/remote-sources#creating-a-custom-type-definition"
        target="blank"
        class="underline"
        >Hygraph documentation</a
      >.
    </p>

    <div class="grid grid-cols-2 gap-8 h-[700px]">
      <section>
        <label for="source" class="text-sm block mb-1 font-medium"
          >Input JSON *</label
        >
        <textarea
          class="text-[#2D3A5F] text-sm leading-6 font-code p-4 border border-[#CED5E1] rounded-lg w-full h-full focus:border-[#5B4CFF] focus:outline-none mb-4"
          id="source"
          v-model="source"
          @input="getSDL"
        />
        <button
          v-if="source"
          @click="resetForm"
          class="block bg-[#EEF0FF] hover:bg-[#5B4CFF26] text-[#5B4CFF] rounded-md py-2 px-4"
        >
          Reset
        </button>
      </section>
      <section>
        <label
          for="source"
          class="text-sm block mb-1 font-medium"
          :class="err ? 'text-[#C73131]' : 'text-[#2D3A5F]'"
          >Output SDL</label
        >
        <textarea
          class="text-sm leading-6 font-code p-4 border rounded-lg w-full h-full focus:border-[#5B4CFF] focus:outline-none mb-4"
          v-model="sdl"
          :class="
            err
              ? 'text-[#C73131] border-[#C73131]'
              : 'text-[#2D3A5F] border-[#CED5E1]'
          "
        />

        <button
          v-if="sdl && !err && isSupported"
          @click="copy(sdl)"
          class="block bg-[#5B4CFF] hover:bg-[#695cff] text-[#fff] rounded-md py-2 px-4"
        >
          <span v-if="text">Copied</span>
          <span v-else>Copy to clipboard</span>
        </button>
      </section>
    </div>
  </main>
</template>
