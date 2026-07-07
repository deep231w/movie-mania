import axios from "axios"

export default async function FetchImdbApi(pageToken?: string) {
    try{
        const res = await axios.get("https://api.imdbapi.dev/titles", {
            params: {
            pageToken,
            },
        });


        const parsedContent= res.data.titles.map((title:any)=>({
                    id: title.id,
                    title: title.primaryTitle,
                    image: title.primaryImage?.url,
                    rating: title.rating?.aggregateRating,
                    votes: title.rating?.voteCount,
                    year: title.startYear,
                    genres: title.genres,
                    plot: title.plot,
                    type: title.type,
            }))

            console.log("titles- ", parsedContent)

            return {
                movies:parsedContent,
                nextPageToken: res.data.nextPageToken
            }
    }catch(e){
        
        throw e
    }
}