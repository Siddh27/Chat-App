import User from "../models/user.models.js";

const searchContacts = async(req,res)=>{
    try {
        const {searchTerm} = req.body;
        if(searchTerm==null || searchTerm==undefined){
            return res.status(400).json("Search term is required");
        }

        const removeSpecialCharacters = searchTerm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

        const regex = new RegExp(removeSpecialCharacters,"i")

        const contacts = await User.find({
            $and:[
               {
                 _id:{$ne:req.userId}
               },{
                $or:[
                    {firstName:regex},{
                        lastName:regex
                    },{
                        email:regex
                    }
                ]
               }
            ]
        })
        return res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
    }
}

export {searchContacts}