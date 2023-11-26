import React, { useCallback } from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { DotButton, useDotButton } from './EmblaCarouselDotButton';

const EmblaCarousel = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

    const onButtonClick = useCallback((emblaApi) => {
        const { autoplay } = emblaApi.plugins();
        if (!autoplay) return;
        if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
    }, []);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
        emblaApi,
        onButtonClick,
    );

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex overflow-hidden">
                    {slides}
                </div>
            </div>

            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'embla__dot'.concat(
                            index === selectedIndex
                                ? ' embla__dot--selected'
                                : '',
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmblaCarousel;
