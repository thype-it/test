"use client";

import React, { useEffect } from "react";
import HeadingMotion from "../../shared/HeadingMotion";
import Section from "../../shared/Section";
import Container from "../../shared/Container";
import { Carousel, CarouselContent, CarouselItem } from "./Carousel";
import useEmblaCarousel from "embla-carousel-react";
type Props = {};

export default function CustomerPlanSection({}: Props) {
  const items = [1, 2, 3, 4];

  const [emblaRef, emblaApi] = useEmblaCarousel();

  useEffect(() => {
    if (emblaApi) console.log(emblaApi.slideNodes());
  }, [emblaApi]);

  return (
    <Section>
      <Container>
        <HeadingMotion level={5}>
          Alebo pozri, čo <br />
          sme ti vybrali
        </HeadingMotion>
        <Carousel className="mb-10">
          <CarouselContent className="w-[85%] pl-2" ref={emblaRef}>
            {items.map(item => (
              <CarouselItem key={item} className="pl-3">
                <Item />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </Section>
  );
}

type ItemProps = {};

function Item({}: ItemProps) {
  return <div className="h-[60vh] w-full rounded-2xl bg-black" />;
}
