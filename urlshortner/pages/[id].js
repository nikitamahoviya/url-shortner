// Server-side redirect page
export async function getServerSideProps(context) {
  const { id } = context.params
  const store = global.__URL_STORE || {}

  if (store[id] && store[id].url) {
    return {
      redirect: {
        destination: store[id].url,
        permanent: false
      }
    }
  }

  return { notFound: true }
}

export default function Page() {
  // This should never render because of server redirect/notFound
  return <div>Redirecting…</div>
}
