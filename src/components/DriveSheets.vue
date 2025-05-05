<template>
    <div class="p-4">
      <button @click="handleAuth" class="bg-blue-600 text-white px-4 py-2 rounded mr-2">
        Login com Google
      </button>
      <button @click="listarPlanilhasNaPasta" class="bg-green-600 text-white px-4 py-2 rounded">
        Ver planilhas
      </button>
  
      <div class="mt-4">
        <h2 class="text-lg font-bold mb-2">Planilhas encontradas:</h2>
        <ul>
          <li v-for="file in planilhas" :key="file.id">
            {{ file.name }} (ID: {{ file.id }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const CLIENT_ID = 'SEU_CLIENT_ID.apps.googleusercontent.com'
  const SCOPE = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly'
  const pastaId = 'SEU_ID_DA_PASTA_DO_DRIVE'
  
  const planilhas = ref([])
  
  function loadGapi() {
    return new Promise((resolve) => {
      if (window.gapi) return resolve()
  
      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = resolve
      document.body.appendChild(script)
    })
  }
  
  async function handleAuth() {
    await loadGapi()
  
    gapi.load('client:auth2', async () => {
      await gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: SCOPE
      })
      const authInstance = gapi.auth2.getAuthInstance()
      await authInstance.signIn()
      alert('Login com sucesso!')
    })
  }
  
  async function listarPlanilhasNaPasta() {
    const token = gapi.auth.getToken().access_token
  
    const res = await axios.get(
      `https://www.googleapis.com/drive/v3/files?q='${pastaId}'+in+parents+and+mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name)`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  
    planilhas.value = res.data.files
  }
  </script>
  