import express from 'express';
import { envs } from './config';// Aqui, implicitamente, se importa envs que está exportado desde ./config/index.ts
import { GithubController } from './presentation/github/controller';


(()=>{
  main();
})();

function main() {
  
  const app = express();

  const controller = new GithubController();
  
  // Middleware
  app.use(express.json());
  
  app.post('/api/github', controller.webhookHandler);


  // Abrir puerto PORT para que a traves de él escuche o reciba peticiones HTTP a rutas definidas
  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${ envs.PORT }`);
  })

}
