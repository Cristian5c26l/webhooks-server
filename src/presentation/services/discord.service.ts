import { envs } from "../../config";



export class DiscordService {
  
  private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL;

  // DI (Constructor para inyectar dependencias en caso de ser necesario)
  constructor() {}

  async notify(message: string) {
    // Consultar la documentacion oficial para ver cómo usar webhooks de discord. En la documentacion se menciona que hay que hacer una peticion POST al webhook o url asociado a un canal de un servidor que incluya lo que queremos enviarle a dicho canal (content)
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnRiODdmMHl0NGNvcmZ2N2NvdXQ1MGh2YWh1dmh3MDk0dnNtN3l4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wsfuO8TL2pNGsCBpNF/giphy.gif' }
      //   }
      // ]
    }

    // Peticion POST a this.discordWebHookUrl
    const resp = await fetch( this.discordWebHookUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},// Si body es un json (application/json), body es de tipo raw
      body: JSON.stringify(body),// en peticion POST que usualmente es cross domain, se pide que el body vaya como un string
    });

    
    if ( !resp.ok ) {
      console.log('Error sending message to discord');
      return false
    }

    return true;

  }
}
