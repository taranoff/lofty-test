export const required = v =>
  typeof v === "number" || !!v || "Это поле обязательно";
