import React from 'react';
import { useMediaQuery } from '../../hooks/MediaQuery.hook';
import './index.css'

export default function MainDescription() {
    const matches = useMediaQuery('(min-width: 768px)');

    return (
        <div className='home-details no-web-display' style={matches ? { margin: '4%' }:{}}>
        <h1 className='heading'><span className='site-title'>Incite<span className='feed'>Tube</span></span> – Ultimate destination for Latest Movies and Series</h1>
        <h2 className='collection'>What is InciteTube?</h2>
        <p className='card-description'><strong>A platform for trailers of movies and web series, grossing movie streaming and all-time favorite web series of Hindi and English genre.</strong></p>
        <p className='card-description'>
        Incite Tube brings to the table the most interesting, valuable, and favorite movie and web series trailers from renowned producers, directors, and banners. It provides movie streaming related to top movie trailers, trending web series, the latest movie trailers, the latest web series trailers, the latest movies, the latest web series, top movies, top web series, the most-watched web series, the most-watched movies, and high IMDb-rated movies and web series across all genres. This platform streams movies and web series on the most popular topics that people dream of. It is a single platform that offers information on the most-streamed movies and web series, which are not easily found on the internet.
        </p>
        <p className='card-description'>
        Incite Tube provides a space where users can watch their favorite high IMDb-rated movies and web series, which are widely discussed and popular on the internet. Incite Tube is keen to provide recent and up-to-date information and videos related to the latest release trailers of movies and web series, as well as stream movies and web series online
        </p>
        <div>
            <ul className='heading-list'>
                <li>
                    <p>
                        <span className='collection'>How can Incite Tube help you find relevant stream movies and web series?</span>
                    </p>
                    <h2 style={{color:'#cec6c6', fontSize: '22px'}}>Instructions for Finding Relevant Content on Incite Tube:</h2>
                    <p className='card-description'>
                        <strong>Step 1:</strong> Browse the latest movies, web series, and trailers on Incite Tube.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 2:</strong> On the homepage, you will find categories such as Newest Trailers, Newest Upload Movies, Featured Movies and Series, Trending, and Recent Uploads.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 3:</strong> If you want to browse a specific web series category, we have over 200 different videos available in categories like Latest Web Series, Trending Web Series, High IMDb Ratings, Top Trailers, Most Viewed Trailers, Growing Trailers, and English and Hindi Trailers.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 4:</strong> If you browse the Movies category, you can find various movie lists, such as Most Recent Upload Movies, Most Watched Movies, Popular Movies, and High IMDb Rating Movies, in languages like Hindi, English, Hollywood, Bollywood, Korean, Chinese, Japanese, etc.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 5:</strong> You can click on any category listed on the homepage to navigate to the respective movies and web series category, where you will find content related to that category.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 6:</strong> Open any video that interests you or that you want to watch.
                    </p> 
                    <p className='card-description'>                    
                        <strong>Step 7:</strong> There will be a space to share what you learned from the movie or web series and how the time you spent watching it benefited you.
                    </p>                         

                    <p>
                        <span className='collection'><a href='https://www.incitetube.com/Trailers'>Newest Movie Trailers on INCITE TUBE.</a></span>
                    </p>
                    <p className='card-description'>
                    This category provides recent videos of new movie trailers and full HD movies in major genres like action, romance, thriller, suspense, horror, martial arts, and more. It is not limited to any specific genre but features the most recent and popular movies that are making waves on YouTube.
                    </p>

                    <p>
                        <span className='collection'><a href='https://www.incitetube.com/tv-shows'>Newest Web Series Trailers on INCITE TUBE.</a></span>
                    </p>
                    <p className='card-description'>
                    Apart from movies, you can find the most popular web series in this category. This category provides the best web series trailers that have just arrived. It also features new and highly rated popular web series that you’re looking for on the internet. You can watch trailers for the most popular horror, romantic, thriller, suspense, psychological thriller, action, and crime drama web series. These web series are just one click away.
                    </p>

                    <p>
                        <span className='collection'>Trending Movie Trailers on INCITE TUBE</span>
                    </p>
                    <p className='card-description'>
                    Incite Tube has millions of viewers around the globe, and trending movie trailers are one of the categories that attract millions of views. The trending Movie trailers include genres such as romantic, horror, suspense, travel, psychological, action, drama, and many more. You can bookmark the website for quick access.
                    </p> 

                </li>
                <li>
                    <p className='nav-link'>
                        
                        <span className='collection'> <a href='https://www.incitetube.com/tv-shows'>Trending Web Series Trailers on INCITE TUBE.</a></span>
                    </p>
                    <p className='card-description'>
                    Newest movie trailers are one of the reasons viewers are drawn to watch the full show. Therefore, it is always a good idea to watch trending web series trailers before starting a show. A quick look can clarify your expectations. Trending web series trailers are exciting to watch multiple times, even after you have finished the show, as they sometimes highlight minor details you may have missed. That is why trending trailers are one of the best categories you will find on Incite Tube
                    </p>
                </li>
                <li >
                    <p className='nav-link'>
                        
                        <span className='collection'>All-time favorite movies and Web Series</span>
                    </p>
                    <p className='card-description'>
                    All-time favorite movies and trailers are among the best choices for users. People vote, and IMDb ratings also categorize movies, trailers, and TV shows in the all-time favorite category. Most of the reviews are posted by users on the internet and content creators, and websites collect this data to compile lists of all-time favorite movies, trailers, TV shows, and web series. Incite Tube offers hundreds of these shows to provide the best results according to your search.
                    </p>
                </li>
                <li >
                    <p className='nav-link'>
                        
                        <span className='collection'><a href='https://www.incitetube.com/videos/Latest%20Movies'>Lets check New Movie </a></span>
                    </p>
                    <p className='card-description'>
                        Are you a fan of UFC and looking for a website to live stream the matches without any hustle? 
                        Congratulations, you are on right platform. We live stream the best matches of UFC In the best quality. 
                        You do not need to pay tons of fee to get access to these matches, 
                        our website provides the best free contend.
                        UFC live streaming is available on sportsfeed 24. Sportsfeed cover live matches of every event of UFC. 
                        You can watch free UFC live matches on sportsfeed24.
                    </p>
                </li>
                <li >
                    <p className='nav-link'>
                        
                        <span className='collection'><a href='https://www.incitetube.com/videos/Latest%20TV%20Shows'>Lets check New Web Series</a></span>
                    </p>
                    <p className='card-description'>
                    New web series are always attractive to users. On Incite Tube, users can find their favorite stars and their latest web series. Discover the most recent web series featuring your favorite actors and actresses. Incite Tube collects the latest English, Hindi, and other regional language dramas. Just bookmark Incite Tube for easy access, so you can share your thoughts and watch your favorite shows.
                    </p>
                </li>
                <li >
                    <p className='nav-link'>
                        <span className='collection'>A Glimpse of INCITE TUBE Features and service</span>
                    </p>
                    <p className='card-description'>
                    Our aim is to spread shows, movies, and web series, to share and receive love, and to build a better platform by making your first choice your first show. To create a better user experience, we need to spread positivity and encourage open discussion about the likes and dislikes of a show—whether it is a movie, trailer, or web series
                    </p>
                    <p className='card-description'>
                    Incite Tube will provide its users with a platform where they can watch popular and high-quality content. Our video library will curate videos and informational content available on the internet, striving to make it accessible to people beyond borders and social barriers.
                    </p>
                    <p className='card-description'>
                    In a nutshell, the internet today is crowded with information, and people often struggle to find relevant content about movies, TV shows, and trailers. Incite Tube will focus on providing informational videos centered on key topics like movies, web series, TV shows, trailers, and more. What makes us unique is our carefully selected content related to shows that people are looking for today.
                    </p>                      
                </li>
                <li >
                    <p className='nav-link'>
                        
                        <span className='collection'>Featured Movies and Web Series on INCITE TUBE</span>
                    </p>
                    <p className='card-description'>
                    This is a special category of movies and web shows. It provides the most interesting videos on various topics, selected based on views, interest level, and importance. This category is one of the most significant, featuring prominent videos related to movies and web shows.</p>     
                </li>

                <li >
                    <p>
                        <span className='collection'>Upcoming Movies and Web Series of Hindi and English Genre. </span>
                    </p>
                    <div>
                    <p className='card-description'>
                    There are hundreds of regional, national, and international languages that produce millions of shows for billions of viewers around the globe. You can watch trailers of upcoming movies and web shows, and later, you can watch the full movies and web shows on Incite Tube. The platform offers many options to help you find the best content. Just show your interest and explore beyond your imagination. 
                    </p>
                    </div>     
                </li>
                <li >
                    <p>
                        <span className='collection'>INCITE TUBE: Inspire or get inspired </span>
                    </p>
                    <div>
                    <p className='card-description'>
                    Our mission is to spread happiness and positive emotions by providing the most popular movies and shows. Incite Tube offers a platform that highlights the most important videos surfacing on the internet. On our platform, you can share videos with your loved ones and create a positive impact within the Incite Tube family.
                    </p>
                    </div>     
                </li>
            </ul>
        </div>
        </div>        
    );
};