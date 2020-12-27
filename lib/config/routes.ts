import {UsersController} from "../controllers/users.controller";

export class Routes {
    public usersController: UsersController = new UsersController();

    public routes(app): void {
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
        // END USERS
    }
}
