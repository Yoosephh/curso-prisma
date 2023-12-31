import { Post } from "@prisma/client";
import db from "../database/database";
import prisma from "../database/database";

const TABLE_NAME = "posts";

export type CreatePost = Omit<Post, "id">
async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts
}

async function getPost(id:number) {
  const post = await prisma.post.findFirst({
    where: {
      id
    },
  })
  return post
}

// async function getPost(id: number) {
//   const result = await db.query<Post>(`
//     SELECT * FROM ${TABLE_NAME} WHERE id = $1
//   `, [id]);

//   return result.rows;
// }

async function createPost(post:CreatePost) {
  return await prisma.post.create({
    data: post
  })
}
// async function createPost(post: CreatePost) {
//   const { username, title, body } = post;
//   const result = await db.query<Post>(`
//     INSERT INTO ${TABLE_NAME} (username, title, body) VALUES ($1, $2, $3)
//   `, [username, title, body]);

//   return result.rowCount;
// }

async function deletePost(id:number) {
  return  await prisma.post.delete({where:{id}})
}
// async function deletePost(id: number) {
//   const result = await db.query<Post>(`
//     DELETE FROM ${TABLE_NAME} WHERE id = $1
//   `, [id]);

//   return result.rowCount;
// }

const postRepository = {
  getPost,
  getPosts,
  createPost,
  deletePost
}

export default postRepository;