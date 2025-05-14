<template>
  <div class="dashboard">
    <h1 class="titulo">Análise dos Dados</h1>
    <div class="tabela">
      <div class="box info">
        <p class="label">Salário</p>
        <p class="valor azul">R$ 5.800,00</p>
        <p class="data">Última atualização: 10/05/2025</p>
      </div>

      <div class="box info">
        <p class="label">Saldo Atual</p>
        <p class="valor verde">R$ 3.250,75</p>
        <p class="data">Última atualização: 10/05/2025</p>
      </div>

      <div class="box">
        <BarChart :dataObject="dadosFormatadosBar"  />
        <p class="legenda">Gráfico de Barras</p>
      </div>

      <div class="box">
        <PieChart :dataObject="dadosFormatadosPie" class="pie" />
        <p class="legenda">Gráfico de Pizza</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import PieChart from "./PieChart.vue";
import BarChart from "./BarChart.vue";
import { computed } from "vue";

const props = defineProps({
  dataGraf: Array,
});

const dadosFormatadosBar = computed(() => {
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  // Objeto para armazenar o nome (Lancamento) e o valor acumulado
  const dadosAcumulados = {};

  props.dataGraf.forEach((item) => {
    if (item.Data && item.Valor) {
      if (
        item.Lancamento != "S A L D O" &&
        item.Lancamento != "Saldo Anterior" &&
        item.Lancamento != "Saldo do dia"
      ) {
        const valorNumerico = parseFloat(
          item.Valor.replace("R$", "").replace(/\./g, "").replace(",", ".")
        );

        if (!isNaN(valorNumerico)) {
          if (dadosAcumulados[item.Data]) {
            dadosAcumulados[item.Data] += valorNumerico;
          } else {
            dadosAcumulados[item.Data] = valorNumerico;
          }
        }
      }
    }
  });

  return {
    Lancamento: Object.keys(dadosAcumulados),  // Nomes (Lancamento)
    Valor: Object.values(dadosAcumulados),     // Valores acumulados
  };
});
const dadosFormatadosPie = computed(() => {
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  // Objeto para armazenar o nome (Lancamento) e o valor acumulado
  const dadosAcumulados = {};

  props.dataGraf.forEach((item) => {
    if (item.Lancamento && item.Valor) {
      if (
        item.Lancamento != "S A L D O" &&
        item.Lancamento != "Saldo Anterior" &&
        item.Lancamento != "Saldo do dia"
      ) {
        const valorNumerico = parseFloat(
          item.Valor.replace("R$", "").replace(/\./g, "").replace(",", ".")
        );

        if (!isNaN(valorNumerico)) {
          if (dadosAcumulados[item.Lancamento]) {
            dadosAcumulados[item.Lancamento] += valorNumerico;
          } else {
            dadosAcumulados[item.Lancamento] = valorNumerico;
          }
        }
      }
    }
  });

  return {
    Lancamento: Object.keys(dadosAcumulados),  // Nomes (Lancamento)
    Valor: Object.values(dadosAcumulados),     // Valores acumulados
  };
});
</script>


<style lang="scss" scoped>
.dashboard {
  padding: 2rem;
  width: 100%;
  height: 100vh;
  .titulo {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .tabela {
    display: grid;
    height: 80%;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    border: 1px solid #e0e0e0;
    padding: 1rem;
    border-radius: 0.5rem;

    .box {
      max-height: 90%;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      .pie {
        max-height: 90%;
        max-width: 90%;
      }

      .legenda {
        margin-top: 0.5rem;
        color: #666;
      }
    }

    .info {
      align-items: flex-start;
      .label {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .valor {
        font-size: 2rem;
        font-weight: bold;
        margin: 0.5rem 0;
      }
      .azul {
        color: #4b6cb7;
      }
      .verde {
        color: #4caf50;
      }
      .data {
        color: #888;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
