import {mutation} from "./_generated/server"
import { v } from "convex/values";
import { accountId } from "@/types/types";

const createUser=mutation({
    args:{
        username:v.string(),
        email:v.string(),
        password:v.string(),
        role:v.union(v.literal("TEACHER"),v.literal("STUDENT"),v.literal("PARENT"),v.literal("ADMIN")),
        firstName:v.string(),
        lastName:v.string(),
    },
    handler:async(ctx, args)=> {
        const {firstName,lastName,password,role,...rest}=args
        
        try{
            const user = await ctx.db.insert("user",{
                ...rest,
                passwordHash:password,
                associatedId:"",
                role
            })
            if(user != undefined){
                if(role==="ADMIN"){
                    const admin = await ctx.db.insert("admin",{
                        firstName,
                        lastName,
                        userId:user
                    })
                const updatedUser = ctx.db.patch(user,{
                    associatedId:admin
                })
                const returnedUser = await ctx.db.get(user);
                const associatedAccount = await ctx.db.get(returnedUser?.associatedId as accountId);
                return {...returnedUser,...associatedAccount}
                }
            }
            return {}
        }
        catch(err){
            throw err
        }
    },
})