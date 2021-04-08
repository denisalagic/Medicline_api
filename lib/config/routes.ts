import {UserController} from "../controllers/user.controller";
import {CodebookController} from '../controllers/codebook.controller';
import {CustomerController} from '../controllers/customer.controller';
import {CustomerLocationController} from '../controllers/customer_location.controller';
import {NoteController} from '../controllers/note.controller';
import {VisitController} from '../controllers/visit.controller';
import {RecommendationController} from '../controllers/recommendation.controller';
import {ProductController} from '../controllers/product.controller';
import {TaskController} from '../controllers/task.controller';
import {OrderProductController} from '../controllers/order_product.controller';
import {OrderController} from '../controllers/order.controller';
import {AuthController} from '../controllers/auth.controller';
import {checkJwt} from '../middleware/checkJwt';

export class Routes {
    public codebookController: CodebookController = new CodebookController();
    public customersController: CustomerController = new CustomerController();
    public customerLocationController: CustomerLocationController = new CustomerLocationController();
    public recommendationController: RecommendationController = new RecommendationController();
    public productController: ProductController = new ProductController();
    public orderController: OrderController = new OrderController();
    public orderProductController: OrderProductController = new OrderProductController();
    public noteController: NoteController = new NoteController();
    public taskController: TaskController = new TaskController();
    public visitController: VisitController = new VisitController();
    public usersController: UserController = new UserController();
    public authController: AuthController = new AuthController();

    public routes(app): void {
        // BEGIN COOKBOOK
        app
            .route("/codebook")
            .get([checkJwt], this.codebookController.index)
        // END COOKBOOK

        // BEGIN CUSTOMERS
        app
            .route("/customers")
            .get([checkJwt], this.customersController.index)
            .post([checkJwt], this.customersController.create);

        app
            .route("/customers/:id")
            .put([checkJwt], this.customersController.update)
        // END CUSTOMERS

        // BEGIN CUSTOMER LOCATIONS
        app
            .route("/customers/locations")
            .get([checkJwt], this.customerLocationController.index)
            .post([checkJwt], this.customerLocationController.create);

        app
            .route("/customers/locations/:id")
            .put([checkJwt], this.customerLocationController.update)
        // END CUSTOMER LOCATIONS

        // BEGIN RECOMMENDATION
        app
            .route("/recommendations/")
            .get([checkJwt], this.recommendationController.index)
            .post([checkJwt], this.recommendationController.create);

        app
            .route("/recommendations/:id")
            .put([checkJwt], this.recommendationController.update);
        // END RECOMMENDATION

        // BEGIN PRODUCT
        app
            .route("/products/")
            .get([checkJwt], this.productController.index)
            .post([checkJwt], this.productController.create);

        app
            .route("/products/:id")
            .put([checkJwt], this.productController.update);
        // END PRODUCT

        // BEGIN ORDER
        app
            .route("/orders/")
            .get([checkJwt], this.orderController.index)
            .post([checkJwt], this.orderController.create);
        app
            .route("/orders/:id")
            .put([checkJwt], this.orderController.update);
        // END ORDER

        // BEGIN ORDER PRODUCT
        app
            .route("/orders/products/:id")
            .get([checkJwt], this.orderProductController.index)
            .put([checkJwt], this.orderProductController.update)
            .delete([checkJwt], this.orderProductController.delete);

        app
            .route("/orders/products/")
            .post([checkJwt], this.orderProductController.create)
        // END ORDER PRODUCT

        // BEGIN NOTES
        app
            .route("/notes/:id")
            .get([checkJwt], this.noteController.index)
            .put([checkJwt], this.noteController.update)
            .delete([checkJwt], this.noteController.delete);
        app
            .route("/notes/")
            .post([checkJwt], this.noteController.create);
        // END NOTES

        // BEGIN TASKS
        app
            .route("/visits/")
            .post([checkJwt], this.taskController.create);
        app
            .route("/tasks/:id")
            .get([checkJwt], this.taskController.index)
            .put([checkJwt], this.taskController.update);
        // END TASKS

        // BEGIN VISITS
        app
            .route("/visits/:id")
            .get(this.visitController.index)
            .put(this.visitController.update)
            .delete(this.visitController.delete);
        app
            .route("/visits/")
            .post(this.visitController.create);
        // END VISITS

        // BEGIN USERS
        app
            .route("/users")
            .post(this.usersController.create);

        app
            .route("/users/:id?")
            .get(this.usersController.index)
            .put(this.usersController.update)
            .delete(this.usersController.delete);
        // END USERS

        // BEGIN AUTH
        app
            .route("/loginWeb")
            .post(this.authController.loginWeb);
        app
            .route("/loginMobile")
            .post([checkJwt], this.authController.loginMobile);
        // END AUTH
    }
}
