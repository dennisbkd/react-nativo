export const clearToken = (req, res) => {
  res.clearCookie('access_token').json({ message: 'cerrada con exito' })
  console.log(req.cookie)
}
