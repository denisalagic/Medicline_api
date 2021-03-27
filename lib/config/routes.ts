import {UserController} from "../controllers/user.controller";
import {CodebookController} from '../controllers/codebook.controller';
import {CustomersController} from '../controllers/customers.controller';
import {CustomerLocationController} from '../controllers/customer_locations.controller';
import {NotesController} from '../controllers/notes.controller';

export class Routes {
    public usersController: UserController = new UserController();
    public codebookController: CodebookController = new CodebookController();
    public customersController: CustomersController = new CustomersController();
    public customerLocationsController: CustomerLocationController = new CustomerLocationController();
    public notesController: NotesController = new NotesController();

    public routes(app): void {
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
            .get(this.customerLocationsController.index)
            .post(this.customerLocationsController.create);

        app
            .route("/customers/locations/:id")
            .put(this.customerLocationsController.update)
        // END CUSTOMER LOCATIONS
        // BEGIN NOTES
        app
            .route("/notes/:id")
            .get(this.notesController.index)
            .put(this.notesController.update)
            .delete(this.notesController.delete);
        app
            .route("/notes/")
            .post(this.notesController.create);
        // END NOTES
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
        // BEGIN COOKBOOK
        app
            .route("/codebook")
            .get(this.codebookController.index)
        // END COOKBOOK
    }
}
