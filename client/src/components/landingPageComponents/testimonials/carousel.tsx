import Testimonial from "./card";
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';

export default function NumScrollDemo() {
    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const testimonialTemplate = () => {
        return (
            <div className="m-2 text-center">
                <Testimonial />
            </div>
        );
    };
    
    return (
        <div className="card">
            <Carousel numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={testimonialTemplate} />
        </div>
    );
}
