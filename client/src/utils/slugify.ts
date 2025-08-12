// utils/slugify.ts
export const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // elimină diacritice
      .replace(/\s+/g, "-") // spații → liniuță
      .replace(/[^\w-]+/g, ""); // elimină caractere speciale
  