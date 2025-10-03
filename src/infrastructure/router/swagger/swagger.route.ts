import { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../../../config/swagger';


function configureSwaggerRoutes(app: Express) {
    
    app.use(`/${process.env.BASE_URL_API}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

export default configureSwaggerRoutes;