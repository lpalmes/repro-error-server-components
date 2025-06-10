
export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  throw new Error("This is on fire")

  return (
    <div>
      <p>
        testing</p>
    </div>
  )
}
