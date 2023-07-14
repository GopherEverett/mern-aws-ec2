const { Post } = require('../models')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
}

const s3Client = new S3Client(s3Config)

const UploadFile = async (req, res) => {
  const file = req.files.file
  const fileName = file.name.replace(/\s+/g, '-').toLowerCase()

  const bucketParams = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Body: file.data
  }
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams))
    res.send(data)
  } catch (error) {
    throw error
  }
}

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body })
    res.send(post)
  } catch (error) {
    throw error
  }
}

const UpdatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.post_id, req.body, { new: true })
    res.send(post)
  } catch (error) {
    throw error
  }
}

const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  UploadFile
}
