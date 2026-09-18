import Papa from "papaparse";

/**
 * Carga y parsea un CSV servido desde /public.
 * Convierte automaticamente los campos numericos.
 */
export function loadCsv(path) {
  return new Promise((resolve, reject) => {
    Papa.parse(path, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
}