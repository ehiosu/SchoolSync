import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    school:defineTable({
        name:v.string(),
        subscription:v.id("subscription"),
        adminId:v.id("admin"),
        teacherIds:v.array(v.id("teacher")),
        parentIds:v.array(v.id("parent")),
        adminPhrase:v.array(v.string()),
        modules:v.array(v.object({
            name:v.string(),
            isEnabled:v.boolean()
        }))
    }).index("by_name",["name"]).index("by_admin",["adminId"]).index(
        "by_subscription",["subscription"]
    ),
    subscription:defineTable({
        name:v.string(),
        price:v.number(),
        enrolledIds:v.array(v.id("school"))
    }).index("by_name",["name"]),
    user:defineTable({
            username:v.string(),
            email:v.optional(v.string()),
            passwordHash:v.string(),
            role:v.union(v.literal("TEACHER"),v.literal("STUDENT"),v.literal("PARENT"),v.literal("ADMIN")),
            associatedId:v.string(),
    }),
    subject:defineTable({
        name:v.string(),
        units:v.number()
    }),
    teacher:defineTable({
        firstName:v.string(),
        lastName:v.string(),
        subjects:v.array(v.id("subject")),
        userId:v.id("user"),
    }).index("by_user_id",["userId"]),
    student:defineTable({
        firstName:v.string(),
        lastName:v.string(),
        dateOfBirth:v.string(),
        gradeLevel:v.string(),
        userId:v.id("user"),
        parentId:v.id("parent")
    }).index("by_user_id",["userId"]),
    parent:defineTable({
        childrenIds:v.array(v.id("student")),
        userId:v.id("user"),
        schoolId:v.id("school")
    }).index("by_user_id",["userId"]),
    admin:defineTable({
        firstName:v.string(),
        lastName:v.string(),
        userId:v.id("user"),
    }).index("by_user_id",["userId"]),
    superAdmin:defineTable({
        username:v.string(),
        email:v.optional(v.string()),
        passwordHash:v.string(),
      
})
})