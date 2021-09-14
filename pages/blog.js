import { getSession, useSession } from "next-auth/client";

function Blog({ data }) {
    const [session] = useSession()
    console.log({session})
    return (
        <h1>{data}</h1>
     );
}

export default Blog;


export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: `/api/auth/signin?callbackUrl=http://localhost:3000/blog`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            session,
            data : session ? "list 100 personal" : "list 10 personal"
        }
    }
}
 