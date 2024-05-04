const PostModel = require('../models/post');
const CommentModel = require('../models/comment');

const createComment = async (req, res) => {
    try{
        const {comment, postId, username, avatarUrl} = req.body
        if(!comment) {
            res.status(404).json({
                message: 'комметарий не должен быть пустым'
            })
        }
        const doc = new CommentModel({comment, username, avatarUrl});
        const newComment = await doc.save()
        try {
            await PostModel.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id}
            })

        } catch(err) {
            console.log(err)
        }
        res.json(newComment)

    } catch(err) {
        res.status(404).json({message: 'error'})
    }
}

const getPostComments = async (req, res) => {
    try{
        const post = await PostModel.findById(req.params.id)
        const list =await Promise.all( post.comments.map((commentId) => {
                return CommentModel.findById(commentId)
            })
        )
        res.json(list)

    }catch (err) {
        res.status(404).json({
            message: 'Ошибка'
        })
    }
}

module.exports = {createComment, getPostComments}