import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosters = async () => {
            console.log("cbfb")
            try {
                const response = await axios.get("/api/posters");
                setPosters(response.data.data);
            } catch (error) {
                console.error("Error fetching posters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosters();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;
    if (posters.length === 0) return <p className="text-center text-lg font-semibold text-gray-700">No posters found</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Slider {...settings}>
                {posters.map((poster, index) => (
                    <div key={index} className="w-full h-96">
                        <img 
                            src={poster.image} 
                            alt={`Poster ${index + 1}`} 
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Home;