import { activateUser, deactivateUser, getUsers } from "../services/userService.js"

//GET /api/users
export const AllUsers = async (req, res, next) => {
    try {
        const users = await getUsers();

        res.status(200).json({
            message: "Users List fetched successfully",
            users
        });

    } catch (err) {
        next(err);
    }
}

//POST /api/users/:id/deactivate
export const deactivate = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deactivatedUser = await deactivateUser(id);

        res.status(200).json({
            message: "User deactivated successfully",
            deactivatedUser
        })
    } catch (err) {
        next(err)
    }
}

//POST /api/users/:id/deactivate
export const activate = async (req, res, next) => {
    try {
        const id = req.params.id;

        const activatedUser = await activateUser(id);

        res.status(200).json({
            message: "User activated successfully",
            activatedUser
        })
    } catch (err) {
        next(err)
    }
}