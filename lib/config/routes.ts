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

export class Routes {
    public codebookController: CodebookController = new CodebookController();
    public customersController: CustomerController = new CustomerController();
    public customerLocationController: CustomerLocationController = new CustomerLocationController();
    public recommendationController: RecommendationController = new RecommendationController();
    public productController: ProductController = new ProductController();
    public orderProductController: OrderProductController = new OrderProductController();
    public noteController: NoteController = new NoteController();
    public taskController: TaskController = new TaskController();
    public visitController: VisitController = new VisitController();
    public usersController: UserController = new UserController();

    public routes(app): void {
        // BEGIN COOKBOOK
        app
            .route("/codebook")
            .get(this.codebookController.index)
        // END COOKBOOK

        // BEGIN CUSTOMERS
        app
            .route("/customers")
            .get(this.customersController.index)
            .post(this.customersController.create);

        app
            .route("/customers/:id")
            .put(this.customersController.update)
        // END CUSTOMERS

        // BEGIN CUSTOMER LOCATIONS
        app
            .route("/customers/locations")
            .get(this.customerLocationController.index)
            .post(this.customerLocationController.create);

        app
            .route("/customers/locations/:id")
            .put(this.customerLocationController.update)
        // END CUSTOMER LOCATIONS

        // BEGIN RECOMMENDATION
        app
            .route("/recommendations/")
            .get(this.recommendationController.index)
            .post(this.recommendationController.create);

        app
            .route("/recommendations/:id")
            .put(this.recommendationController.update);
        // END RECOMMENDATION

        // BEGIN PRODUCT
        app
            .route("/products/")
            .get(this.productController.index)
            .post(this.productController.create);

        app
            .route("/products/:id")
            .put(this.productController.update);
        // END PRODUCT

        // BEGIN ORDER PRODUCT
        app
            .route("/orders/products/:id")
            .get(this.orderProductController.index)
            .put(this.orderProductController.update)
            .delete(this.orderProductController.delete);

        app
            .route("/orders/products/")
            .post(this.orderProductController.create)
        // END ORDER PRODUCT

        // BEGIN NOTES
        app
            .route("/notes/:id")
            .get(this.noteController.index)
            .put(this.noteController.update)
            .delete(this.noteController.delete);
        app
            .route("/notes/")
            .post(this.noteController.create);
        // END NOTES

        // BEGIN TASKS
        app
            .route("/visits/")
            .post(this.taskController.create);
        app
            .route("/tasks/:id")
            .get(this.taskController.index)
            .put(this.taskController.update);
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
            .get(this.usersController.index)
            .post(this.usersController.create);

        app
            .route("/users/:id")
            .get(this.usersController.show)
            .put(this.usersController.update)
            .delete(this.usersController.delete);
        app
            .route("/loginWeb")
            .post(this.usersController.loginWeb);
        app
            .route("/loginMobile")
            .post(this.usersController.loginMobile);
        // END USERS
    }
}
