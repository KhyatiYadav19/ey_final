const Recipes=require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const filename = Date.now() + '-' + file.fieldname + '.' + ext;
          cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}

const getRecipe=async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
}

const addRecipe=async(req,res)=>{
    // console.log(req.file)
    const {title,ingredients,instructions,time}=req.body 

    if(!title || !ingredients || !instructions)
    {
        res.json({message:"Required fields can't be empty"})
    }

    const newRecipe=await Recipes.create({
        title,ingredients,instructions,time,  coverImage: req.file.filename, createdBy: req.user.id
})
   return res.json(newRecipe)
}

const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body 
    let recipe=await Recipes.findById(req.params.id)

    try{
        if(recipe){
            await Recipes.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:"error"})
    }
    
}
const deleteRecipe=async(req,res)=>{
    try {
        const deletedRecipe = await Recipes.findById(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (deletedRecipe.createdBy.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this recipe" });
        }
        await Recipes.findByIdAndDelete(req.params.id);
        return res.json({ message: "Recipe deleted successfully", deletedRecipe });
    } catch (err) {
        return res.status(400).json({ message: "Error deleting the recipe"});
    }
}

const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find({ createdBy: req.user.id }).populate('createdBy', 'username email');
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching my recipes" });
    }
};

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe, getMyRecipes, upload}
