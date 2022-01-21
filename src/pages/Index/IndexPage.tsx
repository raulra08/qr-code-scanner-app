const IndexPage = () => {
  return (
    <>
      <h1>Index Page</h1>

      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        marginTop: "20px",
      }}>
        <a style={{ marginRight: "15px", }}>Previous</a>
        <a href="/dashboard" style={{ marginRight: "15px", }}>Next</a>
      </div>
    </>
  )
}

export default IndexPage;