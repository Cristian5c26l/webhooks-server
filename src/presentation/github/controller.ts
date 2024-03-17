import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";



export class GithubController {
  
  // DI (Inyeccion de dependencias)
  constructor(
    private readonly githubService: GithubService = new GithubService(),
    private readonly discordService: DiscordService = new DiscordService(),
    
  ){}

  webhookHandler = ( req: Request, res: Response ) => {

    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown';
    const payload = req.body;
    let message:string;

    //console.log(JSON.stringify(payload));// usado para copiar lo retornado por JSON.stringify(payload) y pegarlo en https://app.quicktype.io/ para producir un conjunto de interfaces con tipado estricto para typescript.
    
    switch (githubEvent) {
      case 'star':
        message = this.githubService.onStar(payload);
      break;
      case 'issues':
        message = this.githubService.onIssue(payload);
      break;
      
      default:
        message = `Unknown event ${ githubEvent }`;
    }

    //console.log({message});
    
    // ENviar mensaje a canal de servidor de discord 
    this.discordService.notify(message)
      .then((notifyStatus) =>  res.status(202).send('Accepted'))
      .catch((notifyStatus) => res.status(500).json({error: 'internal server error'}));

   

  }

}
