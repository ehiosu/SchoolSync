import {z} from "zod"

const userCreationValidator=z.object({
    username:z.string().min(3,{
        message:"Username has to be at least 3 characters long"
    }),
    email:z.string().email("Enter a valid email"),
    password:z.string(),
    secondPassword:z.string(),
    role:z.string(z.enum(["TEACHER","STUDENT","PARENT","ADMIN"])),
    

})