export const POST = async (req : Request) => {
  try {
    const { query } = await req.json();

    const apiKey = process.env.PIXABAY_API_KEY;
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}`;

    const response = await fetch(apiUrl);
    const json = await response.json();

    return new Response(
      JSON.stringify(json),
      { status: 200 }
    );

  } catch (error: unknown) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: "Error",
        message: "Something went wrong",
      }),
      { status: 500 }
    )
  }
}