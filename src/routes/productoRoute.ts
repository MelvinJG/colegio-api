import { Router } from 'express'
import ProductoController from '../controllers/productoController'

class productoRoute {
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void {        
        /*RUTA PADRE /api/producto */
        this.router.post('/addProducto',ProductoController.addProducto);
        this.router.get('/getProductos',ProductoController.getProductos);
        this.router.get('/getProductoPorID/:id',ProductoController.getProductoPorID);
        this.router.put('/updateProducto/:id',ProductoController.updateProducto);
        this.router.put('/deleteProducto/:id',ProductoController.deleteProducto);
        this.router.post('/venderProducto',ProductoController.venderProducto);
    }
}
const ProductoRoute = new productoRoute();
export default ProductoRoute.router;