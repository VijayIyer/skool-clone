import { z } from "zod";

const pollSchema = z.array(
    z.object({
        option: z.string().min(1).max(255),
        votes: z.array(z.string().min(1).max(255)),
    })
);

const attachmentSchema = z.array(
    z.object({
        fileName: z.string().min(0).max(255),
        fileType: z.string().min(1).max(255),
        url: z.string().min(1),
        id: z.string().min(1).max(255),
    })
);

const updateAttachmentSchema = z.array(
    z.object({
        _id: z.string().min(1).max(255).optional(),
        fileName: z.string().min(0).max(255),
        fileType: z.string().min(1).max(255),
        url: z.string().min(1),
        id: z.string().min(1).max(255).optional(),
    }
));

const likesSchema = z.array(
    z.string().min(1).max(255),
);

const commentSchema = z.array(
    z.string().min(1).max(255),
);

const postIdSchema = z.string().min(1).max(255);

const newPostSchema = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(65535),
    category: z.string().min(1).max(255),
    userId: z.string().min(1).max(255),
    poll: z.union([pollSchema, z.undefined()]),
    attachments: z.union([attachmentSchema, z.undefined()]),
});

const updatePostSchema = z.object({
    _id: z.string().min(1).max(255),
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(65535),
    author: z.string().min(1).max(255),
    userName: z.string().min(1).max(255),
    attachments: updateAttachmentSchema.min(0),
    poll: pollSchema.min(0),
    category: z.string().min(1).max(255),
    likes: likesSchema.min(0),
    comments: commentSchema.min(0),
    createdAt: z.string().min(1).max(255),
    updatedAt: z.string().min(1).max(255),
});

const getPostSchema = z.object({
    by: z.enum(["all", "category", "one"]),
    page: z.string().min(1).max(255).optional(),
    category: z.string().min(1).max(255).optional(),
})

const updateCategorySchema = z.object({
    by: z.string().refine(value => value === "category"),
    postId: postIdSchema,
    category: z.string().min(1).max(255),
})

const updateLikesSchema = z.object({
    by: z.string().refine(value => value === "likes"),
    postId: postIdSchema,
})

const updateOptionsSchema = z.object({
    by: z.string().refine(value => value === "option"),
    postId: postIdSchema,
    option: z.string().min(1).max(255),
})



export function validateNewPost(post: any) {
    return newPostSchema.safeParse(post);
}

export function validateUpdatePost(post: any) {
    return updatePostSchema.safeParse(post);
}

export function validateCategoryUpdate(post: any) {
    return updateCategorySchema.safeParse(post);
}

export function validateLikesUpdate(query: any) {
    return updateLikesSchema.safeParse(query);
}

export function validateOptionsUpdate(query: any) {
    return updateOptionsSchema.safeParse(query);
}

export function validatePostId(postId: any) {
    return postIdSchema.safeParse(postId);
}

export function validateGetRequest(query: any) {
    return getPostSchema.safeParse(query);
}