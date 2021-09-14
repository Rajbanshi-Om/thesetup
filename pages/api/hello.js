// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession, session } from "next-auth/client"
export default async function handler(req, res) {
  const session = await getSession({ req })
  
  if (!session) {
      res.status(401).json({error : 'Unauthentiucated user'})
  } else {
    res.status(200).json({message : 'Success', session})
  }

  res.status(200).json({ name: 'John Doe' })
}
