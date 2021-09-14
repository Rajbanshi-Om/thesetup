import Providers from "next-auth/providers";
import NextAuth from "next-auth";
import User from '../../../models/User'
import DbConnect from '../../../lib/dbConnect'
import bcrypt from 'bcryptjs'


export default NextAuth({
            providers: [
                Providers.GitHub({
                    clientId: process.env.GITHUB_ID,
                    clientSecret: process.env.GITHUB_SECRET,
            
                }),
                Providers.Credentials({
                    name: 'Custome signIn',
                    credentials: {
                        username: { label: "Username", type: 'text', placeholder: "jsmith" },
                        password: { label: 'Password', type: 'passeord' }
                    },
                    async authorize(credentials, req, res) {
                        // use post method
                        const {username, password} = req.body
                        DbConnect();
                        console.log(req.body)
                        const user = await User.findOne({ email: username})
                        console.log("here user data ", user)
                        // bcrypt.compare(password, user.password).then((isMatch) => {
                        //     if (!isMatch) return res.status(400).json({ msg: "User does not exists" });
                        //     return user
                        // })
                        if (user && bcrypt.compare(password, user.password)) {
                                return user
                        } else {
                            return null
                        }
                    }
                })
            ],
            pages: {
                signIn : '/signin'
            },
            database:process.env.MONGODB_URI,
            session: {
                jwt: true,
            },

            jwt: {
               secret: process.env.JWT_SECRET,
            },
            callbacks: {
                async jwt(token, user) {
                    if (user) {
                        token.id = user.id
                    }
                    return token
                },
                async session(session, token) {
                    session.user.id = token.id
                    return session
                }

            }
        })
