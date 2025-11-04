import z from "zod";

export const signinSchema = z.object({
    email: z
        .email("Email inválido"),
    password: z
        .string()
        .min(8, "Senha mínima: 5 caracteres")
        .max(30, "Senha máxima: 30 caracteres")
})