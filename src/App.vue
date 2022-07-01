<template>
  <div style="padding-top: 2rem">
    <button
      :style="paginaAtual == 'curso' ? 'background-color: #000' : ''"
      @click="mudaComponente('curso')"
    >
      Curso
    </button>
    <button
      :style="paginaAtual == 'aluno' ? 'background-color: #000' : ''"
      @click="mudaComponente('aluno')"
    >
      Aluno
    </button>
    <button
      :style="paginaAtual == 'diario' ? 'background-color: #000' : ''"
      @click="mudaComponente('diario')"
    >
      Diário
    </button>
  </div>
  <MainPage v-if="paginaAtual == 'aluno'" />
  <pagina-curso v-if="paginaAtual == 'curso'" />
  <pagina-diario v-if="paginaAtual == 'diario'" />
</template>

<script>
import MainPage from './views/MainPage.vue';
import PaginaCurso from './views/Curso.vue';
import PaginaDiario from './views/Diario.vue';
import { ref } from '@vue/reactivity';

export default {
  name: 'App',
  components: {
    MainPage,
    PaginaCurso,
    PaginaDiario,
  },
  setup() {
    const paginaAtual = ref('aluno');
    function mudaComponente(componente) {
      paginaAtual.value = componente;
    }

    return { paginaAtual, mudaComponente };
  },
};
</script>

<style src="./assets/style.css" />
