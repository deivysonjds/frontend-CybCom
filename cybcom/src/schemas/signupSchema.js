import z from 'zod'

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z
    .email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 6 caracteres')
    .max(30,'Senha deve ter no máximo 30 caracteres'),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
})