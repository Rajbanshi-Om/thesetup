import { getCsrfToken, signIn,getSession , providers} from "next-auth/client"

export default function SignIn({ csrfToken ,providers}) {
  return (
    <>
    <form method="post" action="/api/auth/callback/credentials">
      <div className="mt-20 flex flex-col w-96">

      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <input className="bg-gray-300" name="username" type="text" />
      </label>
      <label>
        Password
        <input className="bg-gray-300"  name="password" type="password" />
        </label>
        <br />
      <button className="bg-gray-400" type="submit">Sign in</button>
      </div>

      </form>
      
      <div>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const { req, res } = context
  const session = await getSession(context)
 
  if (session && session.user.id != null) {
    return {
      redirect: {
        source: '/signin',
        destination: '/',
        permanent: true,
          }
        }
    // res.writeHead(302, {
    //   Location: '/'
    // });
    // res.end();
    // return null;
  }
  return {
    props: {
      providers: await providers(context),
      csrfToken: await getCsrfToken(context),
    },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/