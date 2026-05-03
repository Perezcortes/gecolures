"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const bgImages = [
    "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776844048/logo_geco_rn0pwl.png",
    "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776834710/unnamed_kp4gc9.jpg",
    "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776236843/548227689_764398456566162_4922236690723613070_n_mrwxpf.jpg",
    "https://res.cloudinary.com/dkem2i0fv/image/upload/v1777832464/geco_letras_heubcu.png",
    "https://res.cloudinary.com/dkem2i0fv/image/upload/v1776023650/475122128_616861480711601_4563349591646411418_n_zlldwe.jpg"
];

export default function TeamHeroCarousel() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}
                className="w-full h-full"
            >
                {bgImages.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full flex items-center justify-center">

                            {/* CAPA TRASERA: Aura borrosa */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-50 blur-3xl scale-110"
                                style={{ backgroundImage: `url('${img}')` }}
                            />

                            {/* 🚀 CAPA FRONTAL: En móvil arriba (items-start), en PC a la derecha */}
                            <div className="absolute inset-0 z-10 w-full max-w-[1400px] mx-auto px-6 xl:px-12 flex items-start md:items-center justify-center md:justify-end pt-12 md:pt-0">
                                <div
                                    className="w-full md:w-[60%] h-[45%] md:h-[85%] bg-contain bg-center md:bg-right bg-no-repeat drop-shadow-2xl"
                                    style={{ backgroundImage: `url('${img}')` }}
                                />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}