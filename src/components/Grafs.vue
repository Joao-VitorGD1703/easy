<template>
  <div class="dashboard roboto-fraco">
    <h1 class="titulo">Análise dos Dados</h1>
    <div class="tabela">
      <div class="box info">
        <p class="label">Saldo Atual</p>
        <p class="valor verde">{{ saldoAtual }}</p>
        <p class="data">Última atualização: 10/05/2025</p>
      </div>

      <div class="box">
        <DoughnutChart :dataObject="dadosFormatadosDoughnut" class="pie" />
        <p class="legenda">Gráfico de Doughnut</p>
      </div>

      <div class="box">
        <BarChart :dataObject="dadosFormatadosBar" />
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
import DoughnutChart from "./DoughnutChart.vue";

const props = defineProps({
  dataGraf: Array,
});

const saldoAtual = computed(() => {
  
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  const saldos = props.dataGraf
    .filter((item) => item.Lancamento === "Saldo do dia" && item.Data && item.Valor)
    .map((item) => {
      let valorNumerico = 0;

      if (typeof item.Valor === "string") {
        valorNumerico = parseFloat(item.Valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
      } else if (typeof item.Valor === "number") {
        valorNumerico = item.Valor;
      }

      return {
        data: item.Data,
        valor: isNaN(valorNumerico) ? 0 : valorNumerico,
      };
    });

  saldos.sort((a, b) => new Date(b.data) - new Date(a.data));

  return saldos.length > 0
    ? `R$ ${saldos[0].valor.toFixed(2).replace(".", ",")}`
    : "R$ 0,00";
});

const dadosFormatadosBar = computed(() => {
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  const dadosAcumulados = {};

  props.dataGraf.forEach((item) => {
    if (
      item.Data && item.Valor &&
      item.Lancamento !== "S A L D O" &&
      item.Lancamento !== "Saldo Anterior" &&
      item.Lancamento !== "Saldo do dia"
    ) {
      let valorNumerico = 0;

      if (typeof item.Valor === "string") {
        valorNumerico = parseFloat(item.Valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
      } else if (typeof item.Valor === "number") {
        valorNumerico = item.Valor;
      }

      if (!isNaN(valorNumerico)) {
        dadosAcumulados[item.Data] = (dadosAcumulados[item.Data] || 0) + valorNumerico;
      }
    }
  });

  return {
    Lancamento: Object.keys(dadosAcumulados),
    Valor: Object.values(dadosAcumulados),
  };
});

const dadosFormatadosPie = computed(() => {
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  const dadosAcumulados = {};

  props.dataGraf.forEach((item) => {
    if (
      item.Lancamento && item.Valor &&
      item.TipoLancamento !== "Entrada" &&
      item.Lancamento !== "S A L D O" &&
      item.Lancamento !== "Saldo Anterior" &&
      item.Lancamento !== "Saldo do dia"
    ) {
      let valorNumerico = 0;

      if (typeof item.Valor === "string") {
        valorNumerico = parseFloat(item.Valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
      } else if (typeof item.Valor === "number") {
        valorNumerico = item.Valor;
      }

      if (!isNaN(valorNumerico)) {
        dadosAcumulados[item.Lancamento] = (dadosAcumulados[item.Lancamento] || 0) + valorNumerico;
      }
    }
  });

  return {
    Lancamento: Object.keys(dadosAcumulados),
    Valor: Object.values(dadosAcumulados),
  };
});

const dadosFormatadosDoughnut = computed(() => {
  if (!props.dataGraf || !Array.isArray(props.dataGraf)) return null;

  const acumulador = {};

  props.dataGraf.forEach((item) => {
    if (
      item.Lancamento !== "S A L D O" &&
      item.Lancamento !== "Saldo Anterior" &&
      item.Lancamento !== "Saldo do dia"
    ) {
      const nome = (item.Detalhes || "").replace(/^\d{2}\/\d{2} \d{2}:\d{2}\s*/, "").trim();

      let valorNumerico = 0;
      if (typeof item.Valor === "string") {
        valorNumerico = parseFloat(item.Valor.replace("R$", "").replace(/\./g, "").replace(",", "."));
      } else if (typeof item.Valor === "number") {
        valorNumerico = item.Valor;
      }

      if (!isNaN(valorNumerico)) {
        acumulador[nome] = (acumulador[nome] || 0) + valorNumerico;
      }
    }
  });

  return {
    Lancamento: Object.keys(acumulador),
    Valor: Object.values(acumulador),
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
