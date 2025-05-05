import * as XLSX from 'xlsx'

export const handleFile = async (e) => {
  try {
    const file = e.target.files[0]
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result)
          const workbook = XLSX.read(data, { type: 'array' })

          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(worksheet)

          resolve(json)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  } catch (error) {
    console.error('Erro ao ler arquivo:', error)
    return []
  }
}
