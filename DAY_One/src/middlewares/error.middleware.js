export const errorHandler = (err,req,res,next)=>{
  console.err(err)

  const status = err.statusCode || 500;
  const message = err.message || "Internal server error"

  res.status(status).json({
    success:false,
    message
  })
}