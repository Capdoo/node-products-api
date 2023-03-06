import Role from "../models/Role"

export const createRoles = async () => {

    try {
        const i = await Role.estimatedDocumentCount()
        if (i > 0) return;
        
        const values = await Promise.all([
            new Role({name: 'user'}).save(),
            new Role({name: 'admin'}).save(),
            new Role({name: 'superadmin'}).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);        
    }
};