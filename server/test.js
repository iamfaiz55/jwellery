exports.updateProfileData = asyncHandler(async (req, res) => {
    const {id}=req.params
    const result = await User.findByIdAndUpdate(id, req.body)
    res.json({messaege:"User Update Success", result})
});
exports.getProfile = asyncHandler(async(req, res)=> {
   const {id}=req.params
   const result = await User.findById(id)
   res.json({message:"User Get Success", result})
})