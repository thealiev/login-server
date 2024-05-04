const post = require('../models/post');
const PostModel = require('../models/post');

const create =async (req, res) => {
    try{
        const doc = new PostModel({
            user: req.userId,
            imageUrl: req.body.imageUrl,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags
        })
    
        const post = await doc.save();
        res.json(post);
    } catch(err) {
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }

}

const getAll =async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch(err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
const getPopular =async (req, res) => {
    try{
        const posts = await PostModel.find().sort({viewsCount: -1}).populate('user').exec();
        res.json(posts)
    } catch(err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
const getOne = async (req, res) => {
    try{
        const postId = req.params.id
        
        const post = await PostModel.findOneAndUpdate({
            _id: postId
        },
        {
            $inc: { viewsCount: 1}
        })
        if(!post) {
            return res.status(404).json({
                message: 'Статья не найдена'
            })
        }
        res.json(post)
    } catch(err) {
        res.status(500).json({
            message: 'Не удалось получить статью'
        })
    }
}
const remove = async (req, res) => {
    try{
        const postId = req.params.id
        await PostModel.findByIdAndDelete(postId)
        res.json({
            success: true
        })
    } catch(err) {
        res.status(500).json({
            message: 'Не удалось получить статью'
        })
    }
}
const update = async (req, res) => {
    console.log(req)
    try{
        const postId = req.params.id
        await PostModel.findByIdAndUpdate(
            postId,
            {
                imageUrl: req.body.imageUrl,
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags
        });
        res.status(200).json({
            success: true
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
}

const getLastTags = async (req, res) => {
    try {
      const posts = await PostModel.find().limit(5).exec();
  
      const tags = posts
        .map((obj) => obj.tags)
        .flat()
        .slice(0, 5);
  
      res.json(tags);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить тэги',
      });
    }
  };
  

module.exports = {create, getAll, getOne, remove, update, getLastTags, getPopular}