import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../Components/Navbar";

const Home = () => {
    const [posters, setPosters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await axios.get("http://localhost:4000/server/poster/getallposter");
                setPosters(response.data.data);
            } catch (error) {
                console.error("Error fetching posters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosters();
    }, []);

    if (loading) return <p className="text-center text-lg font-semibold text-gray-700">Loading...</p>;
    if (!posters || posters.length === 0) return <p className="text-center text-lg font-semibold text-gray-700">No posters found</p>;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: (
            <div
                className="slick-arrow slick-next absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-4xl p-6 cursor-pointer z-10"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "50%",
                }}
            >
                ➡
            </div>
        ),
        prevArrow: (
            <div
                className="slick-arrow slick-prev absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-4xl p-6 cursor-pointer z-10"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "50%",
                }}
            >
                ⬅
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };

    return (
        <>
        <Navbar/>
         <div className="w-full overflow-hidden relative">
            <Slider {...settings}>
                {posters.map((poster, index) => (
                    <div key={index} className="w-full h-96 px-2">
                        <img
                            src={poster.imagePath}
                            alt={`Poster ${index + 1}`}
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                ))}
            </Slider>
        </div>
        </>
       
    );
};

export default Home;
