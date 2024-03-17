import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";



export class GithubService {
  
  // DI (ocupar constructor en caso de inyeccion de dependencias)
  constructor(){}

  // Ejecutar este metodo cuando el evento que venga en el header de la peticion post a /api/github realizada por webhook de repositorio "github-webhook" sea un evento de haber dado una estrella a dicho repositorio
  onStar( payload: GithubStarPayload ): string {
  
    const { action, sender, repository ,starred_at } = payload;// starred_at coontiene la fecha de cuando ocurrió el suceso de haberle dado una estrella a dicho repositorio

    // console.log(starred_at);


    return `User ${sender.login} ${action} star on ${repository.full_name}`;

  }

  onIssue( payload: GithubIssuePayload ): string {

    const { action, issue } = payload;
    
    // console.log({action});

    if ( action === 'opened' ) {
      return `An issue was ${ action } with the following title: ${issue.title}`;
    }

    if ( action === 'closed' ) {
      return `An issue was ${ action } by ${ issue.user.login }`;
    }

    if ( action === 'reopened' ) {
      return `An issue was ${ action } by ${ issue.user.login }`;
    }

    return `Unhandled action for the issue event ${action}`;


  }

}
