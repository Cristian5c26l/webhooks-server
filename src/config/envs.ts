import 'dotenv/config';//cargar variables de entorno desde archivo .env a objeto global process.env
import {get} from 'env-var';//proporciona métodos para validar, convertir y acceder a las variables de entorno incluidas en process.env 

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString(),
  SECRET_TOKEN: get('SECRET_TOKEN').required().asString(),
}
