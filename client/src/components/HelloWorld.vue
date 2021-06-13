<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import axios, { Canceler } from "axios";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0);

    onMounted(async () => {
      const CancelToken = axios.CancelToken;
      let cancel: any = null;

      axios
        .get("http://localhost:4000/api", {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        cancel && cancel("Ahihi");
      }, 1500);
    });
    return { count };
  },
});
</script>

<style scoped></style>
